/**
 * Mount a fullscreen WebGL fluid backdrop. The canvas sits behind `#root`
 * (`z-index: -1`) and never takes containing-block properties on the sidebar.
 * Missing WebGL falls back to a static four-stop gradient.
 */

import type { GlassSettings } from '../glass-settings.ts'
import {
  DEFAULT_FLUID_COLORS, FLUID_FRAGMENT_SOURCE, FLUID_VERTEX_SOURCE, rgbToHex,
  resolveFluidDrawState, type FluidDrawState,
} from './fluid-shader.ts'

/** Body / canvas / style marker for the fluid backdrop. */
export const FLUID_ATTRIBUTE = 'data-dsh-fluid'

function loc(local: string): string {
  return `:is([class*="_${local}_"], [class*="_${local} "], [class$="_${local}"])`
}

const frame = `${loc('frame')}:has(${loc('sidebarCol')})`
const center = loc('centerCol')
const details = loc('detailsCol')

/** Punch-through sheet so the fluid canvas is visible without the glass overlay. */
export const FLUID_STYLES = `
body[${FLUID_ATTRIBUTE}] {
  background: transparent;
}

html:has(body[${FLUID_ATTRIBUTE}]) {
  background: transparent;
}

body[${FLUID_ATTRIBUTE}] #root {
  background: transparent;
}

body[${FLUID_ATTRIBUTE}] ${frame},
body[${FLUID_ATTRIBUTE}] ${center},
body[${FLUID_ATTRIBUTE}] ${center} > *,
body[${FLUID_ATTRIBUTE}] ${details},
body[${FLUID_ATTRIBUTE}] ${loc('root')}:has([data-conversation-scroll]),
body[${FLUID_ATTRIBUTE}] ${details} ${loc('root')},
body[${FLUID_ATTRIBUTE}] ${loc('root')}[data-phase='active'] ${loc('composerSeat')} {
  background-color: transparent;
  background-image: none;
}

body[${FLUID_ATTRIBUTE}] ${center},
body[${FLUID_ATTRIBUTE}] ${details} {
  --dsw-alias-bg-base: transparent;
}

canvas[${FLUID_ATTRIBUTE}] {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  pointer-events: none;
}
`.trim()

/** Live fluid renderer handle. */
export interface FluidRenderer {
  /** Push the latest uniforms and redraw. */
  write: (state: FluidDrawState) => void
  /** Stop the frame loop and release GL objects. */
  stop: () => void
  /** Whether a WebGL program is driving the canvas. */
  webgl: boolean
}

interface FluidRendererOptions {
  /** Injected GL context (tests). */
  gl?: WebGLRenderingContext | null
  /** Clock in milliseconds. */
  now?: () => number
  /** Animation-frame scheduler. */
  raf?: (callback: FrameRequestCallback) => number
  /** Animation-frame cancel. */
  caf?: (handle: number) => void
  /** Skip the frame loop when true. */
  reducedMotion?: boolean
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | undefined {
  const shader = gl.createShader(type)
  if (shader === null) return undefined
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) !== true) {
    gl.deleteShader(shader)
    return undefined
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | undefined {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, FLUID_VERTEX_SOURCE)
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FLUID_FRAGMENT_SOURCE)
  if (vertex === undefined || fragment === undefined) {
    if (vertex !== undefined) gl.deleteShader(vertex)
    if (fragment !== undefined) gl.deleteShader(fragment)
    return undefined
  }
  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (gl.getProgramParameter(program, gl.LINK_STATUS) !== true) {
    gl.deleteProgram(program)
    return undefined
  }
  return program
}

function fallbackCss(state: FluidDrawState): string {
  const hex = state.colors.map(rgbToHex)
  return `linear-gradient(160deg, ${hex[0]}, ${hex[1]}, ${hex[2]}, ${hex[3]})`
}

/**
 * Drive one canvas with the Isolation-style fluid program, or a CSS gradient.
 * @param canvas - fullscreen backdrop canvas.
 * @param options - optional GL and clock hooks.
 * @returns a writer/stopper pair.
 */
