/**
 * Token overlay stacked through ThemeRuntime.overrideTokens. Each value is a
 * `{ light, dark }` pair so a scheme switch keeps the glass layer readable
 * without re-registering the layer.
 */

import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

/** Layer identity passed to overrideTokens; also names the origin for inspection. */
export const GLASS_TOKEN_SOURCE = 'ui-theme-liquid-glass'

/** Build one scheme pair. */
function pair(light: string, dark: string): { light: string; dark: string } {
  return { light, dark }
}

/**
 * Semi-transparent surfaces stacked on the built-in palettes. `--dsw-alias-bg-base`
 * and every text or state token stay untouched so underlying content shows
 * through and contrast is unchanged.
 */
export const GLASS_TOKEN_OVERRIDES: ThemeTokenOverrides = {
  '--dsw-alias-bg-layer-1': pair('rgba(255,255,255,0.22)', 'rgba(44,44,46,0.24)'),
  '--dsw-alias-bg-layer-2': pair('rgba(255,255,255,0.40)', 'rgba(53,54,56,0.40)'),
  '--dsw-alias-bg-layer-3': pair('rgba(255,255,255,0.46)', 'rgba(67,69,74,0.44)'),
  '--dsw-alias-bg-overlay': pair('rgba(245,246,247,0.42)', 'rgba(53,54,56,0.46)'),
  '--dsw-alias-bg-module-platform': pair('rgba(245,246,247,0.34)', 'rgba(35,35,36,0.36)'),
  '--dsw-specific-sidebar-fill': pair('rgba(250,250,250,0.20)', 'rgba(21,21,23,0.24)'),
  '--dsw-specific-menu': pair('rgba(255,255,255,0.40)', 'rgba(53,54,56,0.44)'),
  '--dsw-specific-selector': pair('rgba(245,246,247,0.36)', 'rgba(44,44,46,0.38)'),
  '--dsw-specific-bubble': pair('rgba(237,243,254,0.40)', 'rgba(44,44,46,0.40)'),
  '--dsw-specific-input-major': pair('rgba(255,255,255,0.38)', 'rgba(44,44,46,0.40)'),
  '--dsw-specific-tip': pair('rgba(245,246,247,0.38)', 'rgba(35,35,36,0.38)'),
  '--dsw-alias-toast-bg': pair('rgba(41,41,41,0.56)', 'rgba(67,69,74,0.56)'),
  '--dsw-alias-tooltip-bg': pair('rgba(33,33,35,0.58)', 'rgba(67,69,74,0.58)'),
  '--dsw-alias-button-elevated-fill': pair('rgba(255,255,255,0.36)', 'rgba(67,69,74,0.40)'),
  '--dsw-alias-button-floating-fill': pair('rgba(255,255,255,0.32)', 'rgba(53,54,56,0.38)'),
  '--dsw-alias-interactive-bg-hover': pair('rgba(255,255,255,0.32)', 'rgba(255,255,255,0.10)'),
  '--dsw-alias-interactive-bg-active': pair('rgba(255,255,255,0.44)', 'rgba(255,255,255,0.16)'),
  '--dsw-alias-interactive-bg-hover-solid': pair('rgba(255,255,255,0.38)', 'rgba(255,255,255,0.10)'),
  '--dsw-alias-border-l1': pair('rgba(255,255,255,0.45)', 'rgba(255,255,255,0.10)'),
  '--dsw-alias-border-l2': pair('rgba(255,255,255,0.60)', 'rgba(255,255,255,0.16)'),
  '--dsw-alias-border-l3': pair('rgba(255,255,255,0.70)', 'rgba(255,255,255,0.20)'),
  '--dsw-alias-border-l4': pair('rgba(255,255,255,0.80)', 'rgba(255,255,255,0.24)'),
}
