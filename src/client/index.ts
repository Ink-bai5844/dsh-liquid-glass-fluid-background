/**
 * Browser half of the liquid-glass overlay and the Isolation-style fluid
 * backdrop. `enabled` stacks the glass token layer, stylesheet, and SVG lens.
 * `fluidEnabled` independently mounts a fullscreen WebGL (or CSS-gradient)
 * canvas. `motionEnabled` independently plays iOS-style scale/stretch on
 * composer menus and popovers. Disposing each effect reverses its writes.
 * Light/dark switches reuse the same `{ light, dark }` token pairs — the
 * glass layer is not re-sent.
 */
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: the ctx.settingsScope Context merge. Cross-plugin collaboration
// goes through the service, never a value import (client bundle purity gate).
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: pulls ctx.theme (ThemeRuntime.overrideTokens).
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import type { LiquidGlassRowInjected } from './LiquidGlassRow.tsx'
import { LiquidGlassRow } from './LiquidGlassRow.tsx'
import { createLiquidGlassRowStore } from './settings-store.ts'
import { en, zh } from './locales.ts'
import { GLASS_TOKEN_OVERRIDES, GLASS_TOKEN_SOURCE } from './glass-tokens.ts'
import {
  GLASS_ENGINE_ATTRIBUTE, GLASS_ENGINE_CSS, isCssOnlyGlassEngine,
} from './glass-filter.ts'
import { clearGlassAppearance, writeGlassAppearance } from './glass-appearance.ts'
import { GLASS_STYLE_ATTRIBUTE, GLASS_STYLES } from './glass-styles.ts'
import { installFluidBackdrop } from './fluid-runtime.ts'
import { installMotion } from './motion-runtime.ts'
import {
  GLASS_ENABLED_FIELD, GLASS_SETTINGS_NAMESPACE, resolveGlassSettings, type GlassSettings,
} from '../glass-settings.ts'

export type { LiquidGlassRowComponentProps, LiquidGlassRowInjected, LiquidGlassTunerField } from './LiquidGlassRow.tsx'
export type { LiquidGlassRowState } from './settings-store.ts'
export type { LiquidGlassKey } from './locales.ts'
export type { FluidPreset, GlassSettings } from '../glass-settings.ts'
export { FLUID_ATTRIBUTE } from './fluid-runtime.ts'
export { MOTION_ATTRIBUTE, MOTION_ENTER_ATTRIBUTE, MOTION_EXIT_ATTRIBUTE } from './motion-runtime.ts'

/** Namespace owning this feature's settings-row copy. */
export const SETTINGS_NS = 'settings.liquidGlass'

/**
 * Required services: theme overlay, settings transport, and slots/locale for
 * the General-section row. `remote` carries the forwarded settings
 * invalidation that the settings-scope binder subscribes to on this context.
 */
export const inject = ['theme', 'settingsScope', 'slots', 'locale', 'connection', 'remote']

/**
 * Stamp the overlay attribute, insert the scoped stylesheet, stack the token
 * layer, and insert the shared SVG lens (shader map + chromatic displacement).
 * Firefox also gets `data-dsh-liquid-glass-engine=css` so the sheet skips
 * `filter: url(#…)`. The disposer reverses every write.
 * @param ctx - client context that owns ThemeRuntime.
 * @returns disposer removing the layer, the style node, the filter SVG, and the body attributes.
 */
function installOverlay(ctx: ClientContext, section: GlassSettings): { dispose: () => void; write: (next: GlassSettings) => void } {
  /* v8 ignore next -- node client-tree boots have no document; the overlay is browser-only */
  if (typeof document === 'undefined') return { dispose: () => {}, write: () => {} }
  const disposeTokens = ctx.theme.overrideTokens(GLASS_TOKEN_SOURCE, GLASS_TOKEN_OVERRIDES)
  const style = document.createElement('style')
  style.setAttribute(GLASS_STYLE_ATTRIBUTE, '')
  style.textContent = GLASS_STYLES
  document.head.append(style)
  const defs = document.createElement('div')
  defs.setAttribute(GLASS_STYLE_ATTRIBUTE, 'defs')
  defs.style.position = 'absolute'
  defs.style.width = '0'
  defs.style.height = '0'
  defs.style.overflow = 'hidden'
  document.body.append(defs)
  document.body.setAttribute(GLASS_STYLE_ATTRIBUTE, '')
  if (typeof navigator !== 'undefined' && isCssOnlyGlassEngine(navigator.userAgent)) {
    document.body.setAttribute(GLASS_ENGINE_ATTRIBUTE, GLASS_ENGINE_CSS)
  }
  const write = (next: GlassSettings): void => { writeGlassAppearance(document.body, defs, next) }
  write(section)
  return {
    dispose: () => {
      disposeTokens()
      style.remove()
      defs.remove()
      document.body.removeAttribute(GLASS_STYLE_ATTRIBUTE)
      document.body.removeAttribute(GLASS_ENGINE_ATTRIBUTE)
      clearGlassAppearance(document.body)
    },
    write,
  }
}

