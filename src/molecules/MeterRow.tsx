import type { HTMLAttributes, ReactNode } from 'react';
import { Label, Meter, Numeric } from '../atoms';
import type { Tone } from '../tokens/tone';
import { cx } from '../utils/cx';
import './MeterRow.css';

export interface MeterRowProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  value: number;
  max?: number;
  unit?: ReactNode;
  /** Formatted figure; defaults to `value`. */
  display?: ReactNode;
  rank?: number;
  of?: number;
  tone?: Tone;
}

/** A named measurement: label, striped meter, figure, and rank among peers. */
export function MeterRow({ name, value, max = 100, unit, display, rank, of, tone = 'neutral', className, ...rest }: MeterRowProps) {
  return (
    <div className={cx('gl-meter-row', className)} {...rest}>
      <span className="gl-meter-row__name">{name}</span>
      <Meter value={value} max={max} tone={tone} label={name} />
      <Numeric unit={unit} className="gl-meter-row__value">{display ?? value}</Numeric>
      {rank != null && (
        <span className="gl-meter-row__rank">
          <Numeric>{rank}</Numeric>
          {of != null && <Label size="xs"> / {of}</Label>}
        </span>
      )}
    </div>
  );
}
