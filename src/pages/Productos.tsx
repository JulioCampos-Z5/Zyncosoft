import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'
import WhatsappFab from '../components/WhatsappFab'
import { serviceVisuals } from '../components/ServiceVisuals'
import { productos } from '../data/productos'

export default function Productos() {
  return (
    <>
      <PageHeader />

      <main>
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(45% 55% at 20% 20%, rgba(255,122,26,0.12), transparent 70%)',
            }}
          />
          <div className="container-x">
            <Reveal>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                Volver al inicio
              </a>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-fox-500">
                Productos
              </p>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Listos para usarse, personalizados para ti
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-xl text-neutral-400">
                Soluciones que ya están hechas y probadas. Les ponemos tu
                información, tu logo y tus colores, y quedan funcionando en
                días. Ábrelas y míralas por dentro.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-2">
              {productos.map((p, i) => {
                const Visual = serviceVisuals[p.visual]
                return (
                  <Reveal key={p.slug} delay={i * 120}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink-soft transition-colors hover:border-fox-500/60">
                      {/* Maqueta visual del producto */}
                      <div className="relative flex h-48 items-center justify-center border-b border-ink-line bg-ink px-6 pt-6 sm:h-56">
                        <Visual className="h-full w-full" />
                      </div>

                      <div className="flex flex-1 flex-col p-7">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-fox-500">
                          {p.tag}
                        </p>
                        <h2 className="mt-1.5 text-2xl font-semibold leading-snug text-white">
                          {p.nombre}
                        </h2>
                        <p className="mt-3 text-[0.95rem] leading-snug text-neutral-400">
                          {p.resumen}
                        </p>

                        <ul className="mt-5 flex-1 space-y-2.5">
                          {p.puntos.map((punto) => (
                            <li key={punto} className="flex items-start gap-2.5 text-sm text-neutral-300">
                              <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-fox-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              {punto}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-7 flex flex-wrap gap-3">
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
                          >
                            Ver demo
                            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17 17 7M9 7h8v8" />
                            </svg>
                          </a>
                          <a
                            href="/#contacto"
                            className="inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-fox-500 hover:text-fox-400"
                          >
                            Lo quiero
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>

            {/* Cierre: lo que no está en la lista se hace a la medida */}
            <Reveal delay={200}>
              <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-ink-line p-8 text-center">
                <p className="text-lg font-semibold text-white">
                  Vamos a ir sumando más
                </p>
                <p className="mt-2 max-w-md text-sm text-neutral-400">
                  Si lo que necesitas todavía no está aquí, lo hacemos a la
                  medida. Cuéntanos qué traes en mente.
                </p>
                <a
                  href="/#contacto"
                  className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
                >
                  Cuéntanos tu caso
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappFab />
    </>
  )
}
