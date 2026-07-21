/**
 * Recibe el formulario de contacto y manda el correo con Resend.
 *
 * Vive en el servidor de Cloudflare, no en el navegador: por eso la llave
 * de Resend nunca queda expuesta en el código que descarga el visitante.
 *
 * Variables de entorno (panel de Cloudflare → Settings → Environment variables):
 *   RESEND_API_KEY   obligatoria, la llave secreta de Resend
 *   CORREO_DESTINO   a dónde llegan los mensajes (default: zyncosoft@gmail.com)
 *   CORREO_FROM      remitente verificado en Resend
 */

type Env = {
  RESEND_API_KEY: string
  CORREO_DESTINO?: string
  CORREO_FROM?: string
}

/** Firma de una Pages Function, declarada aquí para no depender de @cloudflare/workers-types */
type PagesFunction<E> = (ctx: {
  request: Request
  env: E
}) => Response | Promise<Response>

type Payload = {
  nombre?: string
  correo?: string
  empresa?: string
  mensaje?: string
  servicios?: string[]
  /** Campo trampa: invisible para las personas, los bots sí lo llenan */
  website?: string
}

const MAX = { nombre: 120, correo: 160, empresa: 160, mensaje: 4000 }

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })

const limpiar = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

/** Evita que alguien inyecte encabezados extra en el asunto del correo */
const unaLinea = (v: string) => v.replace(/[\r\n]+/g, ' ')

const escapar = (v: string) =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) {
    console.error('Falta la variable RESEND_API_KEY')
    return json({ ok: false, error: 'config' }, 500)
  }

  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return json({ ok: false, error: 'json' }, 400)
  }

  // Bot detectado: le respondemos "ok" para que no insista ni aprenda
  if (limpiar(body.website, 200)) return json({ ok: true })

  const nombre = limpiar(body.nombre, MAX.nombre)
  const correo = limpiar(body.correo, MAX.correo)
  const empresa = limpiar(body.empresa, MAX.empresa)
  const mensaje = limpiar(body.mensaje, MAX.mensaje)
  const servicios = Array.isArray(body.servicios)
    ? body.servicios.slice(0, 20).map((s) => limpiar(s, 60)).filter(Boolean)
    : []

  if (!nombre || !correo) return json({ ok: false, error: 'faltan' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo))
    return json({ ok: false, error: 'correo' }, 400)

  const destino = env.CORREO_DESTINO || 'zyncosoft@gmail.com'
  const remitente = env.CORREO_FROM || 'Zyncosoft <onboarding@resend.dev>'

  const filas: [string, string][] = [
    ['Nombre', nombre],
    ['Correo', correo],
    ['Empresa', empresa || '—'],
    ['Le interesa', servicios.length ? servicios.join(', ') : '—'],
  ]

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px">Nuevo mensaje desde zyncosoft.com</h2>
      <table style="border-collapse:collapse">
        ${filas
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapar(v)}</strong></td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:20px 0 6px;color:#666">Mensaje</p>
      <p style="white-space:pre-wrap;margin:0;padding:12px 14px;background:#f5f5f5;border-radius:8px">${
        escapar(mensaje) || '<em style="color:#999">Sin mensaje</em>'
      }</p>
    </div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: remitente,
      to: [destino],
      // Así, al responder el correo le contestas directo al cliente
      reply_to: correo,
      subject: `Nuevo contacto: ${unaLinea(nombre)}${empresa ? ` — ${unaLinea(empresa)}` : ''}`,
      html,
    }),
  })

  if (!res.ok) {
    console.error('Resend respondió', res.status, await res.text())
    return json({ ok: false, error: 'envio' }, 502)
  }

  return json({ ok: true })
}
