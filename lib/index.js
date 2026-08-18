import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";
//#region lib/types/boot-glass.js
/**
* Host-rendered overlay bootstrap for the browser's pre-plugin interval. Each
* index response embeds the current durable enabled flag; when it is true the
* script writes `body[data-dsh-liquid-glass]` before the client plugin tree
* activates so the first painted frame already carries the overlay attribute.
* The script never injects styles — the client half owns the stylesheet.
*/
/** Body attribute selecting the liquid-glass overlay stylesheet. */
const GLASS_ATTRIBUTE = "data-dsh-liquid-glass";
/** Build the inline script that stamps the overlay attribute on `document.body`. */
function bootGlassScript() {
	return `<script>(() => { document.body.setAttribute(${JSON.stringify(GLASS_ATTRIBUTE)}, '') })()<\/script>`;
}
/**
* Insert the overlay bootstrap immediately after the opening body tag when the
* durable flag is on. Disabled responses are returned unchanged so they carry
* no attribute write. Body-less fragments receive the script at the end, where
* the HTML parser has already synthesized a body.
* @param html - Raw application index HTML.
* @param enabled - Current Host-backed overlay flag.
* @returns HTML, with the bootstrap script only when `enabled` is true.
*/
function injectBootGlass(html, enabled) {
	if (!enabled) return html;
	const script = bootGlassScript();
	const body = /<body(?:\s[^>]*)?>/i.exec(html);
	if (body === null) return `${html}${script}`;
	const at = body.index + body[0].length;
	return `${html.slice(0, at)}${script}${html.slice(at)}`;
}
//#endregion
//#region lib/types/glass-settings.js
/** Liquid-glass preference stored in the Host user-settings document. */
/** Settings namespace owned by the liquid-glass overlay plugin. */
const GLASS_SETTINGS_NAMESPACE = "ui-theme-liquid-glass";
/** Field carrying whether the overlay is on. */
const GLASS_ENABLED_FIELD = "enabled";
/** Backdrop blur in CSS pixels. */
const GLASS_BLUR_FIELD = "blurPx";
/** Backdrop saturation percent. */
const GLASS_SATURATE_FIELD = "saturatePct";
/** SVG displacement scale in CSS pixels. */
const GLASS_DISPLACE_FIELD = "displace";
/** Chromatic-aberration intensity. */
const GLASS_ABERRATION_FIELD = "aberration";
/** Column and header corner radius in CSS pixels. */
const GLASS_RADIUS_FIELD = "radiusPx";
/** Gap between the sidebar and center column in CSS pixels. */
const GLASS_GAP_FIELD = "gapPx";
/** Custom main-canvas fill: empty, a CSS color/gradient, or an http(s) image URL. */
const GLASS_CANVAS_FIELD = "canvas";
/** Default overlay state when the user-settings document has no override. */
const DEFAULT_ENABLED = false;
/** Field carrying whether the fluid backdrop is on. Independent of `enabled`. */
const FLUID_ENABLED_FIELD = "fluidEnabled";
/** Field carrying the fluid preset id. */
const FLUID_PRESET_FIELD = "fluidPreset";
/** Field carrying the fluid speed multiplier. */
const FLUID_SPEED_FIELD = "fluidSpeed";
/** Field carrying fluid blend color 1. */
const FLUID_COLOR_1_FIELD = "fluidColor1";
/** Field carrying fluid blend color 2. */
const FLUID_COLOR_2_FIELD = "fluidColor2";
/** Field carrying fluid blend color 3. */
const FLUID_COLOR_3_FIELD = "fluidColor3";
/** Field carrying fluid blend color 4. */
const FLUID_COLOR_4_FIELD = "fluidColor4";
/** Default fluid backdrop state. */
const DEFAULT_FLUID_ENABLED = false;
/** Default fluid preset. */
const DEFAULT_FLUID_PRESET = "silk";
/** Isolation default color 1. */
const DEFAULT_FLUID_COLOR_1 = "#f4cd9f";
/** Isolation default color 2. */
const DEFAULT_FLUID_COLOR_2 = "#3162ee";
/** Isolation default color 3. */
const DEFAULT_FLUID_COLOR_3 = "#e882cc";
/** Isolation default color 4. */
const DEFAULT_FLUID_COLOR_4 = "#59b5f3";
/** Persistable fluid preset ids (Isolation silk plus five variants). */
const FLUID_PRESETS = [
	"silk",
	"hsv",
	"wave",
	"aurora",
	"plasma",
	"smoke"
];
const CANVAS_MAX = 2048;
/** Durable liquid-glass schema; also the wire envelope the browser scope validates against. */
const GlassSettingsSchema = z.object({
	[GLASS_ENABLED_FIELD]: z.boolean().default(false),
	[GLASS_BLUR_FIELD]: z.number().min(0).max(40).default(10),
	[GLASS_SATURATE_FIELD]: z.number().min(100).max(220).default(140),
	[GLASS_DISPLACE_FIELD]: z.number().min(0).max(80).default(40),
	[GLASS_ABERRATION_FIELD]: z.number().min(0).max(8).default(2),
	[GLASS_RADIUS_FIELD]: z.number().min(0).max(40).default(22),
	[GLASS_GAP_FIELD]: z.number().min(0).max(32).default(10),
	[GLASS_CANVAS_FIELD]: z.string().max(CANVAS_MAX).default(""),
	[FLUID_ENABLED_FIELD]: z.boolean().default(false),
	[FLUID_PRESET_FIELD]: z.union([...FLUID_PRESETS]).default(DEFAULT_FLUID_PRESET),
	[FLUID_SPEED_FIELD]: z.number().min(.25).max(2.5).default(1),
	[FLUID_COLOR_1_FIELD]: z.string().max(32).default(DEFAULT_FLUID_COLOR_1),
	[FLUID_COLOR_2_FIELD]: z.string().max(32).default(DEFAULT_FLUID_COLOR_2),
	[FLUID_COLOR_3_FIELD]: z.string().max(32).default(DEFAULT_FLUID_COLOR_3),
	[FLUID_COLOR_4_FIELD]: z.string().max(32).default(DEFAULT_FLUID_COLOR_4)
});
/**
* Fill missing fields from the schema defaults.
* @param section - partial host or wire section.
* @returns a complete settings object.
*/
function resolveGlassSettings(section) {
	return GlassSettingsSchema(section ?? {});
}
/**
* Narrow one wire or registry value to a persistable overlay flag.
* @param value - value crossing the settings or registry boundary.
* @returns whether the value is a boolean overlay flag.
*/
function isGlassEnabled(value) {
	return value === true || value === false;
}
//#endregion
//#region lib/types/index.js
/** Host registration for the liquid-glass overlay preference and pre-plugin attribute. */
const GLASS_NAMESPACE = settingsNamespace(GLASS_SETTINGS_NAMESPACE);
/** Read the registered overlay flag or use the schema default without a settings provider. */
function readEnabled(ctx) {
	const settings = ctx.get("settings");
	if (settings === void 0) return false;
	const section = settings.get(GLASS_NAMESPACE);
	if (section === void 0) return false;
	return section[GLASS_ENABLED_FIELD];
}
/**
* Register the durable overlay section and initial-attribute index transform
* when their optional Host services are composed.
* @param ctx - Host context that may acquire settings and HTTP services.
*/
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(GLASS_NAMESPACE, GlassSettingsSchema);
	});
	ctx.inject(["webServer"], (httpCtx) => {
		httpCtx.effect(() => httpCtx.webServer.tapIndex((html) => injectBootGlass(html, readEnabled(ctx))), "client-ui-theme-liquid-glass: initial overlay bootstrap");
	});
}
//#endregion
export { DEFAULT_ENABLED, DEFAULT_FLUID_ENABLED, FLUID_ENABLED_FIELD, FLUID_PRESETS, GLASS_ATTRIBUTE, GLASS_ENABLED_FIELD, GLASS_SETTINGS_NAMESPACE, apply, isGlassEnabled, resolveGlassSettings };
