//#region lib/types/invariant.js
/**
* Package-owned invariant companion for `dsh-liquid-glass-fluid-background`.
* @module dsh-liquid-glass-fluid-background/invariant
*/
const PACKAGE_NAME = "dsh-liquid-glass-fluid-background";
/** Cordis companion plugin name. */
const name = "client-ui-theme-liquid-glass-invariant";
/** Service required before the companion can reserve package ownership. */
const inject = ["invariants"];
/**
* No runtime invariant: the overlay is a presentation layer. Durable enabled
* state is audited by dsh-settings, and composed tokens are audited by
* ui-theme's ThemeRuntime. This package owns no authoritative event stream.
*/
const install = () => {};
/**
* Register this package's invariant companion.
* @param ctx - Cordis context carrying the invariant service.
* @returns the installed registration's disposer after setup succeeds.
*/
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
