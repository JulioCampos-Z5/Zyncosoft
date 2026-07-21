const cols = [
  {
    title: 'Para ordenar tu operación',
    links: [
      'Inventario y ventas (ERP)',
      'Clientes y seguimiento (CRM)',
      'Punto de venta',
      'Cotizaciones',
      'Catálogo en línea',
    ],
  },
  {
    title: 'Para que todo siga en línea',
    links: [
      'Servidores y hosting',
      'Dominio de tu empresa',
      'Correo profesional',
      'Respaldos y monitoreo',
    ],
  },
  {
    title: 'Zyncosoft',
    links: ['Qué hacemos', 'Por qué nosotros', 'Cómo trabajamos', 'Contacto'],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-line/60 py-14">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex items-center gap-5 lg:col-span-2">
            <img
              src="/logo.png"
              alt="Logotipo de Zyncosoft"
              width={176}
              height={176}
              className="h-28 w-28 shrink-0 rounded-2xl bg-white p-2 sm:h-36 sm:w-36 lg:h-44 lg:w-44"
            />
            <p className="max-w-xs text-sm text-neutral-400">
              Hacemos el sistema que tu empresa necesita y nos encargamos de que
              funcione todos los días.
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
