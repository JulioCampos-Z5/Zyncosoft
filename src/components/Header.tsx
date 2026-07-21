import { useEffect, useState } from 'react'
import { IconWhatsapp } from './icons'
import { WHATSAPP_URL } from '../lib/contacto'

const links = [
  { href: '#servicios', label: 'Qué hacemos' },
  { href: '#porque', label: 'Por qué nosotros' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-ink-line/80 bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Inicio Zyncosoft">
          <img
            src="/logo.png"
            alt="Logotipo de Zyncosoft"
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg bg-white p-0.5"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Zyncosoft
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contacto"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
          >
            Hablemos
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-line bg-ink/95 backdrop-blur-xl md:hidden">
          <nav className="container-x flex flex-col py-4" aria-label="Móvil">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-neutral-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              <IconWhatsapp className="h-4 w-4" />
              Escríbenos por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
