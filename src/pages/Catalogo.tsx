import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import WhatsappFab from '../components/WhatsappFab'
import { categorias, proyectos, type CategoriaProyecto } from '../data/proyectos'

type Filtro = CategoriaProyecto | 'Todo'

export default function Catalogo() {
  const [filtro, setFiltro] = useState<Filtro>('Todo')

  // Solo se ofrecen los filtros que de verdad tienen trabajos detrás
  const disponibles = useMemo(() => {
    const usadas = new Set(proyectos.map((p) => p.categoria))
    return categorias.filter((c) => usadas.has(c))
  }, [])

  const visibles = useMemo(
    () =>
      (filtro === 'Todo'
        ? proyectos
        : proyectos.filter((p) => p.categoria === filtro)
      ).slice().sort((a, b) => b.anio - a.anio),
    [filtro],
  )

  return (
    <>
      {/* Cabecera propia: la vista vive fuera del scroll de la portada */}
      <header className="border-b border-ink-line/60 bg-ink/85 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5" aria-label="Inicio Zyncosoft">
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
          <a
            href="/#contacto"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
          >
            Hablemos
          </a>
        </div>
      </header>

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
                Catálogo
              </p>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Lo que hemos hecho para otros negocios
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 max-w-xl text-neutral-400">
                Sistemas, sitios y aplicaciones que hoy están funcionando. Entra
                a los que son públicos y mira cómo quedaron.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-x">
            {/* Filtros por tipo de trabajo */}
            <div className="flex flex-wrap gap-2">
              {(['Todo', ...disponibles] as Filtro[]).map((c) => {
                const activo = c === filtro
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFiltro(c)}
                    aria-pressed={activo}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      activo
                        ? 'border-fox-500 bg-fox-500/10 font-semibold text-fox-400'
                        : 'border-ink-line text-neutral-400 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibles.map((p) => {
                const publico = Boolean(p.url)
                const Card = publico ? 'a' : 'div'
                return (
                  <Card
                    key={p.slug}
                    {...(publico
                      ? {
                          href: p.url,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        }
                      : {})}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink-soft transition-colors hover:border-fox-500/60"
                  >
                    <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-ink-line bg-ink">
                      {p.imagen ? (
                        <img
                          src={p.imagen}
                          alt={`Vista del proyecto ${p.nombre}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        // Marcador mientras no haya captura del proyecto
                        <span className="font-display text-4xl font-bold text-neutral-800">
                          {p.nombre.charAt(0)}
                        </span>
                      )}
                      <span className="absolute left-4 top-4 rounded-full border border-ink-line bg-ink/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-fox-500 backdrop-blur">
                        {p.categoria}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h2 className="text-lg font-semibold leading-snug text-white">
                          {p.nombre}
                        </h2>
                        <span className="shrink-0 text-xs text-neutral-600">
                          {p.anio}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-neutral-500">{p.cliente}</p>
                      <p className="mt-3 flex-1 text-[0.95rem] leading-snug text-neutral-400">
                        {p.resumen}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.etiquetas.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-ink-line px-2.5 py-1 text-xs text-neutral-500"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {publico ? (
                        <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                          Ver el trabajo
                          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17 17 7M9 7h8v8" />
                          </svg>
                        </p>
                      ) : (
                        // Sin enlace público: lo enseñamos en vivo a quien lo pida
                        <a
                          href="/#contacto"
                          className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-fox-500 transition-colors hover:text-fox-400"
                        >
                          Solicitar demo
                          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </Card>
                )
              })}

              {/* Cierre: invitación a formar parte del catálogo */}
              <div className="flex flex-col justify-center rounded-3xl border border-dashed border-ink-line p-7 text-center">
                <p className="text-lg font-semibold text-white">
                  ¿El siguiente es el tuyo?
                </p>
                <p className="mt-2 text-sm text-neutral-400">
                  Cuéntanos qué necesitas y te decimos cómo lo resolveríamos.
                </p>
                <a
                  href="/#contacto"
                  className="mx-auto mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-fox-500"
                >
                  Cuéntanos tu caso
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappFab />
    </>
  )
}
