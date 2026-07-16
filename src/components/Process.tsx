const steps = [
  {
    n: '01',
    title: 'Diagnóstico',
    desc: 'Entendemos tu operación, tus procesos y tus objetivos para proponer la solución correcta.',
  },
  {
    n: '02',
    title: 'Diseño a la medida',
    desc: 'Definimos alcance, arquitectura e infraestructura: software, servidores y dominios.',
  },
  {
    n: '03',
    title: 'Desarrollo e implementación',
    desc: 'Construimos, integramos y ponemos en marcha, acompañando a tu equipo en cada paso.',
  },
  {
    n: '04',
    title: 'Soporte y evolución',
    desc: 'Monitoreo, mantenimiento y mejoras continuas para que tu tecnología crezca contigo.',
  },
]

export default function Process() {
  return (
    <section id="proceso" className="scroll-mt-20 border-t border-ink-line/60 py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-fox-500">
            Cómo trabajamos
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un proceso claro, de la idea a la operación
          </h2>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-ink-line bg-ink-soft p-6"
            >
              <span className="text-sm font-semibold text-fox-500">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
