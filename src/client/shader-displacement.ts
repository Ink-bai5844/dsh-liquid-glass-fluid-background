/**
 * Rounded-rect SDF displacement generator, adapted from liquid-glass-react
 * (MIT, Copyright 2025 MAX ROVENSKY; shader from shuding/liquid-glass).
 * Red/blue channels encode how far each pixel bends toward the glass well.
 */

/** One 2D sample in unit UV space. */
export interface Vec2 {
  /** Horizontal coordinate in 0..1. */
  x: number
  /** Vertical coordinate in 0..1. */
  y: number
}

/** Shared map edge in CSS pixels; stretched onto every glass plate. */
export const GLASS_MAP_EDGE = 128

/**
 * Smoothstep interpolation used by the liquid-glass fragment.
 * @param a - lower edge.
 * @param b - upper edge.
 * @param t - sample.
 * @returns hermite-smoothed 0..1 value.
 */
function smoothStep(a: number, b: number, t: number): number {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

/**
 * Length of a 2D vector.
 * @param x - x component.
 * @param y - y component.
 * @returns Euclidean length.
 */
function length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y)
}

/**
 * Signed distance to a rounded rectangle centered at the origin.
 * @param x - sample x.
 * @param y - sample y.
 * @param width - half-width before radius.
 * @param height - half-height before radius.
 * @param radius - corner radius.
 * @returns signed distance (negative inside).
 */
function roundedRectSdf(x: number, y: number, width: number, height: number, radius: number): number {
  const qx = Math.abs(x) - width + radius
  const qy = Math.abs(y) - height + radius
  return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius
}

/**
 * Liquid-glass fragment: stronger displacement at the rim, quiet in the well.
 * @param uv - unit-square sample.
 * @returns remapped UV used as a displacement source.
 */
export function liquidGlassFragment(uv: Vec2): Vec2 {
  const ix = uv.x - 0.5
  const iy = uv.y - 0.5
  const distanceToEdge = roundedRectSdf(ix, iy, 0.3, 0.2, 0.6)
  const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
  const scaled = smoothStep(0, 1, displacement)
  return { x: ix * scaled + 0.5, y: iy * scaled + 0.5 }
}

function displacementAt(x: number, y: number, width: number, height: number): Vec2 {
  const pos = liquidGlassFragment({ x: x / width, y: y / height })
  return { x: pos.x * width - x, y: pos.y * height - y }
}

/**
 * Rasterize the liquid-glass fragment into RGBA bytes (R = X, G/B = Y).
 * @param width - map width in CSS pixels; must be a positive integer.
 * @param height - map height in CSS pixels; must be a positive integer.
 * @returns tightly packed RGBA bytes, or an empty buffer when either edge is < 1.
 */
export function renderDisplacementRgba(width: number, height: number): Uint8ClampedArray {
  if (width < 1 || height < 1) return new Uint8ClampedArray(0)
  let maxScale = 0
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const delta = displacementAt(x, y, width, height)
      maxScale = Math.max(maxScale, Math.abs(delta.x), Math.abs(delta.y))
    }
  }
  if (maxScale < 1) maxScale = 1

  const pixels = new Uint8ClampedArray(width * height * 4)
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const delta = displacementAt(x, y, width, height)
      const edgeDistance = Math.min(x, y, width - x - 1, height - y - 1)
      const edgeFactor = Math.min(1, edgeDistance / 2)
      const r = (delta.x * edgeFactor) / maxScale + 0.5
      const g = (delta.y * edgeFactor) / maxScale + 0.5
      const pixel = (y * width + x) * 4
      pixels[pixel] = r * 255
      pixels[pixel + 1] = g * 255
      pixels[pixel + 2] = g * 255
      pixels[pixel + 3] = 255
    }
  }
  return pixels
}

/**
 * Rasterize the liquid-glass fragment into a PNG data URL.
 * @param width - map width in CSS pixels.
 * @param height - map height in CSS pixels.
 * @returns `data:image/png;base64,...`, or undefined when canvas 2D is unavailable.
 */
export function generateLiquidGlassMap(width: number, height: number): string | undefined {
  if (typeof document === 'undefined') return undefined
  if (width < 1 || height < 1) return undefined
  let canvas: HTMLCanvasElement
  try {
    canvas = document.createElement('canvas')
  } catch {
    /* v8 ignore next -- jsdom always provides createElement('canvas') */
    return undefined
  }
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (context === null) return undefined
  const pixels = renderDisplacementRgba(width, height)
  const image = context.createImageData(width, height)
  image.data.set(pixels)
  try {
    context.putImageData(image, 0, 0)
    const url = canvas.toDataURL('image/png')
    return typeof url === 'string' && url.startsWith('data:image/') ? url : undefined
  } catch {
    return undefined
  }
}
