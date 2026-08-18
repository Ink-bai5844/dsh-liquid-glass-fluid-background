/**
 * Host-rendered overlay bootstrap for the browser's pre-plugin interval. Each
 * index response embeds the current durable enabled flag; when it is true the
 * script writes `body[data-dsh-liquid-glass]` before the client plugin tree
 * activates so the first painted frame already carries the overlay attribute.
 * The script never injects styles — the client half owns the stylesheet.
 */

/** Body attribute selecting the liquid-glass overlay stylesheet. */
export const GLASS_ATTRIBUTE = 'data-dsh-liquid-glass'

/** Build the inline script that stamps the overlay attribute on `document.body`. */
function bootGlassScript(): string {
  return `<script>(() => { document.body.setAttribute(${JSON.stringify(GLASS_ATTRIBUTE)}, '') })()</script>`
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
export function injectBootGlass(html: string, enabled: boolean): string {
  if (!enabled) return html
  const script = bootGlassScript()
  const body = /<body(?:\s[^>]*)?>/i.exec(html)
  if (body === null) return `${html}${script}`
  const at = body.index + body[0].length
  return `${html.slice(0, at)}${script}${html.slice(at)}`
}
