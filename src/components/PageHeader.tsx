/**
 * Cabecera de las vistas que viven fuera de la portada (productos, proyectos).
 * No es fija ni reacciona al scroll: esas vistas no tienen el pin de secciones
 * de la portada, así que basta con el logo de vuelta a inicio y el CTA.
 */
export default function PageHeader() {
  return (
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
  )
}
