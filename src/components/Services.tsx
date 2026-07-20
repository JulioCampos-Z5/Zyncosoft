import { useEffect, useRef, useState } from 'react'
import { usePinProgress } from '../hooks/useScrollProgress'
import { clamp, mapRange } from '../lib/anim'
import Reveal from './Reveal'
import { serviceVisuals, type ServiceVisualKey } from './ServiceVisuals'

type Service = {
  visual: ServiceVisualKey
  title: string
  desc: string
}

const services: Service[] = [
  {
    visual: 'erp',
    title: 'Sistema ERP',
    desc: 'Todo tu negocio en un solo sistema.',
  },
  {
    visual: 'crm',
    title: 'CRM',
    desc: 'Nunca pierdas un cliente ni una venta.',
  },
  {
    visual: 'pos',
    title: 'Punto de venta',
    desc: 'Cobra rápido y controla tu caja.',
  },
  {
    visual: 'quote',
    title: 'Cotizadores',
    desc: 'Cotizaciones profesionales en segundos.',
  },
  {
    visual: 'catalog',
    title: 'Catálogos digitales',
    desc: 'Tu catálogo listo para vender en línea.',
  },
  {
    visual: 'server',
    title: 'Servidores y hosting',
    desc: 'Tu operación siempre en línea.',
  },
  {
    visual: 'domain',
    title: 'Dominios y correo',
    desc: 'Tu dominio y correo profesional.',
  },
  {
    visual: 'consult',
    title: 'Consultoría',
    desc: 'Te guiamos en cada decisión tecnológica.',
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
              Soluciones
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Un aliado para todo tu software
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 max-w-lg text-neutral-400">
              Ocho soluciones que se conectan entre sí. Desliza para verlas.
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
                  className="group relative flex h-[20rem] w-[80vw] shrink-0 flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink-soft transition-colors sm:w-[26rem]"
                  style={{
                    borderColor:
                      focus > 0.5 ? 'rgba(232,93,4,0.45)' : undefined,
                  }}
                >
                  {/* Maqueta visual del producto */}
                  <div className="relative flex h-[58%] items-center justify-center border-b border-ink-line bg-ink px-6 pt-6">
                    <span className="absolute right-4 top-4 font-display text-xs font-bold text-neutral-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Visual className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] leading-snug text-neutral-400">
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
            <div className="flex h-[20rem] w-[80vw] shrink-0 flex-col justify-center rounded-3xl border border-dashed border-ink-line p-7 text-center sm:w-[26rem]">
              <p className="text-lg font-semibold text-white">
                ¿No ves lo que buscas?
              </p>
              <p className="mt-2 text-sm text-neutral-400">
                Diseñamos software a la medida de tu operación.
              </p>
              <a
                href="#contacto"
                className="mx-auto mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
              >
                Cuéntanos tu idea
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
