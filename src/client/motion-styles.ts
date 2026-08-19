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

/** Marker on the fixed viewport covering a live plate during an inner slide. */
export const MOTION_PANE_ATTRIBUTE = 'data-dsh-motion-pane'

/** Marker on the 200%-wide CSS track inside a pane viewport. */
export const MOTION_PANE_TRACK_ATTRIBUTE = 'data-dsh-motion-pane-track'

/** Marker on one 50% slide of a pane track. */
export const MOTION_PANE_SLIDE_ATTRIBUTE = 'data-dsh-motion-pane-slide'

const ghost = `[${MOTION_ENTER_ATTRIBUTE}], [${MOTION_EXIT_ATTRIBUTE}], [${MOTION_PANE_ATTRIBUTE}]`

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

body[${MOTION_ATTRIBUTE}] [${MOTION_PANE_TRACK_ATTRIBUTE}] {
  display: flex;
  align-items: flex-start;
  width: 200%;
  height: 100%;
  transform: translateX(0);
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

body[${MOTION_ATTRIBUTE}] [${MOTION_PANE_TRACK_ATTRIBUTE}][data-depth="1"] {
  transform: translateX(-50%);
}

body[${MOTION_ATTRIBUTE}] [${MOTION_PANE_SLIDE_ATTRIBUTE}] {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  flex: 0 0 50%;
  width: 50%;
  min-width: 0;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  body[${MOTION_ATTRIBUTE}] [${MOTION_PANE_TRACK_ATTRIBUTE}] {
    transition: none;
  }
}
`.trim()
