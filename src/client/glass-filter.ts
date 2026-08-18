/**
 * SVG filter ported from liquid-glass-react GlassFilter (MIT, Copyright 2025
 * MAX ROVENSKY). One shared filter: shader displacement map, per-channel
 * chromatic `feDisplacementMap`, edge mask, clean well. The overlay stylesheet
 * applies `filter: url(#id)` to an empty `::before` warp layer so host text
 * stays sharp.
 */

/** Filter id referenced by the overlay stylesheet's warp-layer `filter`. */
export const GLASS_FILTER_ID = 'dsh-liquid-glass-lens'

/** Body attribute selecting the CSS-only (no SVG displacement) engine. */
export const GLASS_ENGINE_ATTRIBUTE = 'data-dsh-liquid-glass-engine'

/** Value of {@link GLASS_ENGINE_ATTRIBUTE} when SVG displacement is unavailable. */
export const GLASS_ENGINE_CSS = 'css'

/** Default `feDisplacementMap` scale, matching a mid-size liquid-glass-react pill. */
export const GLASS_DISPLACEMENT_SCALE = 40

/** Default chromatic-aberration intensity from liquid-glass-react. */
export const GLASS_ABERRATION_INTENSITY = 2

/**
 * Radial SVG fallback used when canvas cannot emit a PNG map (jsdom without
 * 2D, tainted canvas). Neutral well, saturated rim.
 */
const FALLBACK_LENS_SVG = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">',
  '<defs>',
  '<radialGradient id="dsh-glass-lens" cx="50%" cy="40%" r="72%">',
  '<stop offset="0%" stop-color="rgb(128,128,128)"/>',
  '<stop offset="52%" stop-color="rgb(128,128,128)"/>',
  '<stop offset="78%" stop-color="rgb(176,104,142)"/>',
  '<stop offset="100%" stop-color="rgb(214,64,156)"/>',
  '</radialGradient>',
  '</defs>',
  '<rect width="128" height="128" fill="rgb(128,128,128)"/>',
  '<rect width="128" height="128" rx="28" ry="28" fill="url(#dsh-glass-lens)"/>',
  '</svg>',
].join('')

/** Data-URL fallback displacement map. */
export const FALLBACK_LENS_MAP_HREF = `data:image/svg+xml,${encodeURIComponent(FALLBACK_LENS_SVG)}`

/**
 * Options for {@link buildGlassFilterSvg}.
 */
export interface GlassFilterOptions {
  /** Displacement-map image href (PNG or SVG data URL). */
  mapHref: string
  /** Filter element id. Defaults to {@link GLASS_FILTER_ID}. */
  id?: string
  /** `feDisplacementMap` scale in CSS pixels. */
  displacementScale?: number
  /** Chromatic-aberration strength used by liquid-glass-react. */
  aberrationIntensity?: number
}

/**
 * Pick the shader PNG when canvas produced one, otherwise the SVG rim map.
 * @param generated - `generateLiquidGlassMap` result.
 * @returns href safe to drop into `feImage`.
 */
export function displacementMapHref(generated: string | undefined): string {
  return generated ?? FALLBACK_LENS_MAP_HREF
}

/**
 * Firefox has no `feDisplacementMap` on CSS `filter` / `backdrop-filter`.
 * @param userAgent - `navigator.userAgent`.
 * @returns true when the overlay must use blur/saturate only.
 */
export function isCssOnlyGlassEngine(userAgent: string): boolean {
  return userAgent.toLowerCase().includes('firefox')
}

/**
 * Escape a value for a double-quoted XML attribute.
 * @param value - raw attribute text.
 * @returns XML-safe attribute value.
 */
function escapeXmlAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

/**
 * Build the hidden SVG document fragment `installOverlay` inserts so
 * `filter: url(#dsh-liquid-glass-lens)` can resolve.
 * @param options - map href and optional scale / aberration.
 * @returns an SVG markup string.
 */
export function buildGlassFilterSvg(options: GlassFilterOptions): string {
  const id = options.id ?? GLASS_FILTER_ID
  const scale = options.displacementScale ?? GLASS_DISPLACEMENT_SCALE
  const aberration = options.aberrationIntensity ?? GLASS_ABERRATION_INTENSITY
  const href = escapeXmlAttr(options.mapHref)
  const greenScale = scale * (1 - aberration * 0.05)
  const blueScale = scale * (1 - aberration * 0.1)
  const blur = Math.max(0.1, 0.5 - aberration * 0.1)
  const edgeAlpha = aberration * 0.05
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"',
    '  width="0" height="0" aria-hidden="true" focusable="false">',
    '  <defs>',
    `    <filter id="${id}" x="-35%" y="-35%" width="170%" height="170%"`,
    '      color-interpolation-filters="sRGB">',
    `      <feImage href="${href}" xlink:href="${href}"`,
    '        x="0" y="0" width="100%" height="100%"',
    '        preserveAspectRatio="xMidYMid slice" result="DISPLACEMENT_MAP"/>',
    '      <feColorMatrix in="DISPLACEMENT_MAP" type="matrix"',
    '        values="0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0 0 0 1 0"',
    '        result="EDGE_INTENSITY"/>',
    '      <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">',
    `        <feFuncA type="discrete" tableValues="0 ${edgeAlpha} 1"/>`,
    '      </feComponentTransfer>',
    '      <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL"/>',
    `      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${scale}"`,
    '        xChannelSelector="R" yChannelSelector="B" result="RED_DISPLACED"/>',
    '      <feColorMatrix in="RED_DISPLACED" type="matrix"',
    '        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="RED_CHANNEL"/>',
    `      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${greenScale}"`,
    '        xChannelSelector="R" yChannelSelector="B" result="GREEN_DISPLACED"/>',
    '      <feColorMatrix in="GREEN_DISPLACED" type="matrix"',
    '        values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="GREEN_CHANNEL"/>',
    `      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${blueScale}"`,
    '        xChannelSelector="R" yChannelSelector="B" result="BLUE_DISPLACED"/>',
    '      <feColorMatrix in="BLUE_DISPLACED" type="matrix"',
    '        values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="BLUE_CHANNEL"/>',
    '      <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED"/>',
    '      <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED"/>',
    `      <feGaussianBlur in="RGB_COMBINED" stdDeviation="${blur}" result="ABERRATED_BLURRED"/>`,
    '      <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION"/>',
    '      <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">',
    '        <feFuncA type="table" tableValues="1 0"/>',
    '      </feComponentTransfer>',
    '      <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN"/>',
    '      <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over"/>',
    '    </filter>',
    '  </defs>',
    '</svg>',
  ].join('')
}
