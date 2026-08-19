/**
 * Independent composer-popover motion. The live plate is never animated —
 * `transform` / `opacity` / `clip-path` on it isolate backdrop-filter.
 * An empty ghost card is sized to the laid-out plate and scaled from the
 * trigger, then faded so the already-settled glass shows through.
 */

import {
  DEFAULT_MOTION_CLOSE_MS, DEFAULT_MOTION_FADE_MS, DEFAULT_MOTION_OPEN_MS, MOTION_MS_MAX,
} from '../glass-settings.ts'
import {
  MOTION_ATTRIBUTE, MOTION_ENTER_ATTRIBUTE, MOTION_EXIT_ATTRIBUTE, MOTION_PANE_ATTRIBUTE,
  MOTION_PANE_SLIDE_ATTRIBUTE, MOTION_PANE_TRACK_ATTRIBUTE, MOTION_STYLES,
} from './motion-styles.ts'

export {
  MOTION_ATTRIBUTE, MOTION_ENTER_ATTRIBUTE, MOTION_EXIT_ATTRIBUTE, MOTION_PANE_ATTRIBUTE,
  MOTION_PANE_SLIDE_ATTRIBUTE, MOTION_PANE_TRACK_ATTRIBUTE, MOTION_STYLES,
} from './motion-styles.ts'

const LOCAL_TOKEN = (local: string): ((cls: string) => boolean) =>
  (cls: string) => cls.includes(`_${local}_`) || cls.endsWith(`_${local}`)

const lastLayout = new WeakMap<HTMLElement, { rect: DOMRect; origin: string }>()

/** Last inner children of an open plate, for a later pane slide. */
const lastPane = new WeakMap<HTMLElement, { kind: 'root' | 'list' | 'other'; signature: string; clones: HTMLElement[] }>()

/**
 * Whether a node is a popover or dialog this overlay animates.
 * @param node - a DOM node, usually a MutationObserver removed child.
 * @returns true when the node is a menu, submenu, Menu list, context panel, or settings dialog.
 */
export function isMotionSurface(node: Node): node is HTMLElement {
  if (
    !(node instanceof HTMLElement)
    || node.hasAttribute(MOTION_EXIT_ATTRIBUTE)
    || node.hasAttribute(MOTION_ENTER_ATTRIBUTE)
    || node.hasAttribute(MOTION_PANE_ATTRIBUTE)
  ) return false
  const classes = [...node.classList]
  const has = (local: string): boolean => classes.some(LOCAL_TOKEN(local))
  if (has('menu') || has('submenu')) return true
  if (has('list') && node.querySelector('[class*="_itemWrap_"], [class*="_itemWrap "], [class$="_itemWrap"]') !== null) {
    return true
  }
  if (!has('panel')) return false
  if (node.getAttribute('role') === 'dialog') return true
  return node.querySelector('[class*="_percent_"], [class*="_percent "], [class$="_percent"]') !== null
}

/** Whether inner childList changes on this plate may play a Model/Effort pane slide. */
function allowsPaneSlide(el: HTMLElement): boolean {
  return ![...el.classList].some(LOCAL_TOKEN('panel'))
}

/**
 * Pick a transform origin from the surface's CSS anchors.
 * @param el - a positioned popover still in (or reinserted into) the document.
 * @returns a CSS `transform-origin` pair.
 */
export function originFor(el: HTMLElement): string {
  const style = getComputedStyle(el)
  const unset = (value: string): boolean => value === '' || value === 'auto'
  const y = !unset(style.bottom) && unset(style.top) ? 'bottom' : 'top'
  const x = !unset(style.right) && unset(style.left) ? 'right' : 'left'
  return `${y} ${x}`
}

/**
 * Pick the corner of the menu that sits toward the trigger.
 * @param menu - the popover's viewport box.
 * @param trigger - the trigger's viewport box, or null when unknown.
 * @returns a CSS `transform-origin` pair.
 */
export function originFromRects(menu: DOMRect, trigger: DOMRect | null): string {
  if (trigger === null) return 'bottom left'
  const cx = trigger.left + trigger.width / 2
  const cy = trigger.top + trigger.height / 2
  const y = cy >= menu.top + menu.height / 2 ? 'bottom' : 'top'
  const x = cx >= menu.left + menu.width / 2 ? 'right' : 'left'
  return `${y} ${x}`
}

