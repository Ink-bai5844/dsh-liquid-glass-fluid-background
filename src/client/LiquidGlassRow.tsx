/**
 * Liquid-glass preference block registered into the General section item slot:
 * on/off switch plus live tuners (blur, saturation, refraction, canvas).
 */
import clsx from 'clsx'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { LiquidGlassKey } from './locales.ts'
import type { createLiquidGlassRowStore } from './settings-store.ts'
import type { GlassSettings } from '../glass-settings.ts'
import { FLUID_PRESETS } from '../glass-settings.ts'
import { DEFAULT_FLUID_COLORS, toColorInput } from './fluid-shader.ts'
import css from './LiquidGlassRow.module.css'

/** Persistable scalar fields the tuners write. */
export type LiquidGlassTunerField = Exclude<keyof GlassSettings, 'enabled'>

/** Injected business face: overlay writes (t rides the standard locale seat). */
export interface LiquidGlassRowInjected {
  /** Persist the overlay flag. */
  setEnabled: (enabled: boolean) => void
  /** Persist one tuner field. */
  setField: (field: LiquidGlassTunerField, value: GlassSettings[LiquidGlassTunerField]) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type LiquidGlassRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createLiquidGlassRowStore>>
  & PropsLocale<'settings.liquidGlass'> & LiquidGlassRowInjected

type Tuner = {
  field: Extract<LiquidGlassTunerField, 'blurPx' | 'saturatePct' | 'displace' | 'aberration' | 'radiusPx' | 'gapPx'>
  label: LiquidGlassKey
  min: number
  max: number
  step: number
}

const TUNERS: readonly Tuner[] = [
  { field: 'blurPx', label: 'blur', min: 0, max: 40, step: 1 },
  { field: 'saturatePct', label: 'saturate', min: 100, max: 220, step: 5 },
  { field: 'displace', label: 'displace', min: 0, max: 80, step: 1 },
  { field: 'aberration', label: 'aberration', min: 0, max: 8, step: 0.5 },
  { field: 'radiusPx', label: 'radius', min: 0, max: 40, step: 1 },
  { field: 'gapPx', label: 'gap', min: 0, max: 32, step: 1 },
]

function SwitchRow({
  title,
  description,
  checked,
  onToggle,
}: {
  title: string
  description: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div className={css.row}>
      <div className={css.rowText}>
        <div className={css.title}>{title}</div>
        <div className={css.desc}>{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        className={clsx(css.switch, checked && css.switchOn)}
        onClick={() => { onToggle() }}
      >
        <span className={css.thumb} />
      </button>
    </div>
  )
}

function FluidTuners({
  t,
  setField,
  preset,
  speed,
  color1,
  color2,
  color3,
  color4,
}: {
  t: LiquidGlassRowComponentProps['t']
  setField: LiquidGlassRowInjected['setField']
  preset: GlassSettings['fluidPreset']
  speed: number
  color1: string
  color2: string
  color3: string
  color4: string
}) {
  const colors = [
    { field: 'fluidColor1' as const, label: 'color1' as const, value: color1, fallback: DEFAULT_FLUID_COLORS[0] },
    { field: 'fluidColor2' as const, label: 'color2' as const, value: color2, fallback: DEFAULT_FLUID_COLORS[1] },
    { field: 'fluidColor3' as const, label: 'color3' as const, value: color3, fallback: DEFAULT_FLUID_COLORS[2] },
    { field: 'fluidColor4' as const, label: 'color4' as const, value: color4, fallback: DEFAULT_FLUID_COLORS[3] },
  ]
  return (
    <div className={css.tuners}>
      <label className={css.tuner}>
        <span className={css.tunerLabel}>{t('preset')}</span>
        <select
          className={css.canvas}
          value={preset}
          aria-label={t('preset')}
          onChange={(event) => { setField('fluidPreset', event.target.value) }}
        >
          {FLUID_PRESETS.map(id => (
            <option key={id} value={id}>{t(id)}</option>
          ))}
        </select>
      </label>
      <label className={css.tuner}>
        <span className={css.tunerLabel}>{`${t('fluidSpeed')} ${String(speed)}`}</span>
        <input
          type="range"
          min={0.25}
          max={2.5}
          step={0.05}
          value={speed}
          aria-label={t('fluidSpeed')}
          onChange={(event) => { setField('fluidSpeed', Number(event.target.value)) }}
        />
      </label>
      <div className={css.colors}>
        {colors.map(color => (
          <label key={color.field} className={css.tuner}>
            <span className={css.tunerLabel}>{t(color.label)}</span>
            <input
              type="color"
              className={css.swatch}
              value={toColorInput(color.value, color.fallback)}
              aria-label={t(color.label)}
              onChange={(event) => { setField(color.field, event.target.value) }}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

function GlassTuners({
  t,
  setField,
  values,
  canvas,
}: {
  t: LiquidGlassRowComponentProps['t']
  setField: LiquidGlassRowInjected['setField']
  values: Record<Tuner['field'], number>
  canvas: string
}) {
  return (
    <div className={css.tuners}>
      {TUNERS.map(tuner => (
        <label key={tuner.field} className={css.tuner}>
          <span className={css.tunerLabel}>{`${t(tuner.label)} ${String(values[tuner.field])}`}</span>
          <input
            type="range"
            min={tuner.min}
            max={tuner.max}
            step={tuner.step}
            value={values[tuner.field]}
            aria-label={t(tuner.label)}
            onChange={(event) => { setField(tuner.field, Number(event.target.value)) }}
          />
        </label>
      ))}
      <label className={css.tuner}>
        <span className={css.tunerLabel}>{t('canvas')}</span>
        <input
          type="text"
          className={css.canvas}
          value={canvas}
          placeholder={t('canvasHint')}
          aria-label={t('canvas')}
          onChange={(event) => { setField('canvas', event.target.value) }}
        />
      </label>
    </div>
  )
}

/**
 * Render the liquid-glass settings block.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export function LiquidGlassRow({ t, setEnabled, setField, useStore }: LiquidGlassRowComponentProps) {
  const enabled = useStore(s => s.enabled)
  const blurPx = useStore(s => s.blurPx)
  const saturatePct = useStore(s => s.saturatePct)
  const displace = useStore(s => s.displace)
  const aberration = useStore(s => s.aberration)
  const radiusPx = useStore(s => s.radiusPx)
  const gapPx = useStore(s => s.gapPx)
  const canvas = useStore(s => s.canvas)
  const fluidEnabled = useStore(s => s.fluidEnabled)
  const fluidPreset = useStore(s => s.fluidPreset)
  const fluidSpeed = useStore(s => s.fluidSpeed)
  const fluidColor1 = useStore(s => s.fluidColor1)
  const fluidColor2 = useStore(s => s.fluidColor2)
  const fluidColor3 = useStore(s => s.fluidColor3)
  const fluidColor4 = useStore(s => s.fluidColor4)
  const values = { blurPx, saturatePct, displace, aberration, radiusPx, gapPx }
  return (
    <div className={css.block}>
      <SwitchRow
        title={t('title')}
        description={t('description')}
        checked={enabled}
        onToggle={() => { setEnabled(!enabled) }}
      />
      {enabled ? <GlassTuners t={t} setField={setField} values={values} canvas={canvas} /> : null}
      <SwitchRow
        title={t('fluidTitle')}
        description={t('fluidDescription')}
        checked={fluidEnabled}
        onToggle={() => { setField('fluidEnabled', !fluidEnabled) }}
      />
      {fluidEnabled ? <FluidTuners
        t={t}
        setField={setField}
        preset={fluidPreset}
        speed={fluidSpeed}
        color1={fluidColor1}
        color2={fluidColor2}
        color3={fluidColor3}
        color4={fluidColor4}
      /> : null}
    </div>
  )
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The liquid-glass settings row's copy. */
    'settings.liquidGlass': LiquidGlassKey
  }
}
