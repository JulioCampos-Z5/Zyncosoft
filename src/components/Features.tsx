import { useEffect, useState } from 'react'
import { IconBolt, IconGear, IconShield } from './icons'
import { useReveal } from '../hooks/useScrollProgress'
import { easeOutCubic } from '../lib/anim'
import Reveal from './Reveal'
import WhyVisual from './WhyVisual'

const benefits = [
  {
    icon: IconGear,
    title: 'A tu medida',
    desc: 'Se adapta a cómo trabajas hoy, no al revés.',
  },
  {
    icon: IconBolt,
    title: 'Todo conectado',
    desc: 'Vendes una vez y se descuenta del inventario solo.',
  },
  {
    icon: IconShield,
    title: 'Siempre cuidado',
    desc: 'Respaldos diarios y alguien vigilando que no se caiga.',
  },
]

const stats = [
  { to: 8, suffix: '', label: 'Servicios, todos con nosotros' },
  { to: 1, suffix: '', label: 'Número al que llamas si algo pasa' },
  { to: 24, suffix: '/7', label: 'Vigilancia de tus sistemas' },
  { to: 0, suffix: '', label: 'Lo que cuesta la primera plática' },
]

function CountUp({
  to,
  suffix,
  start,
}: {
  to: number
  suffix: string
  start: boolean
}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
    let raf = 0
    const duration = 1100
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setValue(Math.round(easeOutCubic(p) * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, to])
  return (
    <span>
      {value}
      {suffix}
    </span>
  )
}

export default function Features() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.3)
  const { ref: cardsReveal, shown: cardsShown } = useReveal<HTMLDivElement>(0.2)

  return (
    <section
      id="porque"
      className="scroll-mt-20 border-t border-ink-line/60 py-28"
    >
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div ref={ref}>
            <Reveal direction="right">
              <p className="text-sm font-semibold uppercase tracking-widest text-fox-500">
                Por qué Zyncosoft
              </p>
            </Reveal>
            <Reveal direction="right" delay={90}>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Un solo aliado, no cinco proveedores
              </h2>
            </Reveal>
            <Reveal direction="right" delay={170}>
              <p className="mt-4 text-neutral-400">
                Hoy uno te hizo la página, otro el sistema, otro el correo… y
                cuando algo falla, cada quien culpa al otro y tú pierdes el día.
                Con nosotros marcas un solo número y nosotros lo resolvemos.
              </p>
            </Reveal>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-ink-soft p-6 transition-all duration-700"
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? 'none' : 'translateY(16px)',
                    transitionDelay: `${i * 90}ms`,
                  }}
                >
                  <dt className="font-display text-3xl font-bold text-white sm:text-4xl">
                    <CountUp to={s.to} suffix={s.suffix} start={shown} />
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-400">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div ref={cardsReveal} className="flex flex-col gap-5">
            {/* Gráfico: de 5 proveedores a 1 aliado */}
            <div
              className="rounded-2xl border border-ink-line bg-ink-soft p-5 transition-all duration-700"
              style={{
                opacity: cardsShown ? 1 : 0,
                transform: cardsShown ? 'none' : 'translateX(24px) scale(0.98)',
              }}
            >
              <WhyVisual className="h-auto w-full" />
            </div>

            {/* Beneficios en chips concisos */}
            <div className="grid gap-3 sm:grid-cols-3">
              {benefits.map((b, i) => (
                <div
                  key={b.title}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-ink-line bg-ink-soft p-4 text-center transition-all duration-700 hover:border-fox-600/40"
                  style={{
                    opacity: cardsShown ? 1 : 0,
                    transform: cardsShown ? 'none' : 'translateY(16px)',
                    transitionDelay: `${150 + i * 100}ms`,
                  }}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fox-500/10 text-fox-400 ring-1 ring-inset ring-fox-500/20">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {b.title}
                  </span>
                  <span className="text-xs leading-snug text-neutral-400">
                    {b.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
