import { useEffect } from 'react'
import ParticleField from './ParticleField'

/**
 * Puntos del trazo en "Z" (estilo Zorro) sobre un lienzo de 1000x560.
 * Los mismos puntos alimentan los 3 trazos de espada, la cicatriz que queda
 * brillando y los clip-path que separan el "404" en dos mitades, con un
 * corte limpio y recto.
 */
type Pt = [number, number]

const A: Pt = [190, 0]
const B: Pt = [830, 190]
const C: Pt = [150, 400]
const D: Pt = [800, 560]

const strokeAB: Pt[] = [A, B]
const strokeBC: Pt[] = [B, C]
const strokeCD: Pt[] = [C, D]
const straightPath: Pt[] = [A, B, C, D]

const toPathD = (pts: Pt[]) =>
  'M' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L')

const toPct = ([x, y]: Pt) => `${(x / 10).toFixed(2)}% ${(y / 5.6).toFixed(2)}%`

const leftClip = [[0, 0] as Pt, ...straightPath, [0, 560] as Pt]
  .map(toPct)
  .join(', ')

const rightClip = [A, [1000, 0] as Pt, [1000, 560] as Pt, D, C, B]
  .map(toPct)
  .join(', ')

const numberClass =
  'font-display absolute inset-0 flex select-none items-center justify-center text-[clamp(4.5rem,18vw,11rem)] font-black leading-none tracking-tighter text-white [filter:drop-shadow(0_3px_4px_rgba(0,0,0,0.55))]'

export default function NotFound() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Página no encontrada · Zyncosoft'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-24 text-center">
      <ParticleField className="opacity-25" />

      <div className="relative z-10 flex flex-col items-center">
        <a
          href="/"
          className="mb-10 inline-flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100"
          aria-label="Volver al inicio de Zyncosoft"
        >
          <img
            src="/logo.png"
            alt="Logotipo de Zyncosoft"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg bg-white p-0.5"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Zyncosoft
          </span>
        </a>

        <div className="nf-box relative aspect-[1000/560] w-[92vw] max-w-[880px]">
          <div className={`${numberClass} nf-piece nf-piece-left`}>404</div>
          <div className={`${numberClass} nf-piece nf-piece-right`}>404</div>

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 1000 560"
            fill="none"
            aria-hidden
          >
            <defs>
              <filter id="nf-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="nf-spark" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff5e8" />
                <stop offset="35%" stopColor="#ff9d4d" />
                <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path
              className="nf-scar"
              d={toPathD(straightPath)}
              pathLength={100}
              stroke="#ff7a1a"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#nf-glow)"
            />

            <path
              className="nf-stroke nf-stroke-1"
              d={toPathD(strokeAB)}
              pathLength={100}
              stroke="#ff7a1a"
              strokeWidth={6}
              strokeLinecap="round"
              filter="url(#nf-glow)"
            />
            <path
              className="nf-stroke nf-stroke-2"
              d={toPathD(strokeBC)}
              pathLength={100}
              stroke="#ff7a1a"
              strokeWidth={6}
              strokeLinecap="round"
              filter="url(#nf-glow)"
            />
            <path
              className="nf-stroke nf-stroke-3"
              d={toPathD(strokeCD)}
              pathLength={100}
              stroke="#ff7a1a"
              strokeWidth={6}
              strokeLinecap="round"
              filter="url(#nf-glow)"
            />

            <circle
              className="nf-spark nf-spark-b"
              cx={830}
              cy={190}
              r={22}
              fill="url(#nf-spark)"
              style={{ transformOrigin: '830px 190px' }}
            />
            <circle
              className="nf-spark nf-spark-c"
              cx={150}
              cy={400}
              r={22}
              fill="url(#nf-spark)"
              style={{ transformOrigin: '150px 400px' }}
            />
            <circle
              className="nf-spark nf-spark-d"
              cx={800}
              cy={560}
              r={30}
              fill="url(#nf-spark)"
              style={{ transformOrigin: '800px 560px' }}
            />
          </svg>
        </div>

        <p className="nf-fade mt-10 max-w-sm text-balance text-sm text-neutral-400 sm:text-base">
          Esta página se desvaneció en la noche, como el Zorro.
        </p>
        <a
          href="/"
          className="nf-fade mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
        >
          Volver al inicio
        </a>
      </div>

      <style>{`
        .nf-piece { clip-path: polygon(${leftClip}); }
        .nf-piece-right { clip-path: polygon(${rightClip}); }

        .nf-piece-left {
          animation:
            nf-open-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.25s both,
            nf-sway-left 3.6s ease-in-out 1.9s infinite alternate;
        }
        .nf-piece-right {
          animation:
            nf-open-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.25s both,
            nf-sway-right 3.9s ease-in-out 1.9s infinite alternate;
        }

        .nf-stroke { stroke-dasharray: 100; stroke-dashoffset: 100; opacity: 0; }
        .nf-stroke-1 { animation: nf-draw 0.28s ease-out 0.15s forwards; }
        .nf-stroke-2 { animation: nf-draw 0.36s ease-out 0.48s forwards; }
        .nf-stroke-3 { animation: nf-draw 0.28s ease-out 0.9s forwards; }

        .nf-scar {
          stroke-dasharray: 100;
          stroke-dashoffset: 0;
          opacity: 0;
          animation: nf-scar-in 0.6s ease-out 1.3s forwards;
        }

        .nf-spark { opacity: 0; }
        .nf-spark-b { animation: nf-spark-pop 0.35s ease-out 0.43s both; }
        .nf-spark-c { animation: nf-spark-pop 0.35s ease-out 0.84s both; }
        .nf-spark-d { animation: nf-spark-pop 0.45s ease-out 1.18s both; }

        .nf-box { animation: nf-shake 0.4s ease-out 1.18s both; }

        .nf-fade { opacity: 0; animation: nf-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.55s forwards; }

        @keyframes nf-draw {
          from { stroke-dashoffset: 100; opacity: 1; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes nf-scar-in {
          from { opacity: 0; }
          to { opacity: 0.6; }
        }
        @keyframes nf-spark-pop {
          0% { opacity: 0; transform: scale(0.2); }
          45% { opacity: 1; transform: scale(1.3); }
          100% { opacity: 0; transform: scale(1.9); }
        }
        @keyframes nf-shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-6px, 2px); }
          40% { transform: translate(5px, -3px); }
          60% { transform: translate(-4px, 3px); }
          80% { transform: translate(3px, -1px); }
        }
        @keyframes nf-open-left {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(-1.6%, 2%) rotate(-3deg); }
        }
        @keyframes nf-open-right {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(1.6%, -1.4%) rotate(3deg); }
        }
        @keyframes nf-sway-left {
          from { transform: translate(-1.6%, 2%) rotate(-3deg); }
          to { transform: translate(-2%, 2.4%) rotate(-3.8deg); }
        }
        @keyframes nf-sway-right {
          from { transform: translate(1.6%, -1.4%) rotate(3deg); }
          to { transform: translate(2%, -1.8%) rotate(3.8deg); }
        }
        @keyframes nf-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
