import { useEffect } from 'react'

const HEADER = 72

/**
 * Corrige el aterrizaje en una ancla (`/#contacto`) cuando se llega desde otra
 * vista o con la URL escrita a mano.
 *
 * El navegador salta al ancla en cuanto encuentra el elemento, pero la sección
 * de soluciones se mide después de montar y hace crecer la página varios miles
 * de píxeles: el salto original queda a media página. Por eso reposicionamos
 * un par de veces mientras el layout se acomoda, y nos hacemos a un lado en
 * cuanto el usuario toma el control del scroll.
 */
export function useHashLanding() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return

    // Evita que el navegador restaure una posición vieja al recargar
    const previo = history.scrollRestoration
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

    let cancelado = false
    const cancelar = () => {
      cancelado = true
    }

    const ir = () => {
      if (cancelado) return
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER
      window.scrollTo({ top, behavior: 'auto' })
    }

    // Ahora, tras el primer pintado y tras la re-medición de las secciones
    ir()
    const raf = requestAnimationFrame(ir)
    const t1 = setTimeout(ir, 360)
    const t2 = setTimeout(ir, 700)

    window.addEventListener('wheel', cancelar, { passive: true })
    window.addEventListener('touchstart', cancelar, { passive: true })
    window.addEventListener('keydown', cancelar)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('wheel', cancelar)
      window.removeEventListener('touchstart', cancelar)
      window.removeEventListener('keydown', cancelar)
      if ('scrollRestoration' in history) history.scrollRestoration = previo
    }
  }, [])
}
