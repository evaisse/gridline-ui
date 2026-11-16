import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Gauge.css';

export type GaugeTone = 'pos' | 'warn' | 'neg' | 'info';

export interface GaugeBand {
  /** Upper bound of the band: it runs from the previous band's bound (or the minimum) up to here. */
  to: number;
  tone: GaugeTone;
}

export interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  /** `linear` is a bullet bar, `arc` a half circle, `radial` a three-quarter ring. */
  variant?: 'linear' | 'arc' | 'radial';
  /** Threshold bands drawn behind the value. The value takes the colour of the band it falls in. */
  bands?: GaugeBand[];
  /** A target mark on the scale (linear variant). */
  target?: number;
  /** What the value measures. Also the accessible name. */
  label?: string;
  format?: (value: number) => ReactNode;
  className?: string;
}

const toneColor = (tone: GaugeTone) => `rgb(var(--gl-${tone}))`;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
}

function arcPath(cx: number, cy: number, r: number, from: number, to: number) {
  return `M ${polar(cx, cy, r, from)} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${polar(cx, cy, r, to)}`;
}

/** One value on a linear, arc or radial scale, with optional threshold bands. */
export function Gauge({ value, min = 0, max = 100, variant = 'linear', bands, target, label, format, className }: GaugeProps) {
  const span = max - min || 1;
  const frac = (v: number) => clamp((v - min) / span, 0, 1);
  const segments = (bands ?? []).map((band, i) => ({ from: i === 0 ? min : bands![i - 1].to, to: band.to, tone: band.tone }));
  const current = bands?.find((b) => value <= b.to) ?? bands?.[bands.length - 1];
  const color = current ? toneColor(current.tone) : 'rgb(var(--gl-data-1))';
  const text = format ? format(value) : value;
  const aria = { role: 'meter', 'aria-label': label ?? 'Gauge', 'aria-valuemin': min, 'aria-valuemax': max, 'aria-valuenow': value } as const;

  if (variant === 'linear') {
    return (
      <div className={cx('gl-gauge', 'gl-gauge--linear', className)} {...aria}>
        <div className="gl-gauge__head">
          <span className="gl-gauge__label">{label}</span>
          <span className="gl-gauge__value">{text}</span>
        </div>
        <div className="gl-gauge__track">
          {segments.map((s) => (
            <span key={s.to} className="gl-gauge__band" style={{ left: `${frac(s.from) * 100}%`, width: `${(frac(s.to) - frac(s.from)) * 100}%`, background: toneColor(s.tone) }} />
          ))}
          <span className="gl-gauge__bar" style={{ width: `${frac(value) * 100}%`, background: color }} />
          {target != null && <span className="gl-gauge__target" style={{ left: `${frac(target) * 100}%` }} />}
        </div>
        <div className="gl-gauge__scale"><span>{format ? format(min) : min}</span><span>{format ? format(max) : max}</span></div>
      </div>
    );
  }

  const radial = variant === 'radial';
  const start = radial ? 135 : 180;
  const sweep = radial ? 270 : 180;
  const at = (f: number) => start + f * sweep;
  const centre = 100;
  const r = 80;
  const valueEnd = at(frac(value));
  return (
    <div className={cx('gl-gauge', `gl-gauge--${variant}`, className)} {...aria}>
      <svg viewBox={radial ? '0 0 200 200' : '0 0 200 116'} className="gl-gauge__svg" aria-hidden="true">
        <path d={arcPath(centre, centre, r, start, start + sweep)} className="gl-gauge__arc-track" />
        {segments.map((s) => <path key={s.to} d={arcPath(centre, centre, r, at(frac(s.from)), at(frac(s.to)))} className="gl-gauge__arc-band" stroke={toneColor(s.tone)} />)}
        {frac(value) > 0 && <path d={arcPath(centre, centre, r, start, valueEnd)} className="gl-gauge__arc-value" stroke={color} />}
        <text x={centre} y={radial ? 104 : 96} textAnchor="middle" className="gl-gauge__svg-value">{text}</text>
        {label && <text x={centre} y={radial ? 124 : 114} textAnchor="middle" className="gl-gauge__svg-label">{label.toUpperCase()}</text>}
      </svg>
    </div>
  );
}
