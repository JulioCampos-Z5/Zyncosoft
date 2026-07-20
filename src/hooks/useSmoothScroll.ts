import { useEffect } from 'react'

/**
 * Scroll suave con inercia (efecto tipo Lenis) para dar esa sensación
 * "scrolljacking" premium: el scroll nativo se interpola hacia un objetivo,
 * generando un desplazamiento fluido y con momentum.
 *
 * - Se desactiva automáticamente en dispositivos táctiles (donde el scroll
 *   nativo ya es fluido) y cuando el usuario prefiere movimiento reducido.
 * - Respeta anclas (#id) haciendo un scroll suave hasta el destino.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isTouch) return

    let target = window.scrollY
    let current = window.scrollY
    let raf = 0
    let running = false

    const ease = 0.16 // entre más bajo, más "pesado"/suave

    const clamp = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      target = Math.max(0, Math.min(target, max))
    }

    const loop = () => {
      current += (target - current) * ease
      if (Math.abs(target - current) < 0.4) {
        current = target
        running = false
        window.scrollTo({ top: current, behavior: 'auto' })
        return
      }
      window.scrollTo({ top: current, behavior: 'auto' })
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!running) {
        running = true
        current = window.scrollY
        raf = requestAnimationFrame(loop)
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // zoom del navegador
      e.preventDefault()
      // Normaliza el delta según el modo (líneas/páginas) y da un poco de brío
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      target += e.deltaY * unit * 1.15
      clamp()
      start()
    }

    // Mantener el objetivo sincronizado si el scroll cambia por otras vías
    const onScroll = () => {
      if (!running) {
        target = window.scrollY
        current = window.scrollY
      }
    }

    // Scroll suave para enlaces internos
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const id = anchor.getAttribute('href')!.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      const top =
        el.getBoundingClientRect().top + window.scrollY - 72 /* header */
      target = top
      clamp()
      start()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick)
    }
  }, [])
}
