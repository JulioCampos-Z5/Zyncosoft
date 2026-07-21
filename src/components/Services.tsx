import { useEffect, useRef, useState } from 'react'
import { usePinProgress } from '../hooks/useScrollProgress'
import { clamp, mapRange } from '../lib/anim'
import Reveal from './Reveal'
import { serviceVisuals, type ServiceVisualKey } from './ServiceVisuals'

type Service = {
  visual: ServiceVisualKey
  /** Nombre técnico: se muestra pequeño, para quien ya lo conoce */
  tag: string
  title: string
  desc: string
}

const services: Service[] = [
  {
    visual: 'erp',
    tag: 'ERP',
    title: 'Todo tu negocio en una sola pantalla',
    desc: 'Inventario, ventas, compras y gastos en el mismo lugar. Se acabaron los diez Excel que nunca cuadran.',
  },
  {
    visual: 'crm',
    tag: 'CRM',
    title: 'Que no se te escape ningún cliente',
    desc: 'Cada cliente, cotización y seguimiento en orden. Sabes a quién le toca llamada hoy.',
  },
  {
    visual: 'pos',
    tag: 'Punto de venta',
    title: 'Cobra rápido y cuadra tu caja',
    desc: 'Vendes, imprimes ticket y haces el corte del día sin sacar la calculadora.',
  },
  {
    visual: 'quote',
    tag: 'Cotizadores',
    title: 'Cotiza en minutos, no en horas',
    desc: 'Precios, descuentos e impuestos se calculan solos. Mandas un PDF con tu logo el mismo día.',
  },
  {
    visual: 'catalog',
    tag: 'Catálogos digitales',
    title: 'Tu catálogo en un link',
    desc: 'Tus productos con foto y precio, listos para mandar por WhatsApp o redes.',
  },
  {
    visual: 'server',
    tag: 'Servidores y hosting',
    title: 'Que tu sistema nunca se caiga',
    desc: 'Cuidamos el servidor donde vive tu sistema. Si algo falla, lo vemos antes que tú.',
  },
  {
    visual: 'domain',
    tag: 'Dominios y correo',
    title: 'Correo con el nombre de tu empresa',
    desc: 'ventas@tuempresa.com en vez de un @gmail. Nosotros lo damos de alta y lo configuramos.',
  },
  {
    visual: 'consult',
    tag: 'Consultoría',
    title: 'Te decimos qué sí necesitas',
    desc: 'Revisamos cómo trabajas y te decimos qué te conviene… y qué no vale la pena.',
  },
]

export default function Services() {
  const { ref, progress } = usePinProgress<HTMLElement>()
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const extra = Math.max(0, track.scrollWidth - window.innerWidth)
      setDistance(extra)
    }
    measure()
    window.addEventListener('resize', measure)
    // Re-medir cuando cargan fuentes/layout
    const t = setTimeout(measure, 300)
    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [])

  const translateX = -progress * distance
  const activeIndex = Math.min(
    services.length,
    Math.round(mapRange(progress, 0.06, 0.98, 1, services.length)),
  )

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative scroll-mt-0 border-t border-ink-line/60"
      style={{ height: `calc(100vh + ${distance}px)` }}
      aria-label="Soluciones"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(45% 60% at 15% 30%, rgba(255,122,26,0.10), transparent 70%)',
          }}
        />

        {/* Encabezado fijo dentro del pin */}
        <div className="container-x">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-fox-500">
              Qué hacemos
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ocho formas de quitarte trabajo de encima
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 max-w-lg text-neutral-400">
              Cada una resuelve un dolor concreto del día a día y todas se
              conectan entre sí. Desliza para verlas.
            </p>
          </Reveal>
        </div>

        {/* Carril horizontal controlado por el scroll */}
        <div className="mt-8 overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-6 will-change-transform sm:px-[max(1.5rem,calc((100vw-78rem)/2))]"
            style={{ transform: `translate3d(${translateX}px,0,0)` }}
          >
            {services.map((s, i) => {
              // Cada tarjeta se aviva al acercarse al centro
              const pos = services.length > 1 ? i / (services.length - 1) : 0
              const focus = 1 - Math.min(1, Math.abs(progress - pos) * 2.2)
              const Visual = serviceVisuals[s.visual]
              return (
                <article
                  key={s.title}
                  className="group relative flex h-92 w-[80vw] shrink-0 flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink-soft transition-colors sm:w-[26rem]"
                  style={{
                    borderColor:
                      focus > 0.5 ? 'rgba(232,93,4,0.45)' : undefined,
                  }}
                >
                  {/* Maqueta visual del producto */}
                  <div className="relative flex h-[48%] items-center justify-center border-b border-ink-line bg-ink px-6 pt-6">
                    <span className="absolute right-4 top-4 font-display text-xs font-bold text-neutral-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Visual className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-fox-500">
                      {s.tag}
                    </p>
                    <h3 className="mt-1.5 text-xl font-semibold leading-snug text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-snug text-neutral-400">
                      {s.desc}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-fox-600/10 to-transparent transition-opacity"
                    style={{ opacity: clamp(focus) }}
                  />
                </article>
              )
            })}

            {/* Panel de cierre / CTA */}
            <div className="flex h-92 w-[80vw] shrink-0 flex-col justify-center rounded-3xl border border-dashed border-ink-line p-7 text-center sm:w-[26rem]">
              <p className="text-lg font-semibold text-white">
                ¿Lo tuyo no aparece aquí?
              </p>
              <p className="mt-2 text-sm text-neutral-400">
                Cuéntanos cómo trabajas hoy y te decimos si podemos ayudarte. No
                necesitas saber cómo se llama lo que buscas.
              </p>
              <a
                href="#contacto"
                className="mx-auto mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
              >
                Cuéntanos tu caso
              </a>
            </div>
          </div>
        </div>

        {/* Indicador de progreso horizontal */}
        <div className="container-x mt-6 flex items-center gap-4">
          <span className="text-sm font-semibold text-white">
            {String(Math.max(1, activeIndex)).padStart(2, '0')}
            <span className="text-neutral-600">
              {' / '}
              {String(services.length).padStart(2, '0')}
            </span>
          </span>
          <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-ink-line">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-fox-400 to-fox-600"
              style={{ width: `${clamp(progress) * 100}%` }}
            />
          </div>
          <span className="hidden text-xs uppercase tracking-widest text-neutral-500 sm:block">
            Desliza para explorar
          </span>
        </div>
      </div>
    </section>
  )
}
