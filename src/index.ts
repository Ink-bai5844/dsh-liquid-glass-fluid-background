/** Host registration for the liquid-glass overlay preference and pre-plugin attribute. */

import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-host-webserver'
import { injectBootGlass } from './boot-glass.ts'
import {
  DEFAULT_ENABLED, GLASS_ENABLED_FIELD, GLASS_SETTINGS_NAMESPACE, GlassSettingsSchema,
  type GlassSettings,
} from './glass-settings.ts'

export {
  DEFAULT_ENABLED, DEFAULT_FLUID_ENABLED, FLUID_ENABLED_FIELD, FLUID_PRESETS, GLASS_ENABLED_FIELD,
  GLASS_SETTINGS_NAMESPACE, isGlassEnabled, resolveGlassSettings,
  type FluidPreset, type GlassSettings,
} from './glass-settings.ts'
export { GLASS_ATTRIBUTE } from './boot-glass.ts'

const GLASS_NAMESPACE = GLASS_SETTINGS_NAMESPACE

/** Read the registered overlay flag or use the schema default without a settings provider. */
function readEnabled(ctx: Context): boolean {
  const settings = ctx.get('settings')
  if (settings === undefined) return DEFAULT_ENABLED
  const section = settings.get(GLASS_NAMESPACE) as GlassSettings | undefined
  if (section === undefined) return DEFAULT_ENABLED
  return section[GLASS_ENABLED_FIELD]
}

/**
 * Register the durable overlay section and initial-attribute index transform
 * when their optional Host services are composed.
 * @param ctx - Host context that may acquire settings and HTTP services.
 */
export function apply(ctx: Context): void {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(GLASS_NAMESPACE, GlassSettingsSchema)
  })
  ctx.inject(['webServer'], (httpCtx) => {
    httpCtx.effect(
      () => httpCtx.webServer.tapIndex(html => injectBootGlass(html, readEnabled(ctx))),
      'client-ui-theme-liquid-glass: initial overlay bootstrap',
    )
  })
}
