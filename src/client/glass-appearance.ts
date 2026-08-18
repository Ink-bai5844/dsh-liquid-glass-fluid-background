/**
 * Write live liquid-glass tunables onto `document.body` and rebuild the SVG
 * lens when displacement or aberration changes.
 */

import {
  resolveCanvasBackground, resolveGlassSettings, type GlassSettings,
} from '../glass-settings.ts'
import {
  buildGlassFilterSvg, displacementMapHref,
} from './glass-filter.ts'
import { generateLiquidGlassMap, GLASS_MAP_EDGE } from './shader-displacement.ts'

/** Body attribute set when a custom canvas fill is active. */
export const GLASS_CANVAS_ATTRIBUTE = 'data-dsh-glass-canvas'

/** CSS custom properties written by {@link writeGlassAppearance}. */
export const GLASS_VAR_BLUR = '--dsh-glass-blur'
/** Saturation custom property. */
export const GLASS_VAR_SATURATE = '--dsh-glass-saturate'
/** Corner-radius custom property. */
export const GLASS_VAR_RADIUS = '--dsh-glass-radius'
/** Column-gap custom property. */
export const GLASS_VAR_GAP = '--dsh-glass-gap'
/** Canvas-fill custom property. */
export const GLASS_VAR_CANVAS = '--dsh-glass-canvas'

const VARS = [GLASS_VAR_BLUR, GLASS_VAR_SATURATE, GLASS_VAR_RADIUS, GLASS_VAR_GAP, GLASS_VAR_CANVAS] as const

/**
 * Apply tunables to the document: CSS variables, optional canvas attribute,
 * and a rebuilt displacement filter.
 * @param body - document body that carries the overlay attribute.
 * @param defs - element that hosts the SVG filter fragment.
 * @param section - current host section; missing fields use schema defaults.
 */
export function writeGlassAppearance(
  body: HTMLElement,
  defs: HTMLElement,
  section: Partial<GlassSettings>,
): void {
  const next = resolveGlassSettings(section)
  body.style.setProperty(GLASS_VAR_BLUR, `${String(next.blurPx)}px`)
  body.style.setProperty(GLASS_VAR_SATURATE, `${String(next.saturatePct)}%`)
  body.style.setProperty(GLASS_VAR_RADIUS, `${String(next.radiusPx)}px`)
  body.style.setProperty(GLASS_VAR_GAP, `${String(next.gapPx)}px`)
  const canvas = next.fluidEnabled ? '' : resolveCanvasBackground(next.canvas)
  if (canvas === '') {
    body.style.removeProperty(GLASS_VAR_CANVAS)
    body.removeAttribute(GLASS_CANVAS_ATTRIBUTE)
  } else {
    body.style.setProperty(GLASS_VAR_CANVAS, canvas)
    body.setAttribute(GLASS_CANVAS_ATTRIBUTE, '')
  }
  defs.innerHTML = buildGlassFilterSvg({
    mapHref: displacementMapHref(generateLiquidGlassMap(GLASS_MAP_EDGE, GLASS_MAP_EDGE)),
    displacementScale: next.displace,
    aberrationIntensity: next.aberration,
  })
}

/**
 * Remove tunables written by {@link writeGlassAppearance}.
 * @param body - document body that carried the overlay attribute.
 */
export function clearGlassAppearance(body: HTMLElement): void {
  for (const name of VARS) body.style.removeProperty(name)
  body.removeAttribute(GLASS_CANVAS_ATTRIBUTE)
}
