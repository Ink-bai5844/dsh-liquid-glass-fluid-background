/** Liquid-glass preference stored in the Host user-settings document. */

import z from '@deepseek-ai/schemastery'

/** Settings namespace owned by the liquid-glass overlay plugin. */
export const GLASS_SETTINGS_NAMESPACE = 'ui-theme-liquid-glass'

/** Field carrying whether the overlay is on. */
export const GLASS_ENABLED_FIELD = 'enabled'

/** Backdrop blur in CSS pixels. */
export const GLASS_BLUR_FIELD = 'blurPx'

/** Backdrop saturation percent. */
export const GLASS_SATURATE_FIELD = 'saturatePct'

/** SVG displacement scale in CSS pixels. */
export const GLASS_DISPLACE_FIELD = 'displace'

/** Chromatic-aberration intensity. */
export const GLASS_ABERRATION_FIELD = 'aberration'

/** Column and header corner radius in CSS pixels. */
export const GLASS_RADIUS_FIELD = 'radiusPx'

/** Gap between the sidebar and center column in CSS pixels. */
export const GLASS_GAP_FIELD = 'gapPx'

/** Custom main-canvas fill: empty, a CSS color/gradient, or an http(s) image URL. */
export const GLASS_CANVAS_FIELD = 'canvas'

/** Default overlay state when the user-settings document has no override. */
export const DEFAULT_ENABLED = false

/** Default backdrop blur in CSS pixels. */
export const DEFAULT_BLUR_PX = 10

/** Default backdrop saturation percent. */
export const DEFAULT_SATURATE_PCT = 140

/** Default SVG displacement scale. */
export const DEFAULT_DISPLACE = 40

/** Default chromatic-aberration intensity. */
export const DEFAULT_ABERRATION = 2

/** Default column corner radius in CSS pixels. */
export const DEFAULT_RADIUS_PX = 22

/** Default column gap in CSS pixels. */
export const DEFAULT_GAP_PX = 10

/** Default canvas fill (empty keeps the theme base). */
export const DEFAULT_CANVAS = ''

/** Field carrying whether the fluid backdrop is on. Independent of `enabled`. */
export const FLUID_ENABLED_FIELD = 'fluidEnabled'

/** Field carrying the fluid preset id. */
export const FLUID_PRESET_FIELD = 'fluidPreset'

/** Field carrying the fluid speed multiplier. */
export const FLUID_SPEED_FIELD = 'fluidSpeed'

/** Field carrying fluid blend color 1. */
export const FLUID_COLOR_1_FIELD = 'fluidColor1'

/** Field carrying fluid blend color 2. */
export const FLUID_COLOR_2_FIELD = 'fluidColor2'

/** Field carrying fluid blend color 3. */
export const FLUID_COLOR_3_FIELD = 'fluidColor3'

/** Field carrying fluid blend color 4. */
export const FLUID_COLOR_4_FIELD = 'fluidColor4'

/** Field carrying whether composer popover motion is on. Independent of `enabled`. */
export const MOTION_ENABLED_FIELD = 'motionEnabled'

/** Default composer popover motion state. */
export const DEFAULT_MOTION_ENABLED = true

/** Field carrying open-animation duration in milliseconds. */
export const MOTION_OPEN_MS_FIELD = 'motionOpenMs'

/** Field carrying close-animation duration in milliseconds. */
export const MOTION_CLOSE_MS_FIELD = 'motionCloseMs'

/** Field carrying fade-out duration after an open grow or pane slide settles. */
export const MOTION_FADE_MS_FIELD = 'motionFadeMs'

/** Default open-animation duration in milliseconds. */
export const DEFAULT_MOTION_OPEN_MS = 160

/** Default close-animation duration in milliseconds. */
export const DEFAULT_MOTION_CLOSE_MS = 120

/** Default fade-out duration in milliseconds. */
export const DEFAULT_MOTION_FADE_MS = 120

/** Shortest persistable motion duration in milliseconds. */
export const MOTION_MS_MIN = 50

/** Longest persistable motion duration in milliseconds. */
export const MOTION_MS_MAX = 600

/** Default fluid backdrop state. */
export const DEFAULT_FLUID_ENABLED = false

/** Default fluid preset. */
export const DEFAULT_FLUID_PRESET = 'silk'

/** Default fluid speed multiplier. */
export const DEFAULT_FLUID_SPEED = 1

/** Isolation default color 1. */
export const DEFAULT_FLUID_COLOR_1 = '#f4cd9f'

/** Isolation default color 2. */
export const DEFAULT_FLUID_COLOR_2 = '#3162ee'

/** Isolation default color 3. */
export const DEFAULT_FLUID_COLOR_3 = '#e882cc'

/** Isolation default color 4. */
export const DEFAULT_FLUID_COLOR_4 = '#59b5f3'

/** Persistable fluid preset ids (Isolation silk plus five variants). */
export const FLUID_PRESETS = ['silk', 'hsv', 'wave', 'aurora', 'plasma', 'smoke'] as const

/** Persistable fluid preset id. */
export type FluidPreset = (typeof FLUID_PRESETS)[number]

const CANVAS_MAX = 2048

