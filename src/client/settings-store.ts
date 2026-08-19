/**
 * Liquid-glass row slot store: a mirror of the durable overlay section. The
 * plugin's apply-world settings listener is the only writer; the row
 * component reads via props.useStore.
 */
import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client'
import {
  DEFAULT_ABERRATION, DEFAULT_BLUR_PX, DEFAULT_CANVAS, DEFAULT_DISPLACE, DEFAULT_FLUID_COLOR_1,
  DEFAULT_FLUID_COLOR_2, DEFAULT_FLUID_COLOR_3, DEFAULT_FLUID_COLOR_4, DEFAULT_FLUID_ENABLED,
  DEFAULT_FLUID_PRESET, DEFAULT_FLUID_SPEED, DEFAULT_GAP_PX, DEFAULT_MOTION_CLOSE_MS,
  DEFAULT_MOTION_ENABLED, DEFAULT_MOTION_FADE_MS, DEFAULT_MOTION_OPEN_MS, DEFAULT_RADIUS_PX,
  DEFAULT_SATURATE_PCT,
  type GlassSettings,
} from '../glass-settings.ts'

/** Store state mirrored from the Host-backed overlay section. */
export interface LiquidGlassRowState extends GlassSettings {
  /** Scope revision; -1 until first sync so revision 0 lands as a change. */
  revision: number
}

/** Declared action shape giving the exported factory a stable return type. */
type LiquidGlassRowActions = {
  sync: (draft: LiquidGlassRowState, next: GlassSettings, revision: number) => void
}

/**
 * Declares the liquid-glass row state and write surface.
 * @returns the store handle.
 */
export function createLiquidGlassRowStore(): EngineStoreHandle<LiquidGlassRowState, LiquidGlassRowActions> {
  return defineStore({
    init: (): LiquidGlassRowState => ({
      enabled: false,
      blurPx: DEFAULT_BLUR_PX,
      saturatePct: DEFAULT_SATURATE_PCT,
      displace: DEFAULT_DISPLACE,
      aberration: DEFAULT_ABERRATION,
      radiusPx: DEFAULT_RADIUS_PX,
      gapPx: DEFAULT_GAP_PX,
      canvas: DEFAULT_CANVAS,
      fluidEnabled: DEFAULT_FLUID_ENABLED,
      fluidPreset: DEFAULT_FLUID_PRESET,
      fluidSpeed: DEFAULT_FLUID_SPEED,
      fluidColor1: DEFAULT_FLUID_COLOR_1,
      fluidColor2: DEFAULT_FLUID_COLOR_2,
      fluidColor3: DEFAULT_FLUID_COLOR_3,
      fluidColor4: DEFAULT_FLUID_COLOR_4,
      motionEnabled: DEFAULT_MOTION_ENABLED,
      motionOpenMs: DEFAULT_MOTION_OPEN_MS,
      motionCloseMs: DEFAULT_MOTION_CLOSE_MS,
      motionFadeMs: DEFAULT_MOTION_FADE_MS,
      revision: -1,
    }),
    actions: {
      sync: (d, next: GlassSettings, revision: number) => {
        if (revision <= d.revision) return
        d.enabled = next.enabled
        d.blurPx = next.blurPx
        d.saturatePct = next.saturatePct
        d.displace = next.displace
        d.aberration = next.aberration
        d.radiusPx = next.radiusPx
        d.gapPx = next.gapPx
        d.canvas = next.canvas
        d.fluidEnabled = next.fluidEnabled
        d.fluidPreset = next.fluidPreset
        d.fluidSpeed = next.fluidSpeed
        d.fluidColor1 = next.fluidColor1
        d.fluidColor2 = next.fluidColor2
        d.fluidColor3 = next.fluidColor3
        d.fluidColor4 = next.fluidColor4
        d.motionEnabled = next.motionEnabled
        d.motionOpenMs = next.motionOpenMs
        d.motionCloseMs = next.motionCloseMs
        d.motionFadeMs = next.motionFadeMs
        d.revision = revision
      },
    },
  })
}
