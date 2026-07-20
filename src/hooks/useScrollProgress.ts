import { useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Progreso (0 → 1) de una sección "pinned" mientras se recorre su zona
 * de scroll. Pensado para secciones altas cuyo contenido interno es
 * `sticky` a 100vh: devuelve cuánto se ha avanzado dentro del rango.
 *
 * El valor se interpola (lerp) hacia el objetivo para un movimiento fluido.
 */
export function usePinProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = prefersReduced()

    let target = 0
    let value = 0
    let raf = 0

    const compute = () => {
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return 0
      const scrolled = -rect.top
      return Math.max(0, Math.min(1, scrolled / total))
    }

    const tick = () => {
      value += (target - value) * (reduced ? 1 : 0.2)
      if (Math.abs(target - value) < 0.001) value = target
      setProgress(value)
      if (value !== target) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    const onScroll = () => {
      target = compute()
      if (reduced) {
        setProgress(target)
        return
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { ref, progress }
}

/**
 * Progreso global de scroll de toda la página (0 → 1). Para la barra superior.
 */
export function useGlobalScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return progress
}

/**
 * Revela un elemento cuando entra en el viewport (IntersectionObserver).
 * Devuelve un ref y un booleano `shown` que queda en true la primera vez.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, shown }
}
