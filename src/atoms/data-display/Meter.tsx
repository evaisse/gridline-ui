import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../tokens/tone';
import './Meter.css';

export interface MeterProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  tone?: Tone;
  label?: string;
}

/** A striped bar on a tick track. The remainder stays visible as graduations. */
export function Meter({ value, max = 100, tone = 'neutral', label, className, style, ...rest }: MeterProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
      className={cx('gl-meter', `gl-tone--${tone}`, className)}
      style={{ ...style, ['--gl-meter' as string]: `${pct}%` }}
      {...rest}
    >
      <div className="gl-meter__fill" />
    </div>
  );
}
