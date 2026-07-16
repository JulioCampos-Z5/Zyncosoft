import type { SVGProps } from 'react'
import {
  IconCatalog,
  IconConsult,
  IconCrm,
  IconDomain,
  IconErp,
  IconPos,
  IconQuote,
  IconServer,
} from './icons'

type Service = {
  icon: (p: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  desc: string
  featured?: boolean
}

const services: Service[] = [
  {
    icon: IconErp,
    title: 'Sistemas ERP',
    desc: 'Centraliza inventario, compras, finanzas y operación en una sola plataforma diseñada para tu negocio.',
    featured: true,
  },
  {
    icon: IconCrm,
    title: 'CRM',
    desc: 'Gestiona prospectos, clientes y ventas con seguimiento claro de cada oportunidad.',
  },
  {
    icon: IconPos,
    title: 'Puntos de venta',
    desc: 'POS rápido y confiable, con control de caja, inventario y reportes en tiempo real.',
  },
  {
    icon: IconQuote,
    title: 'Cotizadores',
    desc: 'Genera cotizaciones profesionales al instante, con precios y catálogos siempre actualizados.',
  },
  {
    icon: IconCatalog,
    title: 'Catálogos digitales',
    desc: 'Muestra tus productos con catálogos elegantes, listos para compartir y vender en línea.',
  },
  {
    icon: IconServer,
    title: 'Servidores y hosting',
    desc: 'Infraestructura administrada, respaldos y monitoreo para que tu operación nunca se detenga.',
  },
  {
    icon: IconDomain,
    title: 'Dominios y correo',
    desc: 'Registro y gestión de nombres de dominio, DNS y correo corporativo profesional.',
  },
  {
    icon: IconConsult,
    title: 'Consultoría tecnológica',
    desc: 'Te acompañamos en la estrategia digital para elegir e implementar la tecnología correcta.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 border-t border-ink-line/60 py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-fox-500">
            Soluciones
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Todo el software administrativo de tu empresa, en un solo aliado
          </h2>
          <p className="mt-4 text-neutral-400">
            Desde el sistema que ordena tu operación hasta la infraestructura que
            lo sostiene. Diseñamos, desarrollamos y mantenemos tecnología a la
            medida.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.title}
              className={`group relative rounded-2xl border p-6 transition-colors ${
                s.featured
                  ? 'border-fox-600/40 bg-gradient-to-b from-fox-600/10 to-transparent'
                  : 'border-ink-line bg-ink-soft hover:border-neutral-600'
              }`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-fox-400 ring-1 ring-inset ring-white/10">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
