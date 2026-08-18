/**
 * Package-owned invariant companion for `dsh-liquid-glass-fluid-background`.
 * @module dsh-liquid-glass-fluid-background/invariant
 */

/* jscpd:ignore-start */
import type { Context } from '@deepseek-ai/cordis'
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = 'dsh-liquid-glass-fluid-background'

/** Cordis companion plugin name. */
export const name = 'client-ui-theme-liquid-glass-invariant'
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants']

/**
 * No runtime invariant: the overlay is a presentation layer. Durable enabled
 * state is audited by dsh-settings, and composed tokens are audited by
 * ui-theme's ThemeRuntime. This package owns no authoritative event stream.
 */
const install: InvariantInstaller = () => {}

/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
/* jscpd:ignore-end */
