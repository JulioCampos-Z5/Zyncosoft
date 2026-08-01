import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Proyectos from './pages/Proyectos.tsx'
import Productos from './pages/Productos.tsx'
import { PRODUCTOS_URL, PROYECTOS_URL } from './lib/flags'

/**
 * Enrutado mínimo por ruta: el sitio es una portada y, aparte, las vistas de
 * productos y proyectos. Cloudflare Pages sirve index.html en cualquier ruta
 * (_redirects), así que basta con mirar el pathname al arrancar.
 */
const rutas: Record<string, typeof App> = {
  [PRODUCTOS_URL]: Productos,
  [PROYECTOS_URL]: Proyectos,
}

const path = window.location.pathname.replace(/\/+$/, '')
const Vista = rutas[path] ?? App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Vista />
  </StrictMode>,
)
