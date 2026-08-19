/**
 * Overlay stylesheet injected while the preference is on. Every rule is scoped
 * to `body[data-dsh-liquid-glass]`. Component hits use CSS-module logical
 * class names. Production bundles emit `[hash]_[local]`; Vite emits
 * `[name]_[local]_[hash]`. {@link loc} matches both.
 *
 * Liquid-glass-react applies `filter: url(#svg)` plus `backdrop-filter` on an
 * empty warp layer so text stays sharp. Floating plates do the same with
 * `::before` at `z-index: -1` (submenu uses `::after`; its `::before` is the
 * pointer bridge). The settings overlay is a `position: fixed` descendant of
 * the sidebar, so the sidebar host must not take `backdrop-filter`, `filter`,
 * `isolation`, or `transform` — any of those becomes the containing block
 * and squeezes the dialog into the column. Host `box-shadow` carries the
 * specular rim — InputBar and the conversation header already use `::after`.
 */

import { GLASS_CANVAS_ATTRIBUTE, GLASS_VAR_BLUR, GLASS_VAR_CANVAS, GLASS_VAR_GAP, GLASS_VAR_RADIUS, GLASS_VAR_SATURATE } from './glass-appearance.ts'
import { GLASS_ENGINE_ATTRIBUTE, GLASS_ENGINE_CSS, GLASS_FILTER_ID } from './glass-filter.ts'

/** Marker attribute written on the injected `<style>` node and on `document.body`. */
export const GLASS_STYLE_ATTRIBUTE = 'data-dsh-liquid-glass'

/**
 * Match a CSS-module local class under `[hash]_[local]` (production) and
 * `[name]_[local]_[hash]` (Vite). `[class$="_local"]` only hits when that
 * token is last in the attribute; `[class*="_local "]` covers a production
 * token that is not last (selected session rows are `sessionRow selected`).
 * @param local - the module-local class name.
 * @returns an `:is()` selector covering both hash conventions.
 */
function loc(local: string): string {
  return `:is([class*="_${local}_"], [class*="_${local} "], [class$="_${local}"])`
}

const frame = `${loc('frame')}:has(${loc('sidebarCol')})`
const sidebar = loc('sidebarCol')
const details = loc('detailsCol')
const center = loc('centerCol')
const composerCard = `:is(${loc('composerSeat')} ${loc('card')}, [data-composer-card])`
const sendButton = `${composerCard} ${loc('primary')}`
const commandButton = `${composerCard} ${loc('add')}`
const composerChips = `:is(${sendButton}, ${commandButton})`
const modelMenu = `${composerCard} ${loc('menu')}:has(${loc('cell')}, ${loc('option')})`
const previewBadge = loc('previewBadge')
const glassPills = `:is(${sendButton}, ${commandButton}, ${previewBadge})`
const dialog = loc('dialog')
const settingsPanel = `${loc('panel')}:has(${loc('navCell')})`
const portal = loc('portal')
const submenu = loc('submenu')
const menuList = `${loc('list')}:has(${loc('itemWrap')})`
const toast = loc('toast')
const bubble = loc('bubble')
const overlayCard = `${loc('overlayAnchor')} ${loc('card')}`
const hoverCard = `${loc('card')}${loc('copyable')}`
const sessionHeader = `${loc('header')}:has(${loc('titleCluster')})`
const queuePanel = `${loc('dock')} > ${loc('panel')}`
const goalBar = `${loc('bar')}:has(${loc('goalGlyph')})`
const todoCard = `${loc('root')}:has(> ${loc('body')} ${loc('progress')})`
const dropdown = loc('menu')
const onboarding = loc('onboardingStage')

const COLUMNS = [sidebar, details, sessionHeader, onboarding].join(',\n  ')

const PLATES = [
  composerCard,
  dialog,
  settingsPanel,
  portal,
  submenu,
  menuList,
  toast,
  bubble,
  overlayCard,
  hoverCard,
  queuePanel,
  goalBar,
  todoCard,
  dropdown,
].join(',\n  ')

const SURFACES = `${COLUMNS},\n  ${PLATES}`

