import { IconWhatsapp } from './icons'
import { WHATSAPP_URL } from '../lib/contacto'

/**
 * Botón flotante de WhatsApp. Solo en móvil: en escritorio ya están
 * los puntos de navegación en ese costado y el botón del encabezado.
 */
export default function WhatsappFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform active:scale-95 md:hidden"
    >
      <span
        aria-hidden
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20"
      />
      <IconWhatsapp className="relative h-7 w-7" />
    </a>
  )
}