/** Quote an id for use inside an attribute selector. */
function escapeAttr(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(value)
  return value.replace(/["\\]/g, '\\$&')
}

/** Whether `el` is `document.body` — portaled lists land here. */
function isDocumentRoot(el: Element): boolean {
  return el === el.ownerDocument.body
}

/** Whether `el` can be this popover's trigger. */
function isTriggerCandidate(el: Element, menu: HTMLElement): el is HTMLElement {
  if (!(el instanceof HTMLElement) || el === menu) return false
  if (menu.contains(el) || el.contains(menu)) return false
  return el.tagName === 'BUTTON' || el.getAttribute('aria-haspopup') !== null
}

/** Whether an expanded control's `aria-haspopup` matches this surface. */
function matchesSurface(el: HTMLElement, menu: HTMLElement): boolean {
  const role = menu.getAttribute('role')
  const kind = el.getAttribute('aria-haspopup')
  if (role === 'dialog') return kind === 'dialog'
  return kind === 'menu' || kind === 'listbox' || kind === 'true'
}

/** Squared gap between two boxes (0 when they overlap). */
function rectGap2(a: DOMRect, b: DOMRect): number {
  const dx = Math.max(b.left - a.right, a.left - b.right, 0)
  const dy = Math.max(b.top - a.bottom, a.top - b.bottom, 0)
  return dx * dx + dy * dy
}

/**
 * Among expanded popup triggers, pick the one sitting next to the plate.
 * Portaled lists live under `document.body`, so a document-order walk would
 * hit the settings gear (`aria-haspopup=dialog`) first.
 * @param menu - the live popover.
 * @param menuRect - the popover's viewport box.
 * @returns the nearest matching trigger, or null.
 */
function nearestExpandedTrigger(menu: HTMLElement, menuRect: DOMRect): HTMLElement | null {
  const matching: HTMLElement[] = []
  for (const candidate of menu.ownerDocument.querySelectorAll('[aria-expanded="true"]')) {
    if (isTriggerCandidate(candidate, menu) && matchesSurface(candidate, menu)) {
      matching.push(candidate)
    }
  }
  let best: HTMLElement | null = null
  let bestGap = Infinity
  for (const el of matching) {
    const gap = rectGap2(menuRect, el.getBoundingClientRect())
    if (gap < bestGap) {
      bestGap = gap
      best = el
    }
  }
  return best
}

/**
 * Find the button that opened this popover. Prefer a direct sibling (the
 * Menu primitive's trigger often has no `aria-expanded`), then an expanded
 * control in a local ancestor. A list portaled to `document.body` uses the
 * nearest expanded `aria-haspopup=menu|listbox` control — never the first
 * expanded button in the document (the settings gear is `dialog`).
 * @param menu - the live popover.
 * @param menuRect - the popover's viewport box, when already measured.
 * @returns the trigger, or null.
 */
export function findTrigger(menu: HTMLElement, menuRect?: DOMRect): HTMLElement | null {
  const id = menu.id
  if (id !== '') {
    const byControls = menu.ownerDocument.querySelector(`[aria-controls="${escapeAttr(id)}"]`)
    if (byControls instanceof HTMLElement) return byControls
  }
  const parent = menu.parentElement
  if (parent === null) return null
  if (!isDocumentRoot(parent)) {
    for (const child of parent.children) {
      if (isTriggerCandidate(child, menu)) return child
    }
  }
  let ancestor: HTMLElement | null = parent
  let fallback: HTMLElement | null = null
  while (ancestor !== null && !isDocumentRoot(ancestor)) {
    for (const candidate of ancestor.querySelectorAll('[aria-expanded="true"]')) {
      if (isTriggerCandidate(candidate, menu)) return candidate
    }
    if (fallback === null) {
      for (const candidate of ancestor.querySelectorAll('button, [aria-haspopup]')) {
        if (isTriggerCandidate(candidate, menu)) {
          fallback = candidate
          break
        }
      }
    }
    ancestor = ancestor.parentElement
  }
  if (fallback !== null) return fallback
  return nearestExpandedTrigger(menu, menuRect ?? menu.getBoundingClientRect())
}

/**
 * Resolve the open/close corner from the trigger when one exists.
 * @param menu - the live popover.
 * @param menuRect - the popover's viewport box.
 * @returns a CSS `transform-origin` pair.
 */
export function resolveOrigin(menu: HTMLElement, menuRect: DOMRect): string {
  const trigger = findTrigger(menu, menuRect)
  if (trigger === null) return originFor(menu)
  return originFromRects(menuRect, trigger.getBoundingClientRect())
}

/** Surfaces inside an added or removed subtree. */
function surfacesIn(node: Node): HTMLElement[] {
  if (isMotionSurface(node)) return [node]
  if (!(node instanceof HTMLElement)) return []
  return [...node.querySelectorAll('*')].filter(isMotionSurface)
}

/**
 * Whether the environment asks to skip motion.
 * @param query - optional override (tests).
 * @returns true when motion must not run.
 */
export function prefersReducedMotion(query?: () => boolean): boolean {
  if (query !== undefined) return query()
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Paint/measure hooks for {@link installMotion} and the play helpers. */
export interface MotionPaintOptions {
  /** Frame scheduler; defaults to `requestAnimationFrame`. */
  frame?: (callback: () => void) => number
  /** Box of an element; defaults to `getBoundingClientRect`. */
  measure?: (el: HTMLElement) => DOMRect
  /** Open grow duration in milliseconds. */
  openMs?: number
  /** Close duration in milliseconds. */
  closeMs?: number
  /** Fade-out duration after the open grow or pane slide settles. */
  fadeMs?: number
}

/** Optional hooks for {@link installMotion}. */
export interface MotionRuntimeOptions extends MotionPaintOptions {
  /** Skip the observers (tests / reduced-motion). */
  reducedMotion?: boolean
  /** WAAPI `animate` (jsdom has none). */
  animate?: (el: Element, keyframes: Keyframe[], options?: KeyframeAnimationOptions) => Animation
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** One in-flight open: the ghost card and how to abort it. */
export interface MotionEnterHandle {
  /** Empty ghost covering the live plate, once layout has been measured. */
  readonly clone: HTMLElement | undefined
  /** Remove the ghost and restore the live plate's visibility. */
  cancel: () => void
}

function afterPaint(frame: (callback: () => void) => number, callback: () => void): void {
  frame(() => { frame(callback) })
}

/** Inner pane slides stay readable: twice the open duration, at least 280ms. */
function paneSlideMs(openMs: number): number {
  return Math.min(MOTION_MS_MAX, Math.max(280, Math.round(openMs * 2)))
}

/** Classify a plate's inner content as the Model/Effort root, a drilled list, or other. */
function paneKind(el: HTMLElement): 'root' | 'list' | 'other' {
  if (el.querySelector('[class*="_option_"], [class*="_option "], [class$="_option"]') !== null) {
    return 'list'
  }
  if (el.querySelector('[class*="_cell_"], [class*="_cell "], [class$="_cell"]') !== null) {
    return 'root'
  }
  return 'other'
}

function paneSignature(el: HTMLElement): string {
  return `${paneKind(el)}:${String(el.childElementCount)}:${[...el.children].map((child) => child.className).join('|')}`
}

function snapshotPane(el: HTMLElement): void {
  lastPane.set(el, {
    kind: paneKind(el),
    signature: paneSignature(el),
    clones: [...el.children]
      .filter((child): child is HTMLElement => child instanceof HTMLElement)
      .map((child) => child.cloneNode(true) as HTMLElement),
  })
}

/** The motion surface that contains `node`, if any. */
function enclosingSurface(node: Node): HTMLElement | null {
  let current: Node | null = node
  while (current !== null) {
    if (isMotionSurface(current)) return current
    current = current.parentNode
  }
  return null
}

/**
 * Copy the plate's padding, border, and column flex onto an overlay so
 * cloned children sit on the same content box as the live menu.
 * @param target - the overlay viewport.
 * @param source - the live plate.
 */
function applyPlateInsets(target: HTMLElement, source: HTMLElement): void {
  const style = getComputedStyle(source)
  target.style.paddingTop = style.paddingTop
  target.style.paddingRight = style.paddingRight
  target.style.paddingBottom = style.paddingBottom
  target.style.paddingLeft = style.paddingLeft
  target.style.borderTopWidth = style.borderTopWidth
  target.style.borderRightWidth = style.borderRightWidth
  target.style.borderBottomWidth = style.borderBottomWidth
  target.style.borderLeftWidth = style.borderLeftWidth
  target.style.borderStyle = style.borderStyle === 'none' ? 'none' : 'solid'
  target.style.borderColor = 'transparent'
  target.style.display = 'flex'
  target.style.flexDirection = 'column'
  target.style.color = style.color
  target.style.font = style.font
}

function createGhost(rect: DOMRect, origin: string, attr: string): HTMLElement {
  const ghost = document.createElement('div')
  ghost.setAttribute(attr, '')
  ghost.style.position = 'fixed'
  ghost.style.left = `${String(rect.left)}px`
  ghost.style.top = `${String(rect.top)}px`
  ghost.style.width = `${String(rect.width)}px`
  ghost.style.height = `${String(rect.height)}px`
  ghost.style.boxSizing = 'border-box'
  ghost.style.borderRadius = '12px'
  ghost.style.pointerEvents = 'none'
  ghost.style.transformOrigin = origin
  ghost.style.zIndex = '2147483000'
  ghost.style.background = 'var(--dsw-specific-menu, rgba(255,255,255,0.4))'
  document.body.append(ghost)
  return ghost
}

/**
 * Cover the live plate with an empty card that matches its laid-out box,
 * scale from the trigger, then fade the card after frost has painted.
 * @param node - the live popover, still in the document.
 * @param animate - WAAPI animate.
 * @param paint - frame, measure, and duration hooks.
 * @returns the ghost handle, or undefined when the node has no element parent.
 */
export function playMotionEnter(
  node: HTMLElement,
  animate: NonNullable<MotionRuntimeOptions['animate']>,
  paint: MotionPaintOptions = {},
): MotionEnterHandle | undefined {
  if (node.parentElement === null) return undefined
  const frame = paint.frame ?? ((callback) => requestAnimationFrame(callback))
  const measure = paint.measure ?? ((el) => el.getBoundingClientRect())
  let cancelled = false
  let ghost: HTMLElement | undefined
  let phase: Animation | undefined
  const previous = node.style.visibility
  const finish = (): void => {
    cancelled = true
    node.style.visibility = previous
    ghost?.remove()
  }
  node.style.visibility = 'hidden'
  const start = (attempt: number): void => {
    if (cancelled) return
    const rect = measure(node)
    if (rect.width < 2 || rect.height < 2) {
      if (attempt === 0) {
        frame(() => { start(1) })
        return
      }
      finish()
      return
    }
    const origin = resolveOrigin(node, rect)
    lastLayout.set(node, { rect, origin })
    snapshotPane(node)
    ghost = createGhost(rect, origin, MOTION_ENTER_ATTRIBUTE)
    const openMs = paint.openMs ?? DEFAULT_MOTION_OPEN_MS
    const fadeDuration = paint.fadeMs ?? DEFAULT_MOTION_FADE_MS
    const grow = animate(ghost, [
      { transform: 'scale(0.72, 0.55)' },
      { transform: 'none' },
    ], { duration: openMs, easing: EASE, fill: 'forwards' })
    phase = grow
    grow.addEventListener('finish', () => {
      node.style.visibility = previous
      afterPaint(frame, () => {
        if (cancelled || ghost === undefined) return
        const fade = animate(ghost, [
          { opacity: 1 },
          { opacity: 0 },
        ], { duration: fadeDuration, fill: 'forwards' })
        phase = fade
        fade.addEventListener('finish', finish)
        fade.addEventListener('cancel', finish)
      })
    })
    grow.addEventListener('cancel', finish)
  }
  frame(() => { start(0) })
  return {
    get clone() { return ghost },
    cancel: () => {
      if (phase !== undefined && typeof phase.cancel === 'function') phase.cancel()
      finish()
    },
  }
}

/**
 * Play the close scale on an empty ghost sized to the last open box.
 * @param node - the departing surface (may already be detached).
 * @param animate - WAAPI animate.
 * @param paint - measure hook when the plate is still connected.
 */
export function playMotionExit(
  node: HTMLElement,
  animate: NonNullable<MotionRuntimeOptions['animate']>,
  paint: MotionPaintOptions = {},
): HTMLElement | undefined {
  const measure = paint.measure ?? ((el) => el.getBoundingClientRect())
  const stored = lastLayout.get(node)
  let rect = stored?.rect
  let origin = stored?.origin ?? 'bottom left'
  if ((rect === undefined || rect.width < 2) && node.isConnected) {
    rect = measure(node)
    origin = resolveOrigin(node, rect)
  }
  if (rect === undefined || rect.width < 2 || rect.height < 2) return undefined
  const ghost = createGhost(rect, origin, MOTION_EXIT_ATTRIBUTE)
  const animation = animate(ghost, [
    { transform: 'none', opacity: 1 },
    { transform: 'scale(0.72, 0.55)', opacity: 0 },
  ], { duration: paint.closeMs ?? DEFAULT_MOTION_CLOSE_MS, easing: EASE, fill: 'forwards' })
  const done = (): void => { ghost.remove() }
  animation.addEventListener('finish', done)
  animation.addEventListener('cancel', done)
  return ghost
}

/**
 * Cover a live plate with a 200%-wide CSS track (`translateX(-50%)` on
 * `data-depth=1`) after its inner children swapped. When the track
 * settles, the live glass is shown and the overlay fades out — the same
 * tail as {@link playMotionEnter}. The host is not transformed.
 * @param node - the live plate, still in the document.
 * @param outgoing - clones of the children that just left.
 * @param direction - `forward` starts at depth 0; `back` starts at depth 1.
 * @param paint - frame, measure, and duration hooks.
 * @returns the viewport, or undefined when the plate has no size.
 */
export function playPaneSlide(
  node: HTMLElement,
  outgoing: readonly HTMLElement[],
  direction: 'forward' | 'back',
  paint: MotionPaintOptions = {},
): HTMLElement | undefined {
  const frame = paint.frame ?? ((callback) => requestAnimationFrame(callback))
  const measure = paint.measure ?? ((el) => el.getBoundingClientRect())
  const rect = measure(node)
  if (rect.width < 2 || rect.height < 2) return undefined
  const previous = node.style.visibility
  node.style.visibility = 'hidden'
  const openMs = paint.openMs ?? DEFAULT_MOTION_OPEN_MS
  const viewport = createGhost(rect, 'top left', MOTION_PANE_ATTRIBUTE)
  viewport.style.overflow = 'hidden'
  viewport.style.opacity = '1'
  viewport.style.transitionProperty = 'opacity'
  viewport.style.transitionDuration = `${String(paint.fadeMs ?? DEFAULT_MOTION_FADE_MS)}ms`
  applyPlateInsets(viewport, node)
  const track = document.createElement('div')
  track.setAttribute(MOTION_PANE_TRACK_ATTRIBUTE, '')
  track.style.transitionDuration = `${String(paneSlideMs(openMs))}ms`
  const outSlide = document.createElement('div')
  outSlide.setAttribute(MOTION_PANE_SLIDE_ATTRIBUTE, '')
  for (const child of outgoing) outSlide.append(child)
  const inSlide = document.createElement('div')
  inSlide.setAttribute(MOTION_PANE_SLIDE_ATTRIBUTE, '')
  for (const child of node.children) inSlide.append(child.cloneNode(true))
  if (direction === 'forward') track.append(outSlide, inSlide)
  else track.append(inSlide, outSlide)
  track.setAttribute('data-depth', direction === 'forward' ? '0' : '1')
  viewport.append(track)
  const done = (): void => {
    node.style.visibility = previous
    viewport.remove()
    snapshotPane(node)
    lastLayout.set(node, { rect, origin: lastLayout.get(node)?.origin ?? resolveOrigin(node, rect) })
  }
  if (prefersReducedMotion()) {
    track.setAttribute('data-depth', direction === 'forward' ? '1' : '0')
    done()
    return viewport
  }
  const onFade = (event: Event): void => {
    const name = 'propertyName' in event ? String(event.propertyName) : ''
    if (event.target !== viewport || name !== 'opacity') return
    viewport.removeEventListener('transitionend', onFade)
    done()
  }
  const onEnd = (event: Event): void => {
    const name = 'propertyName' in event ? String(event.propertyName) : ''
    if (event.target !== track || name !== 'transform') return
    track.removeEventListener('transitionend', onEnd)
    node.style.visibility = previous
    afterPaint(frame, () => {
      viewport.addEventListener('transitionend', onFade)
      viewport.style.opacity = '0'
    })
  }
  track.addEventListener('transitionend', onEnd)
  afterPaint(frame, () => {
    track.setAttribute('data-depth', direction === 'forward' ? '1' : '0')
  })
  return viewport
}

/**
 * Stamp the motion attribute, inject the ghost stylesheet, and observe opens.
 * @param options - reduced-motion, animate, and paint hooks.
 * @returns a disposer that removes the sheet, attribute, ghosts, and observer.
 */
export function installMotion(
  options: MotionRuntimeOptions = {},
): { dispose: () => void; write: (next: { motionOpenMs: number; motionCloseMs: number; motionFadeMs: number }) => void } {
  /* v8 ignore next -- node client-tree boots have no document */
  if (typeof document === 'undefined') return { dispose: () => {}, write: () => {} }
  const style = document.createElement('style')
  style.setAttribute(MOTION_ATTRIBUTE, '')
  style.textContent = MOTION_STYLES
  document.head.append(style)
  document.body.setAttribute(MOTION_ATTRIBUTE, '')
  const reduced = options.reducedMotion ?? prefersReducedMotion()
  const run = options.animate
    ?? (typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function'
      ? (el, keyframes, opts) => Element.prototype.animate.call(el, keyframes, opts)
      : undefined)
  const paint: MotionPaintOptions = {
    ...options.frame === undefined ? {} : { frame: options.frame },
    ...options.measure === undefined ? {} : { measure: options.measure },
    openMs: options.openMs ?? DEFAULT_MOTION_OPEN_MS,
    closeMs: options.closeMs ?? DEFAULT_MOTION_CLOSE_MS,
    fadeMs: options.fadeMs ?? DEFAULT_MOTION_FADE_MS,
  }
  let observer: MutationObserver | undefined
  const enters = new Map<HTMLElement, MotionEnterHandle>()
  if (!reduced && run !== undefined) {
    const paneQueued = new Set<HTMLElement>()
    const queuePane = (surface: HTMLElement): void => {
      /* v8 ignore next -- same plate can mutate twice in one observer turn */
      if (paneQueued.has(surface)) return
      paneQueued.add(surface)
      /* v8 ignore next -- installMotion always passes a frame in tests */
      const frame = paint.frame ?? ((callback) => requestAnimationFrame(callback))
      frame(() => {
        paneQueued.delete(surface)
        /* v8 ignore next -- the plate can unmount between the observer and the frame */
        if (!surface.isConnected) return
        const prev = lastPane.get(surface)
        if (prev === undefined || !allowsPaneSlide(surface)) {
          snapshotPane(surface)
          return
        }
        const nextKind = paneKind(surface)
        const nextSig = paneSignature(surface)
        if (prev.signature === nextSig) return
        if (prev.kind === 'other' && nextKind === 'root') {
          snapshotPane(surface)
          return
        }
        const direction = prev.kind === 'list' && nextKind === 'root' ? 'back' : 'forward'
        playPaneSlide(surface, prev.clones, direction, paint)
      })
    }
    observer = new MutationObserver((records) => {
      const addedSurfaces = new Set<HTMLElement>()
      for (const record of records) {
        for (const added of record.addedNodes) {
          for (const surface of surfacesIn(added)) {
            addedSurfaces.add(surface)
            const handle = playMotionEnter(surface, run, paint)
            /* v8 ignore next -- added surfaces are parented */
            if (handle !== undefined) enters.set(surface, handle)
          }
        }
        for (const removed of record.removedNodes) {
          for (const surface of surfacesIn(removed)) {
            enters.get(surface)?.cancel()
            enters.delete(surface)
            lastPane.delete(surface)
            playMotionExit(surface, run, paint)
          }
        }
      }
      const hosts = new Set<HTMLElement>()
      for (const record of records) {
        const host = enclosingSurface(record.target)
        if (host === null || addedSurfaces.has(host) || !host.isConnected) continue
        hosts.add(host)
      }
      for (const host of hosts) queuePane(host)
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }
  return {
    write: (next) => {
      paint.openMs = next.motionOpenMs
      paint.closeMs = next.motionCloseMs
      paint.fadeMs = next.motionFadeMs
    },
    dispose: () => {
      observer?.disconnect()
      for (const handle of enters.values()) handle.cancel()
      enters.clear()
      style.remove()
      document.body.removeAttribute(MOTION_ATTRIBUTE)
      document.querySelectorAll(`[${MOTION_ENTER_ATTRIBUTE}], [${MOTION_EXIT_ATTRIBUTE}], [${MOTION_PANE_ATTRIBUTE}]`).forEach((node) => {
        node.remove()
      })
    },
  }
}
