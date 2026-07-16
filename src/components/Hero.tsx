import { IconArrow, IconCheck } from './icons'

const badges = ['ERP', 'CRM', 'Punto de venta', 'Cotizadores', 'Catálogos']

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(255,122,26,0.12), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(70% 60% at 50% 0%, #000, transparent 75%)',
        }}
      />

      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-soft px-4 py-1.5 text-xs font-medium text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-fox-500" />
            Software administrativo a la medida
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Tecnología que{' '}
            <span className="bg-gradient-to-r from-fox-400 to-fox-600 bg-clip-text text-transparent">
              ordena y hace crecer
            </span>{' '}
            tu empresa
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-neutral-400">
            En Zyncosoft desarrollamos ERP, CRM, puntos de venta, cotizadores y
            catálogos hechos a la medida. Además gestionamos tus servidores,
            dominios e infraestructura, con consultoría para cada paso.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
            >
              Solicitar una demo
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 rounded-full border border-ink-line px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-neutral-500"
            >
              Ver soluciones
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
            <li className="flex items-center gap-1.5">
              <IconCheck className="h-4 w-4 text-fox-500" /> Implementación acompañada
            </li>
            <li className="flex items-center gap-1.5">
              <IconCheck className="h-4 w-4 text-fox-500" /> Soporte continuo
            </li>
            <li className="flex items-center gap-1.5">
              <IconCheck className="h-4 w-4 text-fox-500" /> A la medida de tu negocio
            </li>
          </ul>
        </div>

        {/* Marquee de soluciones */}
        <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
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
    </section>
  )
}