/** Host `backdrop-filter` is safe here: these nodes do not wrap a viewport-fixed overlay. */
const FROST_HOSTS = [details, onboarding].join(',\n  ')

const WARP_BEFORE = [
  sidebar,
  sessionHeader,
  composerCard,
  dialog,
  settingsPanel,
  portal,
  menuList,
  toast,
  bubble,
  overlayCard,
  hoverCard,
  queuePanel,
  goalBar,
  todoCard,
  dropdown,
  glassPills,
].join(',\n  ')

/** Small plates and the settings panel take SVG displacement. The sidebar
 * is a tall column: a pill lens rim would sit on the settings trigger. */
const WARP_DISPLACE = [
  sessionHeader,
  composerCard,
  dialog,
  settingsPanel,
  portal,
  menuList,
  toast,
  bubble,
  overlayCard,
  hoverCard,
  queuePanel,
  goalBar,
  todoCard,
  dropdown,
].join(',\n  ')

const under = (selector: string): string => `body[data-dsh-liquid-glass] ${selector}`
const all = (list: string): string => `:is(${list})`

const RIM_LIGHT = `
    0 10px 40px rgba(0, 0, 0, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 1px 0 0 rgba(255, 255, 255, 0.28),
    inset -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.38),
    inset 0 20px 36px -18px rgba(255, 255, 255, 0.42),
    inset 0 -24px 32px -16px rgba(0, 0, 0, 0.10)`

/** Sidebar rim: same plate as {@link RIM_LIGHT} without the foot inset. */
const RIM_SIDEBAR_LIGHT = `
    0 10px 40px rgba(0, 0, 0, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 1px 0 0 rgba(255, 255, 255, 0.28),
    inset -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.38),
    inset 0 20px 36px -18px rgba(255, 255, 255, 0.42)`

const RIM_DARK = `
    0 10px 40px rgba(0, 0, 0, 0.42),
    0 2px 8px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16),
    inset 0 20px 36px -18px rgba(255, 255, 255, 0.14),
    inset 0 -24px 32px -16px rgba(0, 0, 0, 0.28)`

/** Dark sidebar rim: same plate as {@link RIM_DARK} without the foot inset. */
const RIM_SIDEBAR_DARK = `
    0 10px 40px rgba(0, 0, 0, 0.42),
    0 2px 8px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16),
    inset 0 20px 36px -18px rgba(255, 255, 255, 0.14)`

const ILLUMINATION = `
  linear-gradient(165deg, rgba(255, 255, 255, 0.36) 0%, rgba(255, 255, 255, 0) 30%),
  linear-gradient(345deg, rgba(170, 205, 255, 0.14) 0%, rgba(255, 255, 255, 0) 34%)`

const WARP_BACKDROP = `blur(var(${GLASS_VAR_BLUR}, 10px)) saturate(var(${GLASS_VAR_SATURATE}, 140%))`
const COMPOSER_WARP = `blur(calc(var(${GLASS_VAR_BLUR}, 10px) + 2px)) saturate(var(${GLASS_VAR_SATURATE}, 140%))`
const DIALOG_WARP = `blur(calc(var(${GLASS_VAR_BLUR}, 10px) + 4px)) saturate(var(${GLASS_VAR_SATURATE}, 150%))`

const OPAQUE_LIGHT = `
    --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.94);
    --dsw-alias-bg-layer-2: rgba(255, 255, 255, 0.94);
    --dsw-alias-bg-layer-3: rgba(255, 255, 255, 0.96);
    --dsw-alias-bg-overlay: rgba(245, 246, 247, 0.96);
    --dsw-alias-bg-module-platform: rgba(245, 246, 247, 0.94);
    --dsw-specific-sidebar-fill: rgba(250, 250, 250, 0.96);
    --dsw-specific-menu: rgba(255, 255, 255, 0.96);
    --dsw-specific-selector: rgba(245, 246, 247, 0.94);
    --dsw-specific-bubble: rgba(237, 243, 254, 0.96);
    --dsw-specific-input-major: rgba(255, 255, 255, 0.96);
    --dsw-specific-tip: rgba(245, 246, 247, 0.94);
    --dsw-alias-toast-bg: rgba(41, 41, 41, 0.96);
    --dsw-alias-tooltip-bg: rgba(33, 33, 35, 0.96);`

