/**
 * Mini-maquetas SVG que representan visualmente cada servicio, para que el
 * cliente entienda de un vistazo qué recibe (mejor que describirlo con texto).
 * Estilo esquemático, coherente con la paleta (neutros + acento "fox").
 */

const FOX = '#ff7a1a'
const FOX_L = '#ff9d4d'
const LINE = '#242424'
const PANEL = '#101010'
const GHOST = '#3a3a3a'

type VisualProps = { className?: string }

const frame = {
  fill: '#141414',
  stroke: LINE,
  strokeWidth: 1,
}

/** Marco tipo ventana de aplicación reutilizable. */
function Window({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect x="6" y="6" width="308" height="148" rx="12" {...frame} />
      <line x1="6" y1="32" x2="314" y2="32" stroke={LINE} />
      <circle cx="20" cy="19" r="3" fill={FOX} />
      <circle cx="31" cy="19" r="3" fill={GHOST} />
      <circle cx="42" cy="19" r="3" fill={GHOST} />
      {children}
    </>
  )
}

function Svg({ className, children }: VisualProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 160"
      className={className}
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  )
}

/** ERP — dashboard con módulos y una gráfica. */
export function VisualErp({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* barra lateral */}
        <rect x="16" y="42" width="58" height="102" rx="6" fill={PANEL} stroke={LINE} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="24" y={54 + i * 18} width="42" height="7" rx="3.5" fill={i === 0 ? FOX : GHOST} />
        ))}
        {/* tarjetas de módulos */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={86 + i * 74} y="42" width="66" height="40" rx="6" fill={PANEL} stroke={LINE} />
            <rect x={94 + i * 74} y="50" width="24" height="6" rx="3" fill={GHOST} />
            <rect x={94 + i * 74} y="62" width="40" height="10" rx="3" fill={i === 1 ? FOX_L : '#4b4b4b'} />
          </g>
        ))}
        {/* gráfica de barras */}
        <rect x="86" y="92" width="212" height="52" rx="6" fill={PANEL} stroke={LINE} />
        {[24, 34, 20, 42, 30, 46].map((h, i) => (
          <rect key={i} x={98 + i * 33} y={136 - h} width="18" height={h} rx="3" fill={i === 5 ? FOX : '#3f3f3f'} />
        ))}
      </Window>
    </Svg>
  )
}

/** CRM — pipeline de ventas tipo kanban con tendencia al alza. */
export function VisualCrm({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {['Nuevos', 'En proceso', 'Ganados'].map((_, col) => (
          <g key={col}>
            <rect x={18 + col * 98} y="42" width="88" height="102" rx="6" fill={PANEL} stroke={LINE} />
            <rect x={26 + col * 98} y="50" width="34" height="6" rx="3" fill={GHOST} />
            {[0, 1].map((row) => {
              const active = col === 2 && row === 0
              return (
                <g key={row}>
                  <rect
                    x={26 + col * 98}
                    y={64 + row * 34}
                    width="72"
                    height="26"
                    rx="5"
                    fill={active ? 'rgba(255,122,26,0.14)' : '#171717'}
                    stroke={active ? FOX : LINE}
                  />
                  <circle cx={38 + col * 98} cy={77 + row * 34} r="5" fill={active ? FOX : '#4b4b4b'} />
                  <rect x={48 + col * 98} y={74 + row * 34} width="40" height="6" rx="3" fill={GHOST} />
                </g>
              )
            })}
          </g>
        ))}
      </Window>
    </Svg>
  )
}

