import { useState } from 'react'
import {
  IconArrow,
  IconCheck,
  IconMail,
  IconShare,
  IconWhatsapp,
} from './icons'
import { useReveal } from '../hooks/useScrollProgress'
import {
  CORREO,
  QR_WHATSAPP,
  SITIO_URL,
  TELEFONO_VISIBLE,
  WHATSAPP_URL,
} from '../lib/contacto'

const serviceTags = [
  'Ordenar inventario y ventas',
  'Dar seguimiento a clientes',
  'Cobrar en mostrador',
  'Hacer cotizaciones',
  'Vender en línea',
  'Servidor o página lenta',
  'Correo con mi dominio',
  'Todavía no sé',
]

/** Opcional: nos dice qué canal está funcionando para atraer clientes */
const origenes = [
  'Google',
  'Facebook o Instagram',
  'WhatsApp',
  'Me lo recomendaron',
  'Tarjeta o código QR',
  'Ya los conocía',
  'Otro',
]

const trust = [
  'Te contestamos en menos de 24 h',
  'La primera plática no cuesta',
  'Te decimos el precio antes de empezar',
]

type Estado = 'listo' | 'enviando' | 'enviado' | 'error'

export default function Contact() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.2)
  const [selected, setSelected] = useState<string[]>([])
  const [estado, setEstado] = useState<Estado>('listo')

  const toggle = (tag: string) =>
    setSelected((s) =>
      s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag],
    )

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (estado === 'enviando') return
    setEstado('enviando')

    const datos = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: datos.get('nombre'),
          correo: datos.get('correo'),
          telefono: datos.get('telefono'),
          empresa: datos.get('empresa'),
          origen: datos.get('origen'),
          mensaje: datos.get('mensaje'),
          website: datos.get('website'), // campo trampa
          servicios: selected,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  return (
    <section id="contacto" className="scroll-mt-20 py-28">
      <div className="container-x">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-soft px-6 py-14 transition-all duration-700 sm:px-14"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? 'none' : 'translateY(32px) scale(0.98)',
          }}
        >
          {/* Fondos coherentes con el resto del sitio */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(50% 80% at 82% 0%, rgba(255,122,26,0.16), transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage:
                'radial-gradient(70% 70% at 80% 10%, #000, transparent 75%)',
            }}
          />

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Columna informativa */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-fox-500">
                Contacto
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Cuéntanos qué te está costando trabajo
              </h2>
              <p className="mt-4 max-w-md text-neutral-400">
                No necesitas saber cómo se llama lo que buscas ni usar palabras
                técnicas. Descríbelo como se lo contarías a un amigo y nosotros
                te respondemos con una propuesta clara y con precio.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3 font-semibold text-white transition-colors hover:border-[#25D366]/60 hover:bg-[#25D366]/20"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] ring-1 ring-inset ring-[#25D366]/25 transition-transform group-hover:scale-105">
                    <IconWhatsapp className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    Escríbenos por WhatsApp
                    <span className="text-sm font-normal text-neutral-400">
                      {TELEFONO_VISIBLE}
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${CORREO}`}
                  className="group inline-flex items-center gap-3 rounded-2xl border border-ink-line bg-ink/50 px-4 py-3 text-neutral-300 transition-colors hover:border-fox-600/40 hover:text-white"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fox-500/10 text-fox-400 ring-1 ring-inset ring-fox-500/20 transition-transform group-hover:scale-105">
                    <IconMail className="h-5 w-5" />
                  </span>
                  {CORREO}
                </a>

                {/* QR al chat de WhatsApp + compartir el sitio */}
                <div className="flex items-center gap-4 rounded-2xl border border-ink-line bg-ink/50 p-4">
                  <img
                    src={QR_WHATSAPP}
                    alt="Código QR que abre una conversación de WhatsApp con Zyncosoft"
                    width={104}
                    height={104}
                    loading="lazy"
                    className="h-26 w-26 shrink-0 rounded-lg bg-white p-1.5"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      Escanea y escríbenos
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">
                      Apunta la cámara de tu celular al código y se abre el chat
                      solo.
                    </p>
                    <BotonCompartir />
                  </div>
                </div>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
                {trust.map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <IconCheck className="h-4 w-4 text-fox-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulario / estado de éxito */}
            <div className="relative rounded-2xl border border-ink-line bg-ink p-6 sm:p-7">
              {estado === 'enviado' ? (
                <div className="flex animate-pop flex-col items-center py-10 text-center">
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-fox-500/15 ring-1 ring-inset ring-fox-500/30">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fox-500 opacity-20" />
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-fox-500" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12.5l5 5 11-11" pathLength={30} strokeDasharray={30} className="animate-draw-check" />
                    </svg>
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-neutral-400">
                    Gracias por escribirnos. Te contactaremos muy pronto con una
                    propuesta.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setEstado('listo')
                      setSelected([])
                    }}
                    className="mt-6 text-sm font-semibold text-fox-400 transition-colors hover:text-fox-500"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form className="grid gap-4" onSubmit={enviar}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nombre" name="nombre" placeholder="Tu nombre" required />
                    <Field
                      label="Correo"
                      name="correo"
                      type="email"
                      placeholder="tucorreo@empresa.com"
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Teléfono"
                      name="telefono"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="33 1234 5678"
                      required
                    />
                    <Field label="Empresa" name="empresa" placeholder="Nombre de tu empresa" />
                  </div>

                  {/* Selector de servicios con chips */}
                  <div>
                    <span className="mb-2 block text-sm text-neutral-300">
                      ¿Qué quieres resolver? Elige lo que se parezca
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {serviceTags.map((tag) => {
                        const active = selected.includes(tag)
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggle(tag)}
                            aria-pressed={active}
                            className={`rounded-full border px-3.5 py-1.5 text-sm transition-all ${
                              active
                                ? 'border-fox-500 bg-fox-500/15 text-fox-400'
                                : 'border-ink-line bg-ink-soft text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                            }`}
                          >
                            {tag}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <label className="text-sm">
                    <span className="mb-1.5 block text-neutral-300">Mensaje</span>
                    <textarea
                      name="mensaje"
                      rows={3}
                      placeholder="Ej. Llevo el inventario en Excel y nunca cuadra con lo que hay en bodega…"
                      className="w-full resize-none rounded-xl border border-ink-line bg-ink-soft px-3.5 py-2.5 text-white transition-all placeholder:text-neutral-600 focus:border-fox-500 focus:outline-none focus:ring-4 focus:ring-fox-500/15"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-1.5 block text-neutral-300">
                      ¿Dónde nos ubicaste?{' '}
                      <span className="text-neutral-500">(opcional)</span>
                    </span>
                    <div className="relative">
                      <select
                        name="origen"
                        defaultValue=""
                        className="w-full appearance-none rounded-xl border border-ink-line bg-ink-soft px-3.5 py-2.5 pr-10 text-white transition-all focus:border-fox-500 focus:outline-none focus:ring-4 focus:ring-fox-500/15"
                      >
                        <option value="" className="bg-ink-soft text-neutral-500">
                          -
                        </option>
                        {origenes.map((o) => (
                          <option key={o} value={o} className="bg-ink-soft text-white">
                            {o}
                          </option>
                        ))}
                      </select>
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </label>

                  {/* Campo trampa: las personas no lo ven, los bots lo llenan */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <button
                    type="submit"
                    disabled={estado === 'enviando'}
                    className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fox-400 to-fox-600 px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-fox-500/20 transition-all hover:shadow-fox-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {estado === 'enviando' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  {estado === 'error' && (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      No pudimos enviar tu mensaje. Vuelve a intentarlo o
                      escríbenos por{' '}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                      >
                        WhatsApp
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Comparte el sitio. En celular abre el menú nativo de compartir; en
 * escritorio, donde casi ningún navegador lo tiene, copia el enlace.
 */
function BotonCompartir() {
  const [copiado, setCopiado] = useState(false)

  const compartir = async () => {
    const datos = {
      title: 'Zyncosoft',
      text: 'Software administrativo hecho a la medida de tu negocio.',
      url: SITIO_URL,
    }
    try {
      if (navigator.share) {
        await navigator.share(datos)
        return
      }
      await navigator.clipboard.writeText(SITIO_URL)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    } catch {
      // El usuario canceló el menú de compartir: no hay nada que avisar
    }
  }

  return (
    <button
      type="button"
      onClick={compartir}
      className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-soft px-4 py-2 text-sm font-semibold text-neutral-300 transition-colors hover:border-fox-600/40 hover:text-white"
    >
      {copiado ? (
        <>
          <IconCheck className="h-4 w-4 text-fox-500" />
          ¡Enlace copiado!
        </>
      ) : (
        <>
          <IconShare className="h-4 w-4" />
          Compartir Zyncosoft
        </>
      )}
    </button>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  inputMode,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
}) {
  return (
    <label className="text-sm">
      <span className="mb-1.5 block text-neutral-300">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-ink-line bg-ink-soft px-3.5 py-2.5 text-white transition-all placeholder:text-neutral-600 focus:border-fox-500 focus:outline-none focus:ring-4 focus:ring-fox-500/15"
      />
    </label>
  )
}
