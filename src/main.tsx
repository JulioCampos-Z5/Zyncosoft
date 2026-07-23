import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Catalogo from './pages/Catalogo.tsx'
import { CATALOGO_URL } from './lib/flags'

/**
 * Enrutado mínimo por ruta: el sitio es una portada y, aparte, la vista de
 * catálogo. Cloudflare Pages sirve index.html en cualquier ruta (_redirects),
 * así que basta con mirar el pathname al arrancar.
 */
const path = window.location.pathname.replace(/\/+$/, '')
const Vista = path === CATALOGO_URL ? Catalogo : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Vista />
  </StrictMode>,
)
