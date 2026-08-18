/**
 * Fullscreen fluid color field inspired by the Isolation HLSL effect
 * (Shadertoy dstBRs / wdyczG / msXcz2). Noise uses a public-domain sin-dot
 * hash, not the CC-NC IQ 2014 hash from that sample.
 */

import {
  DEFAULT_FLUID_COLOR_1, DEFAULT_FLUID_COLOR_2, DEFAULT_FLUID_COLOR_3, DEFAULT_FLUID_COLOR_4,
  FLUID_PRESETS, type FluidPreset,
} from '../glass-settings.ts'

export { FLUID_PRESETS, type FluidPreset }

/** One RGB triple in 0..1. */
export type FluidRgb = readonly [number, number, number]

/** Persistable fluid preset ids. */
export const FLUID_PRESET_IDS = FLUID_PRESETS

/** Isolation default palette (color1..color4). */
export const DEFAULT_FLUID_COLORS = [
  DEFAULT_FLUID_COLOR_1, DEFAULT_FLUID_COLOR_2, DEFAULT_FLUID_COLOR_3, DEFAULT_FLUID_COLOR_4,
] as const

/** Shader knobs that distinguish one preset from another. */
export interface FluidPresetSpec {
  /** Distortion frequency. */
  frequency: number
  /** Distortion amplitude. */
  amplitude: number
  /** Base time scale before the user speed multiplier. */
  speed: number
  /** Lerp colors in HSV before converting back. */
  hsv: boolean
  /** Isolation light-wave modulation. */
  wave: boolean
}

/** Draw uniforms resolved from the host section. */
export interface FluidDrawState {
  /** Four blend colors. */
  colors: readonly [FluidRgb, FluidRgb, FluidRgb, FluidRgb]
  /** Distortion frequency. */
  frequency: number
  /** Distortion amplitude. */
  amplitude: number
  /** Effective time scale. */
  speed: number
  /** HSV blend flag. */
  hsv: boolean
  /** Light-wave flag. */
  wave: boolean
}

const PRESETS: Record<FluidPreset, FluidPresetSpec> = {
  silk: { frequency: 5, amplitude: 25, speed: 0.75, hsv: false, wave: false },
  hsv: { frequency: 5, amplitude: 25, speed: 0.75, hsv: true, wave: false },
  wave: { frequency: 5, amplitude: 25, speed: 0.75, hsv: false, wave: true },
  aurora: { frequency: 3, amplitude: 18, speed: 0.45, hsv: true, wave: true },
  plasma: { frequency: 8, amplitude: 14, speed: 1.35, hsv: false, wave: false },
  smoke: { frequency: 3.2, amplitude: 42, speed: 0.32, hsv: false, wave: false },
}

/**
 * Narrow one wire value to a fluid preset id.
 * @param value - value crossing the settings boundary.
 * @returns whether the value is a known preset id.
 */
export function isFluidPreset(value: unknown): value is FluidPreset {
  return FLUID_PRESET_IDS.some(id => id === value)
}

/**
 * Look up one preset, falling back to silk.
 * @param id - persistable preset id.
 * @returns shader knobs.
 */
export function fluidPresetSpec(id: string): FluidPresetSpec {
  return isFluidPreset(id) ? PRESETS[id] : PRESETS.silk
}

/**
 * Parse a `#rgb` or `#rrggbb` color into 0..1 RGB.
 * @param raw - user or stored hex string.
 * @returns RGB, or undefined when the string is not a hex color.
 */
export function parseHexColor(raw: string): FluidRgb | undefined {
  const value = raw.trim()
  const short = /^#([0-9a-f]{3})$/i.exec(value)
  if (short !== null) {
    const digits = short[1] ?? ''
    if (digits.length !== 3) return undefined
    return parseHexColor(`#${digits[0]}${digits[0]}${digits[1]}${digits[1]}${digits[2]}${digits[2]}`)
  }
  const long = /^#([0-9a-f]{6})$/i.exec(value)
  if (long === null) return undefined
  const hex = long[1] ?? ''
  if (hex.length !== 6) return undefined
  return [
    Number.parseInt(hex.slice(0, 2), 16) / 255,
    Number.parseInt(hex.slice(2, 4), 16) / 255,
    Number.parseInt(hex.slice(4, 6), 16) / 255,
  ]
}

/**
 * Format RGB as `#rrggbb` for a color input.
 * @param rgb - 0..1 triple.
 * @returns a 7-character hex color.
 */
export function rgbToHex(rgb: FluidRgb): string {
  const byte = (channel: number): string => Math.round(Math.min(1, Math.max(0, channel)) * 255)
    .toString(16)
    .padStart(2, '0')
  return `#${byte(rgb[0])}${byte(rgb[1])}${byte(rgb[2])}`
}

/**
 * Coerce a stored color to a `#rrggbb` value a color input accepts.
 * @param raw - stored field.
 * @param fallback - hex used when parsing fails.
 * @returns a 7-character hex color.
 */
export function toColorInput(raw: string, fallback: string): string {
  const parsed = parseHexColor(raw)
  if (parsed === undefined) return fallback
  return rgbToHex(parsed)
}

/**
 * Resolve draw uniforms from persistable fluid fields.
 * @param preset - preset id.
 * @param speed - user speed multiplier.
 * @param color1 - first blend color.
 * @param color2 - second blend color.
 * @param color3 - third blend color.
 * @param color4 - fourth blend color.
 * @returns GPU uniforms.
 */
