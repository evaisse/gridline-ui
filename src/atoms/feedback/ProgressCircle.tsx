import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../tokens/tone';
import './ProgressCircle.css';

export interface ProgressCircleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current value; omit for an indeterminate ring. */
  value?: number;
  max?: number;
  /** Outer diameter in px. */
  size?: number;
  /** Ring thickness in px. */
  thickness?: number;
  tone?: Tone;
  /** Show the percentage in the middle. */
  showValue?: boolean;
  /** Accessible name. */
  label?: string;
}

/** Progress drawn on a ring; spins when no value is given. */
export function ProgressCircle({ value, max = 100, size = 40, thickness = 3, tone = 'neutral', showValue = false, label = 'Progress', className, style, ...rest }: ProgressCircleProps) {
  const determinate = value !== undefined;
  const ratio = determinate ? Math.min(1, Math.max(0, value / max)) : 0.25;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={determinate ? value : undefined}
      className={cx('gl-progress-circle', `gl-tone--${tone}`, !determinate && 'gl-progress-circle--indeterminate', className)}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="gl-progress-circle__track" cx={size / 2} cy={size / 2} r={r} strokeWidth={thickness} fill="none" />
        <circle
          className="gl-progress-circle__bar"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={`${c * ratio} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {showValue && determinate ? <span className="gl-progress-circle__value">{Math.round(ratio * 100)}%</span> : null}
    </div>
  );
}
