import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useScrollProgress'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Direction, string> = {
  up: 'translateY(40px)',
  down: 'translateY(-40px)',
  left: 'translateX(48px)',
  right: 'translateX(-48px)',
  none: 'translateY(0)',
}

/**
 * Revela su contenido al entrar en el viewport con un movimiento dinámico
 * (deslizamiento + escala + desenfoque a nítido). Ideal para transiciones
 * entre secciones.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  blur = true,
}: {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  blur?: boolean
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.25)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown
          ? 'translate3d(0,0,0) scale(1)'
          : `${offset[direction]} scale(0.97)`,
        filter: blur && !shown ? 'blur(10px)' : 'blur(0px)',
        transition:
          'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.8s cubic-bezier(0.16,1,0.3,1)',
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  )
}