export function resolveFluidDrawState(
  preset: string,
  speed: number,
  color1: string,
  color2: string,
  color3: string,
  color4: string,
): FluidDrawState {
  const spec = fluidPresetSpec(preset)
  const fallback = (index: 0 | 1 | 2 | 3, raw: string): FluidRgb =>
    parseHexColor(raw) ?? parseHexColor(DEFAULT_FLUID_COLORS[index]) ?? [1, 1, 1]
  return {
    colors: [
      fallback(0, color1),
      fallback(1, color2),
      fallback(2, color3),
      fallback(3, color4),
    ],
    frequency: spec.frequency,
    amplitude: spec.amplitude,
    speed: spec.speed * speed,
    hsv: spec.hsv,
    wave: spec.wave,
  }
}

/** Fullscreen clip-space vertex shader (WebGL 1). */
export const FLUID_VERTEX_SOURCE = [
  'attribute vec2 a_pos;',
  'void main() {',
  '  gl_Position = vec4(a_pos, 0.0, 1.0);',
  '}',
].join('\n')

/** Isolation-style fluid fragment shader (WebGL 1). */
export const FLUID_FRAGMENT_SOURCE = [
  '#ifdef GL_FRAGMENT_PRECISION_HIGH',
  'precision highp float;',
  '#else',
  'precision mediump float;',
  '#endif',
  'uniform vec2 u_resolution;',
  'uniform float u_time;',
  'uniform vec3 u_color1;',
  'uniform vec3 u_color2;',
  'uniform vec3 u_color3;',
  'uniform vec3 u_color4;',
  'uniform float u_frequency;',
  'uniform float u_amplitude;',
  'uniform float u_speed;',
  'uniform float u_hsv;',
  'uniform float u_wave;',
  'mat2 rot(float a) {',
  '  float s = sin(a);',
  '  float c = cos(a);',
  '  return mat2(c, s, -s, c);',
  '}',
  'vec2 hash22(vec2 p) {',
  '  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));',
  '  return fract(sin(p) * 43758.5453123);',
  '}',
  'float noise(vec2 p) {',
  '  vec2 i = floor(p);',
  '  vec2 f = fract(p);',
  '  vec2 u = f * f * (3.0 - 2.0 * f);',
  '  float a = dot(-1.0 + 2.0 * hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));',
  '  float b = dot(-1.0 + 2.0 * hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));',
  '  float c = dot(-1.0 + 2.0 * hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));',
  '  float d = dot(-1.0 + 2.0 * hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));',
  '  return 0.5 + 0.5 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);',
  '}',
  'vec3 hsv2rgb(vec3 c) {',
  '  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);',
  '  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);',
  '  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);',
  '}',
  'vec3 rgb2hsv(vec3 c) {',
  '  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);',
  '  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));',
  '  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));',
  '  float d = q.x - min(q.w, q.y);',
  '  float e = 1.0e-10;',
  '  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);',
  '}',
  'float remapRange(float val, float mi, float ma) {',
  '  return val * (ma - mi) + mi;',
  '}',
  'vec3 lightwave(vec3 inputColor, float isHsv, vec2 uv) {',
  '  vec3 hsv = isHsv > 0.5 ? inputColor : rgb2hsv(inputColor);',
  '  vec2 p = -1.0 + 1.5 * uv;',
  '  float t = u_time / 5.0;',
  '  float mov0 = p.x + p.y + cos(sin(t) * 2.0) * 100.0 + sin(p.x / 100.0) * 1000.0;',
  '  float mov1 = p.y / 0.3 + t;',
  '  float mov2 = p.x / 0.2;',
  '  float c1 = sin(mov1 + t) / 2.0 + mov2 / 2.0 - mov1 - mov2 + t;',
  '  float c2 = cos(c1 + sin(mov0 / 1000.0 + t) + sin(p.y / 40.0 + t) + sin((p.x + p.y) / 100.0) * 3.0);',
  '  float c3 = abs(sin(c2 + cos(mov1 + mov2 + c2) + cos(mov2) + sin(p.x / 1000.0)));',
  '  return hsv2rgb(vec3(',
  '    remapRange(abs(c2), hsv.x * 0.95, hsv.x),',
  '    remapRange(c3, hsv.y, hsv.y * 0.85),',
  '    remapRange(c3, hsv.z, hsv.z * 0.85)',
  '  ));',
  '}',
  'void main() {',
  '  vec2 uv = gl_FragCoord.xy / u_resolution;',
  '  vec2 tuv = uv - 0.5;',
  '  float degree = noise(vec2(u_time * 0.1, tuv.x * tuv.y));',
  '  tuv = rot(radians((degree - 0.5) * 720.0 + 180.0)) * tuv;',
  '  float speed = u_time * u_speed;',
  '  tuv.x += sin(tuv.y * u_frequency + speed) / u_amplitude;',
  '  tuv.y += sin(tuv.x * u_frequency * 1.5 + speed) / (u_amplitude * 0.5);',
  '  vec3 c1 = u_hsv > 0.5 ? rgb2hsv(u_color1) : u_color1;',
  '  vec3 c2 = u_hsv > 0.5 ? rgb2hsv(u_color2) : u_color2;',
  '  vec3 c3 = u_hsv > 0.5 ? rgb2hsv(u_color3) : u_color3;',
  '  vec3 c4 = u_hsv > 0.5 ? rgb2hsv(u_color4) : u_color4;',
  '  vec2 axis = rot(radians(-5.0)) * tuv;',
  '  vec3 layer1 = mix(c1, c2, smoothstep(-0.3, 0.2, axis.x));',
  '  vec3 layer2 = mix(c3, c4, smoothstep(-0.3, 0.2, axis.x));',
  '  vec3 comp = mix(layer1, layer2, smoothstep(0.5, -0.3, tuv.y));',
  '  vec3 color = u_wave > 0.5 ? lightwave(comp, u_hsv, uv)',
  '    : (u_hsv > 0.5 ? hsv2rgb(comp) : comp);',
  '  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);',
  '}',
].join('\n')