export function createFluidRenderer(
  canvas: HTMLCanvasElement,
  options: FluidRendererOptions = {},
): FluidRenderer {
  const gl = options.gl === undefined
    ? canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false })
    : options.gl
  const now = options.now ?? (() => (typeof performance === 'undefined' ? Date.now() : performance.now()))
  const raf = options.raf ?? (typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined)
  const caf = options.caf ?? (typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined)
  const reducedMotion = options.reducedMotion
    ?? (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)
  let state = resolveFluidDrawState('silk', 1, ...DEFAULT_FLUID_COLORS)
  let handle = 0
  let running = true
  const origin = now()

  if (gl === null) {
    const write = (next: FluidDrawState): void => {
      state = next
      canvas.style.display = 'none'
      const parent = canvas.parentElement
      if (parent !== null) parent.style.background = fallbackCss(next)
    }
    return {
      write,
      stop: () => {
        running = false
        const parent = canvas.parentElement
        if (parent !== null) parent.style.background = ''
      },
      webgl: false,
    }
  }

  const program = createProgram(gl)
  if (program === undefined) {
    return createFluidRenderer(canvas, { ...options, gl: null })
  }

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, 'a_pos')
  const uResolution = gl.getUniformLocation(program, 'u_resolution')
  const uTime = gl.getUniformLocation(program, 'u_time')
  const uColor1 = gl.getUniformLocation(program, 'u_color1')
  const uColor2 = gl.getUniformLocation(program, 'u_color2')
  const uColor3 = gl.getUniformLocation(program, 'u_color3')
  const uColor4 = gl.getUniformLocation(program, 'u_color4')
  const uFrequency = gl.getUniformLocation(program, 'u_frequency')
  const uAmplitude = gl.getUniformLocation(program, 'u_amplitude')
  const uSpeed = gl.getUniformLocation(program, 'u_speed')
  const uHsv = gl.getUniformLocation(program, 'u_hsv')
  const uWave = gl.getUniformLocation(program, 'u_wave')

  const resize = (): void => {
    const dpr = typeof devicePixelRatio === 'number' ? Math.min(devicePixelRatio, 2) : 1
    const width = Math.max(1, Math.floor((canvas.clientWidth || 1) * dpr))
    const height = Math.max(1, Math.floor((canvas.clientHeight || 1) * dpr))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  const draw = (): void => {
    resize()
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    gl.uniform2f(uResolution, canvas.width, canvas.height)
    gl.uniform1f(uTime, (now() - origin) / 1000)
    gl.uniform3f(uColor1, state.colors[0][0], state.colors[0][1], state.colors[0][2])
    gl.uniform3f(uColor2, state.colors[1][0], state.colors[1][1], state.colors[1][2])
    gl.uniform3f(uColor3, state.colors[2][0], state.colors[2][1], state.colors[2][2])
    gl.uniform3f(uColor4, state.colors[3][0], state.colors[3][1], state.colors[3][2])
    gl.uniform1f(uFrequency, state.frequency)
    gl.uniform1f(uAmplitude, state.amplitude)
    gl.uniform1f(uSpeed, state.speed)
    gl.uniform1f(uHsv, state.hsv ? 1 : 0)
    gl.uniform1f(uWave, state.wave ? 1 : 0)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  const tick = (): void => {
    if (!running) return
    draw()
    if (!reducedMotion && raf !== undefined) handle = raf(tick)
  }

  const write = (next: FluidDrawState): void => {
    state = next
    if (reducedMotion || raf === undefined) draw()
  }

  tick()
  return {
    write,
    stop: () => {
      running = false
      if (handle !== 0 && caf !== undefined) caf(handle)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    },
    webgl: true,
  }
}

/**
 * Insert the fluid canvas and punch-through sheet. The disposer removes both.
 * @param section - current host section.
 * @param options - optional renderer hooks.
 * @returns dispose/write pair. No-ops when `document` is missing.
 */
export function installFluidBackdrop(
  section: GlassSettings,
  options: FluidRendererOptions = {},
): { dispose: () => void; write: (next: GlassSettings) => void } {
  /* v8 ignore next -- node client-tree boots have no document */
  if (typeof document === 'undefined') return { dispose: () => {}, write: () => {} }
  const style = document.createElement('style')
  style.setAttribute(FLUID_ATTRIBUTE, '')
  style.textContent = FLUID_STYLES
  document.head.append(style)
  const canvas = document.createElement('canvas')
  canvas.setAttribute(FLUID_ATTRIBUTE, '')
  canvas.setAttribute('aria-hidden', 'true')
  document.body.prepend(canvas)
  document.body.setAttribute(FLUID_ATTRIBUTE, '')
  const renderer = createFluidRenderer(canvas, options)
  const write = (next: GlassSettings): void => {
    renderer.write(resolveFluidDrawState(
      next.fluidPreset,
      next.fluidSpeed,
      next.fluidColor1,
      next.fluidColor2,
      next.fluidColor3,
      next.fluidColor4,
    ))
  }
  write(section)
  return {
    dispose: () => {
      renderer.stop()
      canvas.remove()
      style.remove()
      document.body.removeAttribute(FLUID_ATTRIBUTE)
    },
    write,
  }
}
