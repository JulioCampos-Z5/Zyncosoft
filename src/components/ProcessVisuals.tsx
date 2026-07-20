/**
 * Escenas ilustradas para cada paso del proceso. Se muestran en un panel
 * grande que cambia según el paso activo mientras se hace scroll, para que
 * el proceso se entienda visualmente y no solo con texto.
 */

const FOX = '#ff7a1a'
const FOX_L = '#ff9d4d'
const LINE = '#2a2a2a'
const PANEL = '#121212'
const GHOST = '#3f3f3f'

type Props = { className?: string }

function Scene({ className, children }: Props & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 240" className={className} role="img" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  )
}

/** 01 · Diagnóstico — analizamos tu negocio con lupa sobre los datos. */
export function SceneDiagnostico({ className }: Props) {
  return (
    <Scene className={className}>
      <rect x="42" y="44" width="200" height="132" rx="12" fill={PANEL} stroke={LINE} />
      <line x1="42" y1="70" x2="242" y2="70" stroke={LINE} />
      <rect x="56" y="54" width="60" height="8" rx="4" fill={GHOST} />
      {/* barras */}
      {[40, 66, 50, 84, 60].map((h, i) => (
        <rect key={i} x={64 + i * 34} y={158 - h} width="20" height={h} rx="3" fill={i === 3 ? FOX : '#3a3a3a'} />
      ))}
      <line x1="56" y1="158" x2="228" y2="158" stroke={LINE} />
      {/* lupa */}
      <g>
        <circle cx="192" cy="150" r="40" fill="rgba(255,122,26,0.10)" stroke={FOX} strokeWidth="3" />
        <line x1="221" y1="179" x2="250" y2="208" stroke={FOX} strokeWidth="6" strokeLinecap="round" />
        <circle cx="192" cy="150" r="40" fill="none" stroke={FOX_L} strokeWidth="1.5" opacity="0.6">
          <animate attributeName="r" values="40;46;40" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
    </Scene>
  )
}

/** 02 · Diseño — trazamos el plano de la solución a tu medida. */
export function SceneDiseno({ className }: Props) {
  return (
    <Scene className={className}>
      <rect x="46" y="40" width="196" height="150" rx="12" fill={PANEL} stroke={LINE} />
      {/* guías del plano */}
      {[70, 100, 130, 160].map((y, i) => (
        <line key={i} x1="46" y1={y} x2="242" y2={y} stroke="#1e1e1e" strokeDasharray="2 5" />
      ))}
      {/* wireframe */}
      <rect x="62" y="54" width="164" height="18" rx="4" fill="none" stroke={FOX} strokeWidth="1.6" />
      <rect x="62" y="80" width="46" height="96" rx="4" fill="none" stroke={GHOST} strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="118" y="80" width="108" height="44" rx="4" fill="rgba(255,122,26,0.10)" stroke={FOX} strokeWidth="1.6" />
      <rect x="118" y="132" width="50" height="44" rx="4" fill="none" stroke={GHOST} strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="176" y="132" width="50" height="44" rx="4" fill="none" stroke={GHOST} strokeWidth="1.5" strokeDasharray="4 4" />
      {/* lápiz */}
      <g>
        <line x1="196" y1="150" x2="250" y2="96" stroke={FOX} strokeWidth="6" strokeLinecap="round" />
        <path d="M250 96l10-10 6 6-10 10z" fill={FOX_L} />
        <path d="M196 150l-6 16 16-6z" fill={FOX} />
      </g>
    </Scene>
  )
}

/** 03 · Implementación — construimos con engranajes y código. */
export function SceneImplementacion({ className }: Props) {
  return (
    <Scene className={className}>
      <rect x="46" y="40" width="228" height="150" rx="12" fill={PANEL} stroke={LINE} />
      {/* engranaje grande */}
      <g transform="translate(120 108)">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite" />
          <Gear r={34} teeth={9} color={FOX} />
        </g>
      </g>
      {/* engranaje pequeño */}
      <g transform="translate(168 148)">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="6s" repeatCount="indefinite" />
          <Gear r={22} teeth={7} color={FOX_L} />
        </g>
      </g>
      {/* código */}
      <text x="196" y="82" fill={FOX} fontSize="26" fontWeight="800" fontFamily="Poppins, sans-serif">
        {'</>'}
      </text>
      {/* barra de progreso */}
      <rect x="66" y="166" width="188" height="8" rx="4" fill="#1c1c1c" />
      <rect x="66" y="166" width="132" height="8" rx="4" fill={FOX}>
        <animate attributeName="width" values="40;170;40" dur="3.5s" repeatCount="indefinite" />
      </rect>
    </Scene>
  )
}

/** 04 · Soporte — monitoreo continuo y protección 24/7. */
export function SceneSoporte({ className }: Props) {
  return (
    <Scene className={className}>
      <rect x="46" y="40" width="228" height="150" rx="12" fill={PANEL} stroke={LINE} />
      {/* latido / uptime */}
      <polyline
        points="60,120 96,120 110,92 128,150 146,110 164,120 274,120"
        fill="none"
        stroke={FOX}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="240"
        strokeDashoffset="240"
      >
        <animate attributeName="stroke-dashoffset" values="240;0" dur="2.2s" repeatCount="indefinite" />
      </polyline>
      {/* escudo */}
      <g transform="translate(160 108)">
        <path d="M0 -34l30 12v20c0 22-15 36-30 42-15-6-30-20-30-42v-20z" fill="rgba(255,122,26,0.12)" stroke={FOX} strokeWidth="2" />
        <path d="M-12 6l8 8 18-18" fill="none" stroke={FOX_L} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* 24/7 */}
      <text x="60" y="176" fill={FOX} fontSize="15" fontWeight="800" fontFamily="Poppins, sans-serif">
        24/7
      </text>
      {/* estado en línea */}
      <g transform="translate(232 168)">
        <circle cx="0" cy="0" r="5" fill={FOX}>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <text x="10" y="4" fill="#a3a3a3" fontSize="11" fontFamily="Raleway, sans-serif">
          En línea
        </text>
      </g>
    </Scene>
  )
}

/** Engranaje simple generado por número de dientes. */
function Gear({ r, teeth, color }: { r: number; teeth: number; color: string }) {
  const tooth = []
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2
    const x = Math.cos(a) * (r + 7)
    const y = Math.sin(a) * (r + 7)
    tooth.push(
      <rect
        key={i}
        x={x - 4}
        y={y - 4}
        width="8"
        height="8"
        rx="2"
        fill={color}
        transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`}
      />,
    )
  }
  return (
    <g>
      {tooth}
      <circle cx="0" cy="0" r={r} fill="none" stroke={color} strokeWidth="6" />
      <circle cx="0" cy="0" r={r - 12} fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
    </g>
  )
}

export const processScenes = [
  SceneDiagnostico,
  SceneDiseno,
  SceneImplementacion,
  SceneSoporte,
]
