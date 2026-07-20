/**
 * Gráfico "antes vs. después": los mismos 5 servicios que hoy contratas a
 * proveedores distintos y desconectados (izquierda) pasan a estar unificados
 * bajo un solo aliado, Zyncosoft (derecha). Comunica el valor de un vistazo.
 */

const FOX = '#ff7a1a'
const FOX_L = '#ff9d4d'
const LINE = '#2a2a2a'

const items = ['Software', 'Servidores', 'Dominios', 'Correo', 'Soporte']

// Posiciones dispersas (desordenadas) de las tarjetas "Antes", en abanico a
// la derecha del nodo "Tú" para que ninguna se solape con él.
const before = [
  { x: 74, y: 50 },
  { x: 100, y: 84 },
  { x: 78, y: 118 },
  { x: 102, y: 152 },
  { x: 72, y: 186 },
]
const you = { x: 42, y: 122 }

export default function WhyVisual({ className = '' }: { className?: string }) {
  const hub = { x: 300, y: 130 }
  // Filas de servicios a la derecha, conectadas al hub.
  const after = items.map((label, i) => ({
    label,
    x: 372,
    y: 74 + i * 28,
  }))

  return (
    <svg
      viewBox="0 0 460 250"
      className={className}
      role="img"
      aria-label="Los mismos cinco servicios, antes con proveedores separados y ahora unificados en Zyncosoft"
    >
      {/* ================= ANTES ================= */}
      <text x="100" y="26" textAnchor="middle" fill="#8a8a8a" fontSize="13" fontFamily="Poppins, sans-serif" fontWeight="600">
        Antes
      </text>
      <text x="100" y="42" textAnchor="middle" fill="#6b6b6b" fontSize="10.5" fontFamily="Raleway, sans-serif">
        5 proveedores distintos
      </text>
      {/* signo de interrogación / caos: cliente rodeado */}
      {before.map((p, i) => (
        <g key={i}>
          {/* línea entrecortada del cliente a cada proveedor (desorden) */}
          <line
            x1={you.x + 12}
            y1={you.y}
            x2={p.x}
            y2={p.y + 14}
            stroke="#333"
            strokeWidth="1.2"
            strokeDasharray="2 4"
          />
          <rect x={p.x} y={p.y} width="86" height="28" rx="7" fill="#161616" stroke={LINE} />
          <circle cx={p.x + 15} cy={p.y + 14} r="4.5" fill="#4b4b4b" />
          <text x={p.x + 27} y={p.y + 18} fill="#8f8f8f" fontSize="10" fontFamily="Raleway, sans-serif">
            {items[i]}
          </text>
        </g>
      ))}
      {/* nodo cliente "Tú" */}
      <circle cx={you.x} cy={you.y} r="14" fill="#1c1c1c" stroke="#666" strokeWidth="1.5" />
      <text x={you.x} y={you.y + 4} textAnchor="middle" fill="#cfcfcf" fontSize="10" fontWeight="700" fontFamily="Poppins, sans-serif">
        Tú
      </text>

      {/* ================= FLECHA ================= */}
      <line x1="196" y1="130" x2="224" y2="130" stroke={FOX} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M219 123l8 7-8 7" fill="none" stroke={FOX} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* ================= CON ZYNCOSOFT ================= */}
      <text x="330" y="26" textAnchor="middle" fill={FOX_L} fontSize="13" fontFamily="Poppins, sans-serif" fontWeight="600">
        Con Zyncosoft
      </text>
      <text x="330" y="42" textAnchor="middle" fill="#8a8a8a" fontSize="10.5" fontFamily="Raleway, sans-serif">
        un solo aliado
      </text>

      {/* conexiones limpias del hub a cada servicio */}
      {after.map((n, i) => (
        <line key={i} x1={hub.x} y1={hub.y} x2={n.x - 8} y2={n.y} stroke="rgba(255,122,26,0.45)" strokeWidth="1.6" />
      ))}
      {/* servicios ordenados */}
      {after.map((n, i) => (
        <g key={i}>
          <circle cx={n.x - 8} cy={n.y} r="5.5" fill="#171717" stroke={FOX} strokeWidth="1.5" />
          <circle cx={n.x - 8} cy={n.y} r="2.2" fill={FOX_L} />
          <text x={n.x + 4} y={n.y + 3.5} fill="#c4c4c4" fontSize="10.5" fontFamily="Raleway, sans-serif">
            {n.label}
          </text>
        </g>
      ))}

      {/* hub central */}
      <circle cx={hub.x} cy={hub.y} r="26" fill="rgba(255,122,26,0.14)" stroke={FOX} strokeWidth="1.8" />
      <circle cx={hub.x} cy={hub.y} r="26" fill="none" stroke={FOX} strokeWidth="1.5">
        <animate attributeName="r" values="26;33;26" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <text x={hub.x} y={hub.y + 6} textAnchor="middle" fill={FOX} fontSize="18" fontWeight="800" fontFamily="Poppins, sans-serif">
        Z
      </text>
    </svg>
  )
}
