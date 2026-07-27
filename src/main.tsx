import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Proyectos from './pages/Proyectos.tsx'
import { PROYECTOS_URL } from './lib/flags'

/**
 * Enrutado mínimo por ruta: el sitio es una portada y, aparte, la vista de
 * proyectos. Cloudflare Pages sirve index.html en cualquier ruta (_redirects),
 * así que basta con mirar el pathname al arrancar.
 */
const path = window.location.pathname.replace(/\/+$/, '')
const Vista = path === PROYECTOS_URL ? Proyectos : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Vista />
  </StrictMode>,
)
