/**
 * Genera los logos que se publican, a partir del master en brand/.
 *
 * El master (1254x1254, ~1 MB) nunca se sube: solo sirve de origen. De él
 * salen las versiones del tamaño en que de verdad se muestran.
 *
 *   pnpm run logos
 */
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const master = resolve(raiz, 'brand/logo-master.png')
const publico = resolve(raiz, 'public')

/**
 * El logo se muestra a 36 px en el encabezado y a 176 px en el pie, así que
 * 256 px cubre ambos con holgura incluso en pantallas de alta densidad.
 */
const salidas = [
  { archivo: 'logo.webp', size: 256, fn: (p) => p.webp({ quality: 92 }) },
  { archivo: 'logo.png', size: 256, fn: (p) => p.png({ compressionLevel: 9, palette: true }) },
  { archivo: 'apple-touch-icon.png', size: 180, fn: (p) => p.png({ compressionLevel: 9, palette: true }) },
]

await mkdir(publico, { recursive: true })

const kb = async (ruta) => Math.round(((await stat(ruta)).size / 1024) * 10) / 10
console.log(`master: ${await kb(master)} KB`)

for (const { archivo, size, fn } of salidas) {
  const destino = resolve(publico, archivo)
  await fn(sharp(master).resize(size, size, { fit: 'contain', kernel: 'lanczos3' })).toFile(destino)
  console.log(`  ${archivo.padEnd(22)} ${size}px  ${await kb(destino)} KB`)
}
