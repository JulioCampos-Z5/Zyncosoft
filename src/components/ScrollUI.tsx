import { useEffect, useState } from 'react'
import { useGlobalScrollProgress } from '../hooks/useScrollProgress'

/** Barra de progreso de lectura fija en la parte superior. */
export function ScrollProgressBar() {
  const progress = useGlobalScrollProgress()
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-fox-400 to-fox-600"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

const sections = [
  { id: 'top', label: 'Inicio' },
  { id: 'servicios', label: 'Qué hacemos' },
  { id: 'porque', label: 'Por qué nosotros' },
  { id: 'proceso', label: 'Cómo trabajamos' },
  { id: 'contacto', label: 'Contacto' },
]

/** Navegación lateral de puntos con la sección activa resaltada. */
export function SideDots() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id)
        },
        { threshold: 0.01, rootMargin: '-45% 0px -45% 0px' },
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav
      aria-label="Secciones"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
            aria-label={s.label}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'text-white opacity-100'
                  : 'opacity-0 -translate-x-1 text-neutral-400 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'scale-110 border-fox-500 bg-fox-500 shadow-[0_0_12px] shadow-fox-500/60'
                  : 'border-neutral-600 bg-transparent group-hover:border-neutral-400'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}