/** Durable liquid-glass section shared by the Host schema and the browser scope. */
export interface GlassSettings {
  /** Whether the liquid-glass overlay is applied. */
  enabled: boolean
  /** Backdrop blur in CSS pixels. */
  blurPx: number
  /** Backdrop saturation percent. */
  saturatePct: number
  /** SVG displacement scale in CSS pixels. */
  displace: number
  /** Chromatic-aberration intensity. */
  aberration: number
  /** Column and header corner radius in CSS pixels. */
  radiusPx: number
  /** Gap between the sidebar and center column in CSS pixels. */
  gapPx: number
  /** Custom main-canvas fill: empty, a CSS color/gradient, or an http(s) image URL. */
  canvas: string
  /** Whether the Isolation-style fluid backdrop is applied. Independent of `enabled`. */
  fluidEnabled: boolean
  /** Selected fluid animation preset. */
  fluidPreset: FluidPreset
  /** Fluid time-scale multiplier. */
  fluidSpeed: number
  /** Fluid blend color 1 (`#rgb` or `#rrggbb`). */
  fluidColor1: string
  /** Fluid blend color 2. */
  fluidColor2: string
  /** Fluid blend color 3. */
  fluidColor3: string
  /** Fluid blend color 4. */
  fluidColor4: string
  /** Whether composer menus and popovers use iOS-style scale/stretch motion. Independent of `enabled`. */
  motionEnabled: boolean
  /** Open-animation duration in milliseconds. */
  motionOpenMs: number
  /** Close-animation duration in milliseconds. */
  motionCloseMs: number
  /** Fade-out duration in milliseconds after an open grow or pane slide settles. */
  motionFadeMs: number
}

/** Durable liquid-glass schema; also the wire envelope the browser scope validates against. */
export const GlassSettingsSchema: z<GlassSettings> = z.object({
  [GLASS_ENABLED_FIELD]: z.boolean().default(DEFAULT_ENABLED),
  [GLASS_BLUR_FIELD]: z.number().min(0).max(40).default(DEFAULT_BLUR_PX),
  [GLASS_SATURATE_FIELD]: z.number().min(100).max(220).default(DEFAULT_SATURATE_PCT),
  [GLASS_DISPLACE_FIELD]: z.number().min(0).max(80).default(DEFAULT_DISPLACE),
  [GLASS_ABERRATION_FIELD]: z.number().min(0).max(8).default(DEFAULT_ABERRATION),
  [GLASS_RADIUS_FIELD]: z.number().min(0).max(40).default(DEFAULT_RADIUS_PX),
  [GLASS_GAP_FIELD]: z.number().min(0).max(32).default(DEFAULT_GAP_PX),
  [GLASS_CANVAS_FIELD]: z.string().max(CANVAS_MAX).default(DEFAULT_CANVAS),
  [FLUID_ENABLED_FIELD]: z.boolean().default(DEFAULT_FLUID_ENABLED),
  [FLUID_PRESET_FIELD]: z.union([...FLUID_PRESETS]).default(DEFAULT_FLUID_PRESET),
  [FLUID_SPEED_FIELD]: z.number().min(0.25).max(2.5).default(DEFAULT_FLUID_SPEED),
  [FLUID_COLOR_1_FIELD]: z.string().max(32).default(DEFAULT_FLUID_COLOR_1),
  [FLUID_COLOR_2_FIELD]: z.string().max(32).default(DEFAULT_FLUID_COLOR_2),
  [FLUID_COLOR_3_FIELD]: z.string().max(32).default(DEFAULT_FLUID_COLOR_3),
  [FLUID_COLOR_4_FIELD]: z.string().max(32).default(DEFAULT_FLUID_COLOR_4),
  [MOTION_ENABLED_FIELD]: z.boolean().default(DEFAULT_MOTION_ENABLED),
  [MOTION_OPEN_MS_FIELD]: z.number().min(MOTION_MS_MIN).max(MOTION_MS_MAX).default(DEFAULT_MOTION_OPEN_MS),
  [MOTION_CLOSE_MS_FIELD]: z.number().min(MOTION_MS_MIN).max(MOTION_MS_MAX).default(DEFAULT_MOTION_CLOSE_MS),
  [MOTION_FADE_MS_FIELD]: z.number().min(MOTION_MS_MIN).max(MOTION_MS_MAX).default(DEFAULT_MOTION_FADE_MS),
})

/**
 * Fill missing fields from the schema defaults.
 * @param section - partial host or wire section.
 * @returns a complete settings object.
 */
export function resolveGlassSettings(section: Partial<GlassSettings> | undefined): GlassSettings {
  return GlassSettingsSchema((section ?? {}) as never)
}

/**
 * Narrow one wire or registry value to a persistable overlay flag.
 * @param value - value crossing the settings or registry boundary.
 * @returns whether the value is a boolean overlay flag.
 */
export function isGlassEnabled(value: unknown): value is boolean {
  return value === true || value === false
}

const CANVAS_COLOR = /^(?:#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|[a-z]{3,24})$/i
const CANVAS_FUNCTION = /^(?:rgb|rgba|hsl|hsla|oklch|oklab|color|(?:repeating-)?(?:linear|radial|conic)-gradient)\(/i

/**
 * Whether a canvas string is unsafe to put in a CSS `background` declaration.
 * @param value - trimmed user input.
 * @returns true when the value must be ignored.
 */
export function isUnsafeCanvas(value: string): boolean {
  const lower = value.toLowerCase()
  return lower.includes('javascript:')
    || lower.includes('expression(')
    || lower.includes('<script')
    || lower.includes('url(javascript')
    || /[{};]/.test(value)
}

/**
 * Turn a stored canvas field into a CSS `background` value.
 * @param raw - settings `canvas` field.
 * @returns a CSS background, or empty when unset or unsafe.
 */
export function resolveCanvasBackground(raw: string): string {
  const value = raw.trim()
  if (value === '' || isUnsafeCanvas(value)) return ''
  if (/^https?:\/\//i.test(value)) return `url(${JSON.stringify(value)})`
  if (CANVAS_COLOR.test(value)) return value
  if (CANVAS_FUNCTION.test(value) && value.endsWith(')')) return value
  return ''
}
