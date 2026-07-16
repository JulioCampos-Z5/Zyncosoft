const cols = [
  {
    title: 'Soluciones',
    links: ['ERP', 'CRM', 'Puntos de venta', 'Cotizadores', 'Catálogos'],
  },
  {
    title: 'Infraestructura',
    links: ['Servidores', 'Hosting', 'Dominios', 'Correo corporativo'],
  },
  {
    title: 'Empresa',
    links: ['Servicios', 'Por qué Zyncosoft', 'Proceso', 'Contacto'],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-line/60 py-14">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Logotipo de Zyncosoft"
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg bg-white p-0.5"
              />
              <span className="text-lg font-semibold text-white">Zyncosoft</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-neutral-400">
              Software administrativo a la medida e infraestructura tecnológica
              para hacer crecer tu empresa.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold text-white">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#servicios"
                      className="text-sm text-neutral-400 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink-line/60 pt-6 text-sm text-neutral-500 sm:flex-row">
          <p>© {year} Zyncosoft. Todos los derechos reservados.</p>
          <p>Hecho con astucia. 🦊</p>
        </div>
      </div>
    </footer>
  )
}