const OPAQUE_DARK = `
    --dsw-alias-bg-layer-1: rgba(44, 44, 46, 0.94);
    --dsw-alias-bg-layer-2: rgba(53, 54, 56, 0.94);
    --dsw-alias-bg-layer-3: rgba(67, 69, 74, 0.96);
    --dsw-alias-bg-overlay: rgba(53, 54, 56, 0.96);
    --dsw-alias-bg-module-platform: rgba(35, 35, 36, 0.94);
    --dsw-specific-sidebar-fill: rgba(21, 21, 23, 0.96);
    --dsw-specific-menu: rgba(53, 54, 56, 0.96);
    --dsw-specific-selector: rgba(44, 44, 46, 0.94);
    --dsw-specific-bubble: rgba(44, 44, 46, 0.96);
    --dsw-specific-input-major: rgba(44, 44, 46, 0.96);
    --dsw-specific-tip: rgba(35, 35, 36, 0.94);
    --dsw-alias-toast-bg: rgba(67, 69, 74, 0.96);
    --dsw-alias-tooltip-bg: rgba(67, 69, 74, 0.96);`

/**
 * Full overlay stylesheet. Color literals live only in this package — it owns
 * the glass presentation. Feature packages keep consuming `--dsw-*` tokens.
 */
export const GLASS_STYLES = `
body[data-dsh-liquid-glass] {
  ${GLASS_VAR_BLUR}: 10px;
  ${GLASS_VAR_SATURATE}: 140%;
  ${GLASS_VAR_RADIUS}: 22px;
  ${GLASS_VAR_GAP}: 10px;
}

body[data-dsh-liquid-glass] ${all(SURFACES)} {
  background-image: ${ILLUMINATION};
  background-blend-mode: soft-light, screen;
  border-color: rgba(255, 255, 255, 0.34);
  transition:
    background-color 240ms cubic-bezier(0.32, 0.72, 0, 1),
    box-shadow 240ms cubic-bezier(0.32, 0.72, 0, 1),
    border-radius 240ms cubic-bezier(0.32, 0.72, 0, 1),
    transform 240ms cubic-bezier(0.32, 0.72, 0, 1);
}

body[data-dsh-liquid-glass] ${all(SURFACES)}:not(${sidebar}) {
  box-shadow: ${RIM_LIGHT};
}

body[data-dsh-liquid-glass] ${all(PLATES)} {
  isolation: isolate;
}

body[data-dsh-liquid-glass] ${all(FROST_HOSTS)} {
  -webkit-backdrop-filter: ${WARP_BACKDROP};
  backdrop-filter: ${WARP_BACKDROP};
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${all(SURFACES)} {
  background-image:
    linear-gradient(165deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 28%),
    linear-gradient(345deg, rgba(120, 170, 255, 0.10) 0%, rgba(255, 255, 255, 0) 34%);
  border-color: rgba(255, 255, 255, 0.14);
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${all(SURFACES)}:not(${sidebar}) {
  box-shadow: ${RIM_DARK};
}

${under(sidebar)},
${under(details)},
${under(`${bubble}:not([data-side])`)},
${under(goalBar)},
${under(todoCard)} {
  position: relative;
}

${under(details)} {
  background-color: var(--dsw-alias-bg-layer-1);
  border-start-start-radius: var(${GLASS_VAR_RADIUS}, 22px);
  border-end-start-radius: var(${GLASS_VAR_RADIUS}, 22px);
}

${under(`${details} > *`)} {
  background-color: transparent;
}

body[data-dsh-liquid-glass] ${all(WARP_BEFORE)}::before,
body[data-dsh-liquid-glass] ${submenu}::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  -webkit-backdrop-filter: ${WARP_BACKDROP};
  backdrop-filter: ${WARP_BACKDROP};
}

body[data-dsh-liquid-glass]:not([${GLASS_ENGINE_ATTRIBUTE}='${GLASS_ENGINE_CSS}']) ${all(WARP_DISPLACE)}::before,
body[data-dsh-liquid-glass]:not([${GLASS_ENGINE_ATTRIBUTE}='${GLASS_ENGINE_CSS}']) ${submenu}::after {
  filter: url(#${GLASS_FILTER_ID});
}

${under(frame)} {
  column-gap: var(${GLASS_VAR_GAP}, 10px);
}

body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] {
  background: var(${GLASS_VAR_CANVAS}) center / cover no-repeat fixed;
}

body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${frame} {
  background: transparent;
}

body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${center},
body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${details} {
  --dsw-alias-bg-base: transparent;
  background: transparent;
}

body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${loc('root')}:has([data-conversation-scroll]),
body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${details} ${loc('root')},
body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${loc('root')}[data-phase='active'] ${loc('composerSeat')} {
  background: transparent;
}

${under(sidebar)},
${under(`${sidebar} > *`)} {
  overflow: hidden;
  border-start-end-radius: var(${GLASS_VAR_RADIUS}, 22px);
  border-end-end-radius: var(${GLASS_VAR_RADIUS}, 22px);
  border-right: none;
  border-inline-end: none;
  border-color: transparent;
  box-shadow: ${RIM_SIDEBAR_LIGHT};
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${sidebar},
body[data-dsh-liquid-glass][data-ds-dark-theme] ${sidebar} > * {
  border-right: none;
  border-inline-end: none;
  border-color: transparent;
  box-shadow: ${RIM_SIDEBAR_DARK};
}

${under(`${sidebar} ${loc('root')}:has(${loc('logoRow')})`)} {
  background: transparent;
}

${under(`${sidebar} ${loc('fade')}`)} {
  background: none;
}

${under(sidebar)}::before {
  -webkit-backdrop-filter: ${COMPOSER_WARP};
  backdrop-filter: ${COMPOSER_WARP};
}

${under(sessionHeader)} {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  margin: 10px 16px 8px;
  padding: 8px 14px 6px;
  border-radius: 18px;
  background-color: var(--dsw-alias-bg-layer-1);
}

${under(sessionHeader)}::before {
  -webkit-backdrop-filter: ${COMPOSER_WARP};
  backdrop-filter: ${COMPOSER_WARP};
}

${under(sessionHeader)}::after {
  content: none;
}

${under(`${sessionHeader} ${loc('tabs')}`)} {
  margin-top: 2px;
  padding-left: 4px;
}

${under(loc('tabActive'))} {
  color: var(--dsw-alias-label-primary);
}

${under(`${loc('tabActive')}::after`)} {
  background: var(--dsw-alias-label-primary);
}

${under(loc('folderActive'))} {
  color: var(--dsw-alias-label-primary);
}

${under(loc('groupTitle'))} {
  background: transparent;
}



${under(center)} {
  overflow: hidden;
  background: transparent;
  border-start-start-radius: var(${GLASS_VAR_RADIUS}, 22px);
  border-end-start-radius: var(${GLASS_VAR_RADIUS}, 22px);
}

${under(`${loc('sessionRow')}${loc('selected')}`)},
${under(`${loc('searchResultRow')}${loc('selected')}`)} {
  background: rgba(255, 255, 255, 0.72);
  box-shadow:
    inset 3px 0 0 0 rgba(255, 255, 255, 0.98),
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.88),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -12px 20px rgba(15, 23, 42, 0.14);
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${loc('sessionRow')}${loc('selected')},
body[data-dsh-liquid-glass][data-ds-dark-theme] ${loc('searchResultRow')}${loc('selected')} {
  background: rgba(255, 255, 255, 0.24);
  box-shadow:
    inset 3px 0 0 0 rgba(255, 255, 255, 0.70),
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.40),
    inset 0 -12px 20px rgba(0, 0, 0, 0.32);
}

${under(composerCard)} {
  border-radius: 26px;
}

${under(composerCard)}::before {
  -webkit-backdrop-filter: ${COMPOSER_WARP};
  backdrop-filter: ${COMPOSER_WARP};
}

${under(modelMenu)} {
  z-index: 110;
}

${under(glassPills)} {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  background-image: ${ILLUMINATION};
  background-blend-mode: soft-light, screen;
  color: var(--dsw-alias-label-primary);
  border-color: rgba(255, 255, 255, 0.34);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 1px 0 0 rgba(255, 255, 255, 0.28),
    inset -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.38),
    inset 0 10px 16px -10px rgba(255, 255, 255, 0.42);
}

${under(sendButton)} {
  transform: none;
  top: -2px;
}

${under(`${composerChips}:hover:not(:disabled)`)} {
  background: rgba(255, 255, 255, 0.18);
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${glassPills} {
  background-image:
    linear-gradient(165deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 28%),
    linear-gradient(345deg, rgba(120, 170, 255, 0.10) 0%, rgba(255, 255, 255, 0) 34%);
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16),
    inset 0 10px 16px -10px rgba(255, 255, 255, 0.14);
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${composerChips}:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.10);
}

${under(bubble)} {
  border-radius: 22px;
}

${under(dialog)},
${under(settingsPanel)} {
  border-radius: 24px;
  box-shadow:
    0 18px 56px rgba(0, 0, 0, 0.16),
    0 4px 14px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 1px 0 0 rgba(255, 255, 255, 0.28),
    inset -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.38),
    inset 0 22px 40px -18px rgba(255, 255, 255, 0.46),
    inset 0 -26px 36px -16px rgba(0, 0, 0, 0.12);
}

${under(dialog)}::before,
${under(settingsPanel)}::before {
  -webkit-backdrop-filter: ${DIALOG_WARP};
  backdrop-filter: ${DIALOG_WARP};
}

${under(settingsPanel)} > * {
  position: relative;
  z-index: 1;
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${dialog},
body[data-dsh-liquid-glass][data-ds-dark-theme] ${settingsPanel} {
  box-shadow:
    0 18px 56px rgba(0, 0, 0, 0.52),
    0 4px 14px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16),
    inset 0 22px 40px -18px rgba(255, 255, 255, 0.16),
    inset 0 -26px 36px -16px rgba(0, 0, 0, 0.32);
}

${under(portal)},
${under(submenu)},
${under(menuList)},
${under(dropdown)},
${under(queuePanel)},
${under(goalBar)},
${under(todoCard)} {
  border-radius: 18px;
}

${under(toast)} {
  background-color: var(--dsw-alias-toast-bg);
  border-radius: 18px;
}

${under(hoverCard)} {
  --dsw-hovercard-bg: rgba(44, 44, 46, 0.58);
  border-radius: 18px;
}

${under(`${portal}:hover`)},
${under(`${hoverCard}:hover`)} {
  transform: translateY(-1px);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  body[data-dsh-liquid-glass] {${OPAQUE_LIGHT}
  }
  body[data-dsh-liquid-glass][data-ds-dark-theme] {${OPAQUE_DARK}
  }
  body[data-dsh-liquid-glass] ${all(SURFACES)} {
    background-image: none;
  }
  body[data-dsh-liquid-glass] ${all(FROST_HOSTS)} {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  body[data-dsh-liquid-glass] ${all(WARP_BEFORE)}::before,
  body[data-dsh-liquid-glass] ${submenu}::after {
    content: none;
    filter: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  body[data-dsh-liquid-glass] {${OPAQUE_LIGHT}
  }
  body[data-dsh-liquid-glass][data-ds-dark-theme] {${OPAQUE_DARK}
  }
  body[data-dsh-liquid-glass] ${all(SURFACES)} {
    background-image: none;
  }
  body[data-dsh-liquid-glass] ${all(FROST_HOSTS)} {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  body[data-dsh-liquid-glass] ${all(WARP_BEFORE)}::before,
  body[data-dsh-liquid-glass] ${submenu}::after {
    content: none;
    filter: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  body[data-dsh-liquid-glass] ${all(SURFACES)} {
    transition: none;
  }
  ${under(`${portal}:hover`)},
  ${under(`${hoverCard}:hover`)} {
    transform: none;
  }
}
`.trim()
