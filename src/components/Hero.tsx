import { IconArrow, IconCheck } from './icons'
import ParticleField from './ParticleField'
import { usePinProgress } from '../hooks/useScrollProgress'
import { clamp, mapRange } from '../lib/anim'

const badges = ['ERP', 'CRM', 'Punto de venta', 'Cotizadores', 'Catálogos']

export default function Hero() {
  const { ref, progress } = usePinProgress<HTMLElement>()

  // Escenas dentro del pin
  const contentY = -progress * 140
  const contentOpacity = clamp(mapRange(progress, 0.45, 0.9, 1, 0))
  const ghostScale = 1 + progress * 0.6
  const ghostOpacity = mapRange(progress, 0, 0.85, 0.06, 0.16)
  const gridShift = progress * 60
  const hintOpacity = clamp(mapRange(progress, 0, 0.12, 1, 0))

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[170vh]"
      aria-label="Introducción"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Fondos */}
        <ParticleField className="opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(60% 55% at 50% 30%, rgba(255,122,26,0.16), transparent 70%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            backgroundPosition: `center ${gridShift}px`,
            maskImage:
              'radial-gradient(75% 65% at 50% 40%, #000, transparent 78%)',
          }}
        />

        {/* Palabra fantasma detrás */}
        <span
          aria-hidden
          className="font-display pointer-events-none absolute inset-x-0 top-1/2 -z-[5] -translate-y-1/2 select-none text-center text-[16vw] font-black leading-none tracking-tighter text-white"
          style={{
            opacity: ghostOpacity,
            transform: `translateY(-50%) scale(${ghostScale})`,
          }}
        >
          ZYNCOSOFT
        </span>

        <div className="container-x relative w-full">
          <div
            className="mx-auto max-w-3xl text-center will-change-transform"
            style={{
              transform: `translateY(${contentY}px)`,
              opacity: contentOpacity,
            }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-soft/80 px-4 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fox-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fox-500" />
              </span>
              Software administrativo a la medida
            </span>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Tecnología que{' '}
              <span className="bg-gradient-to-r from-fox-400 to-fox-600 bg-clip-text text-transparent">
                ordena y hace crecer
              </span>{' '}
              tu empresa
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-neutral-400">
              Software a la medida e infraestructura, con un solo aliado. Del
              sistema que ordena tu operación al servidor que lo sostiene.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-fox-500/10 transition-colors hover:bg-fox-500"
              >
                Solicitar una demo
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-neutral-500"
              >
                Ver soluciones
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
              <li className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-fox-500" /> Implementación
                acompañada
              </li>
              <li className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-fox-500" /> Soporte continuo
              </li>
              <li className="flex items-center gap-1.5">
                <IconCheck className="h-4 w-4 text-fox-500" /> A la medida de tu
                negocio
              </li>
            </ul>

            {/* Marquee de soluciones */}
            <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
              <div className="flex w-max animate-marquee gap-4">
                {[...badges, ...badges, ...badges, ...badges].map((b, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-ink-line bg-ink-soft px-5 py-2 text-sm text-neutral-400"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-neutral-500"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[11px] uppercase tracking-[0.2em]">Desliza</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-neutral-600 p-1">
            <span className="h-2 w-1 animate-scroll-hint rounded-full bg-fox-500" />
          </span>
        </div>
      </div>
    </section>
  )
}
