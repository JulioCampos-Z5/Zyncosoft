import { IconArrow, IconMail, IconPhone } from './icons'

export default function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-soft px-6 py-14 sm:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(50% 80% at 80% 0%, rgba(255,122,26,0.14), transparent 70%)',
            }}
          />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Hablemos de tu próximo proyecto
              </h2>
              <p className="mt-4 max-w-md text-neutral-400">
                Cuéntanos qué necesita tu empresa. Te ayudamos a elegir e
                implementar la solución tecnológica adecuada, sin complicaciones.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="mailto:contacto@zyncosoft.com"
                  className="inline-flex items-center gap-3 text-neutral-300 transition-colors hover:text-white"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-fox-400 ring-1 ring-inset ring-white/10">
                    <IconMail className="h-5 w-5" />
                  </span>
                  contacto@zyncosoft.com
                </a>
                <a
                  href="tel:+520000000000"
                  className="inline-flex items-center gap-3 text-neutral-300 transition-colors hover:text-white"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-fox-400 ring-1 ring-inset ring-white/10">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  +52 000 000 0000
                </a>
              </div>
            </div>

            <form
              className="rounded-2xl border border-ink-line bg-ink p-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4">
                <Field label="Nombre" name="nombre" placeholder="Tu nombre" />
                <Field
                  label="Correo"
                  name="correo"
                  type="email"
                  placeholder="tucorreo@empresa.com"
                />
                <Field
                  label="Empresa"
                  name="empresa"
                  placeholder="Nombre de tu empresa"
                />
                <label className="text-sm">
                  <span className="mb-1.5 block text-neutral-300">
                    ¿Qué necesitas?
                  </span>
                  <textarea
                    name="mensaje"
                    rows={3}
                    placeholder="Cuéntanos sobre tu proyecto…"
                    className="w-full resize-none rounded-lg border border-ink-line bg-ink-soft px-3.5 py-2.5 text-white placeholder:text-neutral-600 focus:border-fox-500 focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
                >
                  Enviar mensaje
                  <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
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
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <label className="text-sm">
      <span className="mb-1.5 block text-neutral-300">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-line bg-ink-soft px-3.5 py-2.5 text-white placeholder:text-neutral-600 focus:border-fox-500 focus:outline-none"
      />
    </label>
  )
}
