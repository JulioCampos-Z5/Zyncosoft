import { IconBolt, IconGear, IconShield } from './icons'

const features = [
  {
    icon: IconGear,
    title: 'Hecho a la medida',
    desc: 'No adaptamos tu negocio a un software genérico. Construimos la solución alrededor de tu forma de operar.',
  },
  {
    icon: IconBolt,
    title: 'Rápido e integrado',
    desc: 'Tus sistemas conversan entre sí: ERP, CRM, POS y catálogos comparten la misma información, sin duplicar trabajo.',
  },
  {
    icon: IconShield,
    title: 'Seguro y confiable',
    desc: 'Infraestructura administrada con respaldos, monitoreo y buenas prácticas de seguridad para proteger tus datos.',
  },
]

const stats = [
  { value: '100%', label: 'Proyectos a la medida' },
  { value: '8+', label: 'Soluciones tecnológicas' },
  { value: '24/7', label: 'Monitoreo de servidores' },
  { value: '1', label: 'Aliado para toda tu operación' },
]

export default function Features() {
  return (
    <section id="porque" className="scroll-mt-20 border-t border-ink-line/60 py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-fox-500">
              Por qué Zyncosoft
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Astutos como un zorro para resolver tu tecnología
            </h2>
            <p className="mt-4 text-neutral-400">
              Unimos desarrollo de software e infraestructura en un mismo equipo,
              para que tengas una sola conversación en lugar de cinco
              proveedores. Simple, ágil y pensado para crecer contigo.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink-soft p-6">
                  <dt className="text-3xl font-semibold text-white">{s.value}</dt>
                  <dd className="mt-1 text-sm text-neutral-400">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 rounded-2xl border border-ink-line bg-ink-soft p-6 transition-colors hover:border-neutral-600"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fox-500/10 text-fox-400 ring-1 ring-inset ring-fox-500/20">
                  <f.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
