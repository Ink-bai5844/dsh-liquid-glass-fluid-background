/**
 * Composer popover motion sheet. Scoped to `body[data-dsh-motion]`, not the
 * glass attribute, so the switch works with Liquid Glass off.
 */

/** Body / style marker for interaction motion. */
export const MOTION_ATTRIBUTE = 'data-dsh-motion'

/** Marker on a cloned surface playing the open animation. */
export const MOTION_ENTER_ATTRIBUTE = 'data-dsh-motion-enter'

/** Marker on a cloned surface playing the close animation. */
export const MOTION_EXIT_ATTRIBUTE = 'data-dsh-motion-exit'

const ghost = `[${MOTION_ENTER_ATTRIBUTE}], [${MOTION_EXIT_ATTRIBUTE}]`

/** Ghost clones must not run frost or SVG displacement — those make open jank
 * and isolate backdrop-filter so the plate looks opaque. */
export const MOTION_STYLES = `
body[${MOTION_ATTRIBUTE}] ${ghost} {
  pointer-events: none;
  filter: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

body[${MOTION_ATTRIBUTE}] ${ghost}::before,
body[${MOTION_ATTRIBUTE}] ${ghost}::after {
  content: none !important;
  filter: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}
`.trim()
