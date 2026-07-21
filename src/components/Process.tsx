import { usePinProgress } from '../hooks/useScrollProgress'
import { clamp, mapRange } from '../lib/anim'
import Reveal from './Reveal'
import { processScenes } from './ProcessVisuals'

const steps = [
  {
    n: '01',
    title: 'Platicamos',
    desc: 'Nos cuentas cómo trabajas hoy y qué te quita más tiempo. Esta plática no cuesta nada.',
  },
  {
    n: '02',
    title: 'Te lo mostramos',
    desc: 'Antes de programar nada, ves cómo se vería tu sistema y cuánto cuesta. Sin sorpresas.',
  },
  {
    n: '03',
    title: 'Lo ponemos a andar',
    desc: 'Lo construimos, pasamos tu información y le enseñamos a usarlo a tu equipo.',
  },
  {
    n: '04',
    title: 'Nos quedamos contigo',
    desc: 'Dudas, cambios y vigilancia del sistema. No te dejamos solo el día que entregamos.',
  },
]

export default function Process() {
  const { ref, progress } = usePinProgress<HTMLElement>()

  // Avance a lo largo de todo el recorrido
  const fill = clamp(mapRange(progress, 0.05, 0.95, 0, 1))
  const activeFloat = fill * (steps.length - 1)
  const active = Math.round(activeFloat)
  const pct = Math.round(fill * 100)

  return (
    <section
      id="proceso"
      ref={ref}
      className="relative border-t border-ink-line/60"
      style={{ height: '320vh' }}
      aria-label="Cómo trabajamos"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(45% 55% at 80% 40%, rgba(255,122,26,0.08), transparent 70%)',
          }}
        />
        <div className="container-x">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-fox-500">
                Cómo trabajamos
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Cuatro pasos, sin letras chiquitas
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-3 text-neutral-400">
                Así se ve trabajar con nosotros, desde la primera llamada hasta
                mucho después de la entrega.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-14">
            {/* Escena visual que cambia según el paso activo */}
            <div className="relative order-2 mx-auto aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-3xl border border-ink-line bg-ink-soft lg:order-1 lg:max-w-none">
              {/* barra de avance superior */}
              <div className="absolute inset-x-0 top-0 z-10 h-1 bg-ink-line">
                <div
                  className="h-full bg-gradient-to-r from-fox-400 to-fox-600"
                  style={{ width: `${fill * 100}%` }}
                />
              </div>
              {processScenes.map((SceneComp, i) => {
                const nearness = clamp(1 - Math.abs(activeFloat - i) * 1.4)
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center p-4"
                    style={{
                      opacity: nearness,
                      transform: `scale(${0.92 + nearness * 0.08})`,
                      transition: 'opacity 0.3s linear',
                    }}
                  >
                    <SceneComp className="h-full w-full" />
                  </div>
                )
              })}
              {/* etiqueta del paso activo */}
              <div className="absolute bottom-4 left-5 z-10 flex items-center gap-3">
                <span className="font-display text-4xl font-black text-fox-500">
                  {steps[active].n}
                </span>
                <span className="text-lg font-semibold text-white">
                  {steps[active].title}
                </span>
              </div>
              <span className="absolute bottom-5 right-5 z-10 font-display text-sm font-bold text-neutral-500">
                {pct}%
              </span>
            </div>

            {/* Lista de pasos con nodos que se iluminan */}
            <ol className="order-1 relative lg:order-2">
              {/* línea conectora vertical */}
              <div className="absolute bottom-6 left-[18px] top-6 w-px bg-ink-line">
                <div
                  className="w-full bg-gradient-to-b from-fox-400 to-fox-600"
                  style={{ height: `${fill * 100}%` }}
                />
              </div>

              {steps.map((s, i) => {
                const reached = activeFloat >= i - 0.4
                const isActive = active === i
                return (
                  <li key={s.n} className="relative flex gap-5 pb-7 last:pb-0">
                    <span
                      className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-500"
                      style={{
                        borderColor: reached ? 'rgba(232,93,4,0.8)' : 'var(--color-ink-line)',
                        backgroundColor: reached ? 'var(--color-fox-500)' : 'var(--color-ink-soft)',
                        color: reached ? '#0a0a0a' : '#a3a3a3',
                        transform: isActive ? 'scale(1.18)' : 'scale(1)',
                        boxShadow: isActive ? '0 0 22px rgba(255,122,26,0.55)' : 'none',
                      }}
                    >
                      {s.n}
                    </span>
                    <div
                      className="pt-1 transition-all duration-500"
                      style={{ opacity: reached ? 1 : 0.4 }}
                    >
                      <h3
                        className="text-lg font-semibold transition-colors"
                        style={{ color: isActive ? '#fff' : '#d4d4d4' }}
                      >
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
