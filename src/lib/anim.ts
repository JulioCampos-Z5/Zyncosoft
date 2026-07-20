export const clamp = (v: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Mapea `v` del rango [inMin,inMax] al rango [outMin,outMax], acotado. */
export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  if (inMax === inMin) return outMin
  const t = clamp((v - inMin) / (inMax - inMin))
  return outMin + (outMax - outMin) * t
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