/** POS — pantalla de cobro con ticket y total. */
export function VisualPos({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* ticket */}
        <rect x="16" y="42" width="150" height="102" rx="6" fill={PANEL} stroke={LINE} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="26" y={54 + i * 20} width="90" height="7" rx="3.5" fill={GHOST} />
            <rect x="128" y={54 + i * 20} width="28" height="7" rx="3.5" fill="#4b4b4b" />
          </g>
        ))}
        <line x1="26" y1="118" x2="156" y2="118" stroke={LINE} strokeDasharray="3 3" />
        <rect x="26" y="126" width="40" height="9" rx="3" fill={FOX_L} />
        <rect x="118" y="126" width="38" height="9" rx="3" fill={FOX} />
        {/* teclado / pago */}
        <rect x="178" y="42" width="120" height="60" rx="6" fill={PANEL} stroke={LINE} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}-${c}`} x={188 + c * 36} y={50 + r * 16} width="28" height="11" rx="3" fill="#2f2f2f" />
          )),
        )}
        {/* botón cobrar */}
        <rect x="178" y="110" width="120" height="34" rx="8" fill={FOX} />
        <rect x="212" y="123" width="52" height="8" rx="4" fill="#0a0a0a" opacity="0.7" />
      </Window>
    </Svg>
  )
}

/** Cotizadores — documento con líneas y total aprobado. */
export function VisualQuote({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        <rect x="70" y="42" width="180" height="102" rx="6" fill={PANEL} stroke={LINE} />
        <rect x="82" y="52" width="60" height="8" rx="4" fill={FOX} />
        <rect x="82" y="66" width="120" height="5" rx="2.5" fill={GHOST} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="82" y={82 + i * 14} width="90" height="6" rx="3" fill="#3f3f3f" />
            <rect x="196" y={82 + i * 14} width="42" height="6" rx="3" fill="#4b4b4b" />
          </g>
        ))}
        <rect x="150" y="124" width="88" height="14" rx="7" fill="rgba(255,122,26,0.15)" stroke={FOX} />
        <rect x="160" y="128" width="28" height="6" rx="3" fill={FOX_L} />
        {/* check aprobado */}
        <circle cx="222" cy="131" r="5" fill={FOX} />
        <path d="M219 131l2 2 4-4" stroke="#0a0a0a" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Window>
    </Svg>
  )
}

/** Catálogos — cuadrícula de productos con precio. */
export function VisualCatalog({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={20 + i * 96} y="42" width="80" height="102" rx="8" fill={PANEL} stroke={LINE} />
            <rect x={28 + i * 96} y="50" width="64" height="46" rx="6" fill={i === 1 ? 'rgba(255,122,26,0.16)' : '#1c1c1c'} stroke={i === 1 ? FOX : LINE} />
            <path
              d={`M${34 + i * 96} 88 l12 -12 8 8 10 -10 12 12`}
              fill="none"
              stroke={i === 1 ? FOX_L : '#4b4b4b'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x={28 + i * 96} y="104" width="52" height="6" rx="3" fill={GHOST} />
            <rect x={28 + i * 96} y="116" width="30" height="8" rx="4" fill={i === 1 ? FOX : '#4b4b4b'} />
          </g>
        ))}
      </Window>
    </Svg>
  )
}

/** Servidores — racks con estado en línea y uptime. */
export function VisualServer({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="18" y={44 + i * 30} width="180" height="26" rx="6" fill={PANEL} stroke={LINE} />
            <circle cx="34" cy={57 + i * 30} r="5" fill={FOX} />
            <rect x="46" y={54 + i * 30} width="70" height="7" rx="3.5" fill={GHOST} />
            {[0, 1, 2, 3].map((d) => (
              <rect key={d} x={130 + d * 15} y={53 + i * 30} width="8" height="9" rx="2" fill="#3f3f3f" />
            ))}
          </g>
        ))}
        {/* panel uptime */}
        <rect x="210" y="44" width="88" height="82" rx="6" fill={PANEL} stroke={LINE} />
        <rect x="222" y="54" width="30" height="6" rx="3" fill={GHOST} />
        <text x="222" y="82" fill={FOX} fontSize="18" fontWeight="700" fontFamily="Poppins, sans-serif">
          99.9%
        </text>
        <polyline
          points="222,112 236,104 250,109 264,98 278,103 290,94"
          fill="none"
          stroke={FOX_L}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Window>
    </Svg>
  )
}

/** Dominios y correo — barra de navegador y correo profesional. */
export function VisualDomain({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* barra de url */}
        <rect x="18" y="44" width="284" height="26" rx="13" fill={PANEL} stroke={LINE} />
        <circle cx="34" cy="57" r="6" fill="none" stroke={FOX} strokeWidth="1.6" />
        <path d="M28 57h12M34 51c2 2 2 10 0 12M34 51c-2 2-2 10 0 12" stroke={FOX} strokeWidth="1" fill="none" />
        <rect x="50" y="53" width="8" height="8" rx="2" fill={FOX_L} />
        <text x="66" y="61" fill="#a3a3a3" fontSize="11" fontFamily="Raleway, sans-serif">
          tuempresa.com
        </text>
        {/* correo */}
        <rect x="18" y="84" width="284" height="60" rx="8" fill={PANEL} stroke={LINE} />
        <rect x="30" y="96" width="40" height="36" rx="6" fill="rgba(255,122,26,0.14)" stroke={FOX} />
        <path d="M36 104l14 10 14 -10" fill="none" stroke={FOX} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="84" y="112" fill="#d4d4d4" fontSize="11" fontFamily="Raleway, sans-serif">
          hola@tuempresa.com
        </text>
        <rect x="84" y="120" width="150" height="6" rx="3" fill={GHOST} />
        <rect x="84" y="130" width="110" height="6" rx="3" fill="#333" />
      </Window>
    </Svg>
  )
}

/** Consultoría — hoja de ruta con una idea guía. */
export function VisualConsult({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* ruta */}
        <path
          d="M30 120 C 90 120, 90 60, 150 60 S 210 100, 290 100"
          fill="none"
          stroke={LINE}
          strokeWidth="2"
          strokeDasharray="4 5"
        />
        {[
          { x: 30, y: 120, on: true },
          { x: 150, y: 60, on: true },
          { x: 290, y: 100, on: false },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="7" fill={p.on ? FOX : '#1c1c1c'} stroke={p.on ? FOX : LINE} strokeWidth="1.5" />
        ))}
        {/* idea / bombilla */}
        <circle cx="150" cy="60" r="16" fill="rgba(255,122,26,0.14)" stroke={FOX} />
        <path d="M150 52a7 7 0 0 0-4 12v2h8v-2a7 7 0 0 0-4-12Z" fill="none" stroke={FOX_L} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M147 69h6" stroke={FOX_L} strokeWidth="1.4" strokeLinecap="round" />
        {/* etiquetas de fases */}
        <rect x="16" y="134" width="34" height="6" rx="3" fill={GHOST} />
        <rect x="272" y="134" width="34" height="6" rx="3" fill="#333" />
      </Window>
    </Svg>
  )
}

/** Páginas web — sitio con hero, secciones y navegación. */
export function VisualWeb({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* nav del sitio */}
        <rect x="18" y="42" width="284" height="20" rx="6" fill={PANEL} stroke={LINE} />
        <rect x="28" y="49" width="26" height="7" rx="3.5" fill={FOX} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={210 + i * 30} y="49" width="22" height="6" rx="3" fill={GHOST} />
        ))}
        {/* hero */}
        <rect x="18" y="70" width="284" height="42" rx="6" fill={PANEL} stroke={LINE} />
        <rect x="30" y="80" width="120" height="9" rx="4.5" fill="#4b4b4b" />
        <rect x="30" y="94" width="80" height="6" rx="3" fill={GHOST} />
        <rect x="212" y="82" width="78" height="20" rx="10" fill="rgba(255,122,26,0.16)" stroke={FOX} />
        {/* tres bloques */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={18 + i * 96} y="120" width="88" height="24" rx="6" fill={i === 1 ? 'rgba(255,122,26,0.10)' : PANEL} stroke={i === 1 ? FOX : LINE} />
        ))}
      </Window>
    </Svg>
  )
}

/** Venta en línea — tienda con carrito y pago. */
export function VisualEcommerce({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* productos */}
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x="18" y={44 + i * 52} width="160" height="46" rx="6" fill={PANEL} stroke={LINE} />
            <rect x="28" y={52 + i * 52} width="30" height="30" rx="5" fill="#1c1c1c" stroke={LINE} />
            <rect x="68" y={58 + i * 52} width="66" height="6" rx="3" fill={GHOST} />
            <rect x="68" y={70 + i * 52} width="34" height="7" rx="3.5" fill="#4b4b4b" />
            <rect x="146" y={60 + i * 52} width="22" height="14" rx="4" fill={i === 0 ? FOX : '#3f3f3f'} />
          </g>
        ))}
        {/* carrito / resumen */}
        <rect x="190" y="44" width="112" height="100" rx="8" fill={PANEL} stroke={LINE} />
        <path
          d="M202 60h6l5 22h20l5-14"
          fill="none"
          stroke={FOX}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="216" cy="88" r="2.6" fill={FOX} />
        <circle cx="232" cy="88" r="2.6" fill={FOX} />
        <rect x="202" y="100" width="88" height="6" rx="3" fill={GHOST} />
        <rect x="202" y="112" width="56" height="6" rx="3" fill="#333" />
        <rect x="202" y="126" width="88" height="14" rx="7" fill={FOX} />
      </Window>
    </Svg>
  )
}

/** Apps móviles — dos teléfonos con interfaz y notificación. */
export function VisualMobile({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* teléfono principal */}
        <rect x="122" y="40" width="76" height="112" rx="12" fill={PANEL} stroke={FOX} />
        <rect x="146" y="46" width="28" height="4" rx="2" fill={LINE} />
        <rect x="132" y="58" width="56" height="26" rx="6" fill="rgba(255,122,26,0.14)" stroke={FOX} />
        <rect x="140" y="66" width="30" height="5" rx="2.5" fill={FOX_L} />
        <rect x="140" y="75" width="20" height="4" rx="2" fill="#7a5233" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="132" y={92 + i * 14} width="56" height="9" rx="4" fill="#2f2f2f" />
        ))}
        <rect x="146" y="140" width="28" height="4" rx="2" fill={GHOST} />
        {/* teléfonos secundarios */}
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={i === 0 ? 40 : 216} y="56" width="62" height="88" rx="10" fill="#111" stroke={LINE} />
            {[0, 1, 2, 3].map((r) => (
              <rect
                key={r}
                x={i === 0 ? 50 : 226}
                y={70 + r * 16}
                width={r === 0 ? 42 : 34}
                height="8"
                rx="4"
                fill={r === 0 ? '#4b4b4b' : '#2a2a2a'}
              />
            ))}
          </g>
        ))}
      </Window>
    </Svg>
  )
}

/** Apps de escritorio — ventana nativa con menú y panel de datos. */
export function VisualDesktop({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* menú superior */}
        <line x1="6" y1="52" x2="314" y2="52" stroke={LINE} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={18 + i * 34} y={39} width="24" height="6" rx="3" fill={i === 0 ? FOX : GHOST} />
        ))}
        {/* árbol lateral */}
        <rect x="16" y="60" width="66" height="70" rx="6" fill={PANEL} stroke={LINE} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={24 + (i % 2) * 8} y={70 + i * 14} width={40 - (i % 2) * 8} height="6" rx="3" fill="#3a3a3a" />
        ))}
        {/* tabla */}
        <rect x="92" y="60" width="206" height="70" rx="6" fill={PANEL} stroke={LINE} />
        <line x1="92" y1="76" x2="298" y2="76" stroke={LINE} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={102 + c * 50}
              y={84 + r * 14}
              width={c === 3 ? 30 : 38}
              height="6"
              rx="3"
              fill={r === 0 && c === 3 ? FOX : '#2f2f2f'}
            />
          )),
        )}
        {[0, 1, 2, 3].map((c) => (
          <rect key={c} x={102 + c * 50} y="65" width="30" height="6" rx="3" fill={GHOST} />
        ))}
        {/* barra de estado */}
        <rect x="16" y="138" width="90" height="6" rx="3" fill="#333" />
      </Window>
    </Svg>
  )
}

/** Tarjetas digitales — tarjeta de presentación con QR y contacto. */
export function VisualCard({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* tarjeta */}
        <rect x="34" y="52" width="150" height="86" rx="10" fill={PANEL} stroke={FOX} />
        <circle cx="62" cy="80" r="14" fill="rgba(255,122,26,0.16)" stroke={FOX} />
        <circle cx="62" cy="76" r="5" fill={FOX_L} />
        <path d="M53 90a10 10 0 0 1 18 0" fill="none" stroke={FOX_L} strokeWidth="1.6" strokeLinecap="round" />
        <rect x="86" y="70" width="70" height="8" rx="4" fill="#4b4b4b" />
        <rect x="86" y="84" width="50" height="6" rx="3" fill={GHOST} />
        {[0, 1].map((i) => (
          <rect key={i} x="48" y={108 + i * 12} width={i === 0 ? 100 : 76} height="6" rx="3" fill="#2f2f2f" />
        ))}
        {/* QR */}
        <rect x="200" y="52" width="86" height="86" rx="10" fill={PANEL} stroke={LINE} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => {
            const solid = (r + c) % 2 === 0
            return (
              <rect
                key={`${r}-${c}`}
                x={214 + c * 22}
                y={66 + r * 22}
                width="16"
                height="16"
                rx="3"
                fill={solid ? FOX : '#2a2a2a'}
                opacity={solid ? 0.85 : 1}
              />
            )
          }),
        )}
      </Window>
    </Svg>
  )
}

/** Bases de datos — discos apilados, relaciones y consulta. */
export function VisualDatabase({ className }: VisualProps) {
  return (
    <Svg className={className}>
      <Window>
        {/* cilindro */}
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x="26" y={56 + i * 26} width="86" height="24" rx="12" fill={PANEL} stroke={i === 0 ? FOX : LINE} />
          ))}
          {[0, 1, 2].map((i) => (
            <ellipse key={`e${i}`} cx="69" cy={56 + i * 26} rx="43" ry="8" fill="#1c1c1c" stroke={i === 0 ? FOX : LINE} />
          ))}
          {[0, 1, 2].map((i) => (
            <circle key={`d${i}`} cx="44" cy={68 + i * 26} r="3.5" fill={i === 0 ? FOX : '#3f3f3f'} />
          ))}
        </g>
        {/* conexiones */}
        <path d="M112 82h34M146 82v-16h28M146 82v34h28" fill="none" stroke={LINE} strokeWidth="1.6" />
        {/* tablas relacionadas */}
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x="176" y={i === 0 ? 46 : 100} width="120" height="42" rx="6" fill={PANEL} stroke={i === 0 ? FOX : LINE} />
            <line x1="176" y1={i === 0 ? 60 : 114} x2="296" y2={i === 0 ? 60 : 114} stroke={LINE} />
            <rect x="186" y={i === 0 ? 51 : 105} width="40" height="5" rx="2.5" fill={i === 0 ? FOX_L : GHOST} />
            {[0, 1].map((r) => (
              <g key={r}>
                <rect x="186" y={(i === 0 ? 66 : 120) + r * 11} width="52" height="5" rx="2.5" fill="#333" />
                <rect x="248" y={(i === 0 ? 66 : 120) + r * 11} width="38" height="5" rx="2.5" fill="#2a2a2a" />
              </g>
            ))}
          </g>
        ))}
      </Window>
    </Svg>
  )
}

export const serviceVisuals = {
  web: VisualWeb,
  ecommerce: VisualEcommerce,
  mobile: VisualMobile,
  desktop: VisualDesktop,
  card: VisualCard,
  database: VisualDatabase,
  erp: VisualErp,
  crm: VisualCrm,
  pos: VisualPos,
  quote: VisualQuote,
  catalog: VisualCatalog,
  server: VisualServer,
  domain: VisualDomain,
  consult: VisualConsult,
} as const

export type ServiceVisualKey = keyof typeof serviceVisuals