/**
 * Client plugin body: subscribe to the durable overlay flag, apply or retract
 * the glass layer, and register the feature-owned settings row.
 * @param ctx - client cordis context.
 */
export function apply(ctx: ClientContext): void {
  const host = ctx.settingsScope.bind<GlassSettings>({ namespace: GLASS_SETTINGS_NAMESPACE })

  ctx.effect(() => ctx.locale.register(SETTINGS_NS, { zh, en }), 'ui-theme-liquid-glass: settings row dictionaries')

  const store = createLiquidGlassRowStore()
  let bound: BoundActions<typeof store> | undefined
  let revision = 0
  let disposeOverlay: (() => unknown) | undefined
  let writeAppearance: ((next: GlassSettings) => void) | undefined
  let disposeFluid: (() => unknown) | undefined
  let writeFluid: ((next: GlassSettings) => void) | undefined
  let disposeMotion: (() => unknown) | undefined
  let writeMotion: ((next: GlassSettings) => void) | undefined

  const setOverlay = (section: GlassSettings): void => {
    if (section.enabled) {
      disposeOverlay ??= ctx.effect(() => {
        const overlay = installOverlay(ctx, section)
        writeAppearance = overlay.write
        return overlay.dispose
      }, 'ui-theme-liquid-glass: overlay')
      writeAppearance?.(section)
      return
    }
    if (disposeOverlay === undefined) return
    disposeOverlay()
    disposeOverlay = undefined
    writeAppearance = undefined
  }

  const setFluid = (section: GlassSettings): void => {
    if (section.fluidEnabled) {
      disposeFluid ??= ctx.effect(() => {
        const fluid = installFluidBackdrop(section)
        writeFluid = fluid.write
        return fluid.dispose
      }, 'ui-theme-liquid-glass: fluid backdrop')
      writeFluid?.(section)
      return
    }
    if (disposeFluid === undefined) return
    disposeFluid()
    disposeFluid = undefined
    writeFluid = undefined
  }

  const setMotion = (section: GlassSettings): void => {
    if (section.motionEnabled) {
      disposeMotion ??= ctx.effect(() => {
        const motion = installMotion()
        writeMotion = motion.write
        return () => {
          writeMotion = undefined
          motion.dispose()
        }
      }, 'ui-theme-liquid-glass: interaction motion')
      writeMotion?.(section)
      return
    }
    if (disposeMotion === undefined) return
    disposeMotion()
    disposeMotion = undefined
    writeMotion = undefined
  }

  const adopt = (): void => {
    const section = host.getSnapshot().value
    if (section === undefined) return
    const resolved = resolveGlassSettings(section)
    revision += 1
    bound?.sync(resolved, revision)
    setOverlay(resolved)
    setFluid(resolved)
    setMotion(resolved)
  }

  ctx.effect(() => {
    const unsub = host.subscribe(adopt)
    adopt()
    return () => {
      unsub()
      setOverlay(resolveGlassSettings({ enabled: false }))
      setFluid(resolveGlassSettings({ fluidEnabled: false }))
      setMotion(resolveGlassSettings({ motionEnabled: false }))
    }
  }, 'ui-theme-liquid-glass: settings scope adoption')

  const injected = (actions: BoundActions<typeof store>): LiquidGlassRowInjected => {
    bound = actions
    const section = host.getSnapshot().value
    if (section !== undefined) {
      revision += 1
      actions.sync(resolveGlassSettings(section), revision)
    }
    return {
      setEnabled: (enabled) => { void host.set(GLASS_ENABLED_FIELD, enabled) },
      setField: (field, value) => { void host.set(field, value) },
    }
  }
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'liquid-glass',
    order: 20,
    store,
    locale: SETTINGS_NS,
    inject: injected,
  }, LiquidGlassRow))
}
