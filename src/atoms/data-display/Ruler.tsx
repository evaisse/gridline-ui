import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Ruler.css';

export interface RulerProps extends HTMLAttributes<HTMLDivElement> {
  min?: number;
  max?: number;
  /** Position of the tall marker. */
  value: number;
  /** Optional emphasised span, e.g. the range covered by peers. */
  range?: [number, number];
  label?: string;
}

/** A graduated scale that places one value among its peers. */
export function Ruler({ min = 0, max = 100, value, range, label, className, style, ...rest }: RulerProps) {
  const pos = (v: number) => `${Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100))}%`;
  const [lo, hi] = range ?? [min, max];
  return (
    <div
      role="img"
      aria-label={label ?? `${value} on a scale from ${min} to ${max}`}
      className={cx('gl-ruler', className)}
      style={{ ...style, ['--gl-ruler-lo' as string]: pos(lo), ['--gl-ruler-hi' as string]: pos(hi), ['--gl-ruler-at' as string]: pos(value) }}
      {...rest}
    >
      <div className="gl-ruler__range" />
      <div className="gl-ruler__marker" />
    </div>
  );
}
