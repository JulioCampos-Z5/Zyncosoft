import { useState } from 'react'
import { IconArrow, IconCheck, IconMail, IconPhone } from './icons'
import { useReveal } from '../hooks/useScrollProgress'

const serviceTags = [
  'ERP',
  'CRM',
  'Punto de venta',
  'Cotizadores',
  'Catálogos',
  'Servidores',
  'Dominios',
  'Consultoría',
]

const trust = ['Respuesta en 24 h', 'Sin compromiso', 'Propuesta a tu medida']

export default function Contact() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.2)
  const [selected, setSelected] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  const toggle = (tag: string) =>
    setSelected((s) =>
      s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag],
    )

  return (
    <section id="contacto" className="scroll-mt-20 py-28">
      <div className="container-x">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-soft px-6 py-14 transition-all duration-700 sm:px-14"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? 'none' : 'translateY(32px) scale(0.98)',
          }}
        >
          {/* Fondos coherentes con el resto del sitio */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(50% 80% at 82% 0%, rgba(255,122,26,0.16), transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage:
                'radial-gradient(70% 70% at 80% 10%, #000, transparent 75%)',
            }}
          />

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Columna informativa */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-fox-500">
                Contacto
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Hablemos de tu proyecto
              </h2>
              <p className="mt-4 max-w-md text-neutral-400">
                Cuéntanos qué necesitas. Te respondemos con una propuesta clara.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="mailto:contacto@zyncosoft.com"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-ink-line bg-ink/50 px-4 py-3 text-neutral-300 transition-colors hover:border-fox-600/40 hover:text-white"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fox-500/10 text-fox-400 ring-1 ring-inset ring-fox-500/20 transition-transform group-hover:scale-105">
                    <IconMail className="h-5 w-5" />
                  </span>
                  contacto@zyncosoft.com
                </a>
                <a
                  href="tel:+520000000000"
                  className="group inline-flex items-center gap-3 rounded-2xl border border-ink-line bg-ink/50 px-4 py-3 text-neutral-300 transition-colors hover:border-fox-600/40 hover:text-white"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-fox-500/10 text-fox-400 ring-1 ring-inset ring-fox-500/20 transition-transform group-hover:scale-105">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  +52 000 000 0000
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
                {trust.map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <IconCheck className="h-4 w-4 text-fox-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulario / estado de éxito */}
            <div className="relative rounded-2xl border border-ink-line bg-ink p-6 sm:p-7">
              {sent ? (
                <div className="flex animate-pop flex-col items-center py-10 text-center">
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-fox-500/15 ring-1 ring-inset ring-fox-500/30">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fox-500 opacity-20" />
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-fox-500" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12.5l5 5 11-11" pathLength={30} strokeDasharray={30} className="animate-draw-check" />
                    </svg>
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-neutral-400">
                    Gracias por escribirnos. Te contactaremos muy pronto con una
                    propuesta.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false)
                      setSelected([])
                    }}
                    className="mt-6 text-sm font-semibold text-fox-400 transition-colors hover:text-fox-500"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form
                  className="grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nombre" name="nombre" placeholder="Tu nombre" required />
                    <Field
                      label="Correo"
                      name="correo"
                      type="email"
                      placeholder="tucorreo@empresa.com"
                      required
                    />
                  </div>
                  <Field label="Empresa" name="empresa" placeholder="Nombre de tu empresa" />

                  {/* Selector de servicios con chips */}
                  <div>
                    <span className="mb-2 block text-sm text-neutral-300">
                      ¿En qué te ayudamos?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {serviceTags.map((tag) => {
                        const active = selected.includes(tag)
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={() => toggle(tag)}
                            aria-pressed={active}
                            className={`rounded-full border px-3.5 py-1.5 text-sm transition-all ${
                              active
                                ? 'border-fox-500 bg-fox-500/15 text-fox-400'
                                : 'border-ink-line bg-ink-soft text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                            }`}
                          >
                            {tag}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <label className="text-sm">
                    <span className="mb-1.5 block text-neutral-300">Mensaje</span>
                    <textarea
                      name="mensaje"
                      rows={3}
                      placeholder="Cuéntanos sobre tu proyecto…"
                      className="w-full resize-none rounded-xl border border-ink-line bg-ink-soft px-3.5 py-2.5 text-white transition-all placeholder:text-neutral-600 focus:border-fox-500 focus:outline-none focus:ring-4 focus:ring-fox-500/15"
                    />
                  </label>

                  <button
                    type="submit"
                    className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fox-400 to-fox-600 px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-fox-500/20 transition-all hover:shadow-fox-500/40"
                  >
                    Enviar mensaje
                    <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="text-sm">
      <span className="mb-1.5 block text-neutral-300">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-ink-line bg-ink-soft px-3.5 py-2.5 text-white transition-all placeholder:text-neutral-600 focus:border-fox-500 focus:outline-none focus:ring-4 focus:ring-fox-500/15"
      />
    </label>
  )
}
