/** Datos de contacto en un solo lugar: si cambia el número, se cambia aquí. */
export const TELEFONO = '3339057215'
export const TELEFONO_VISIBLE = '333 905 7215'
/** Formato internacional que exige wa.me (52 = México, sin +) */
const WHATSAPP_INTL = `52${TELEFONO}`

const MENSAJE = '¡Hola! Vengo de la página de Zyncosoft y me gustaría más información.'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(MENSAJE)}`
export const CORREO = 'zyncosoft@gmail.com'
export const SITIO_URL = 'https://zyncosoft.pages.dev/'
/** Generado con el mismo enlace que WHATSAPP_URL (ver public/qr-whatsapp.svg) */
export const QR_WHATSAPP = '/qr-whatsapp.svg'
