/**
 * Productos de Zyncosoft: soluciones ya armadas que se entregan personalizadas,
 * a diferencia de los proyectos (`data/proyectos.ts`), que son trabajos hechos
 * a la medida de un cliente concreto.
 *
 * Cada producto necesita `nombre`, `resumen`, sus `puntos` y la `demo` pública
 * que se puede abrir para verlo funcionando.
 */

import type { ServiceVisualKey } from '../components/ServiceVisuals'

export type Producto = {
  /** Identificador corto y estable, se usa como key. */
  slug: string
  /** Nombre técnico: se muestra pequeño, sobre el título. */
  tag: string
  nombre: string
  /** Una o dos líneas: qué resuelve, en lenguaje de negocio. */
  resumen: string
  /** Lo que incluye, en frases cortas. */
  puntos: string[]
  /** Enlace público para verlo funcionando. */
  demo: string
  /** Maqueta que lo representa, de `ServiceVisuals`. */
  visual: ServiceVisualKey
}

export const productos: Producto[] = [
  {
    slug: 'menus-digitales',
    tag: 'Menús digitales',
    nombre: 'Tu carta en el celular del cliente',
    resumen:
      'El comensal escanea el QR de la mesa y ve tu menú completo con fotos y precios. Cambias un precio y queda cambiado al instante, sin reimprimir cartas.',
    puntos: [
      'QR para mesas, mostrador y redes',
      'Fotos, precios y categorías',
      'Español e inglés',
      'Pedidos directos por WhatsApp',
      'Actualizas cuando quieras, sin volver a imprimir',
    ],
    demo: 'https://mimc.pages.dev/',
    visual: 'menu',
  },
  {
    slug: 'tarjetas-digitales',
    tag: 'Tarjetas digitales',
    nombre: 'Tu tarjeta de presentación, sin papel',
    resumen:
      'Un link con tus datos, tus redes y tu WhatsApp. Se manda por cualquier chat, trae su propio QR para escanear y quien la abre guarda tu contacto de un toque.',
    puntos: [
      'Botones directos a WhatsApp, llamada, correo, LinkedIn, Instagram y tu sitio',
      'Su propio QR, listo para imprimir o mostrar en pantalla',
      'Guardar contacto: tus datos entran a la agenda del celular sin teclear nada',
      'Un botón de servicios con todo lo que ofreces, sin salir de la tarjeta',
      'Una tarjeta para la empresa y otra para cada persona del equipo, con su cargo',
      'Se instala como app en el celular y abre aunque no haya internet',
    ],
    demo: 'https://tarjeta-zincosoft.pages.dev/',
    visual: 'card',
  },
]
