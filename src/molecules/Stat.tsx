import type { HTMLAttributes, ReactNode } from 'react';
import { Label, Numeric } from '../atoms';
import type { Tone } from '../tokens/tone';
import { cx } from '../utils/cx';
import './Stat.css';

export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
  label: ReactNode;
  value: ReactNode;
  prefix?: ReactNode;
  unit?: ReactNode;
  /** Secondary figure, e.g. a margin of error. */
  note?: ReactNode;
  tone?: Tone;
  /** Usually a Ruler placing the value among its peers. */
  children?: ReactNode;
}

/** A headline figure in a tinted cell. */
export function Stat({ label, value, prefix, unit, note, tone = 'neutral', className, children, ...rest }: StatProps) {
  return (
    <div className={cx('gl-stat', `gl-tone--${tone}`, className)} {...rest}>
      <Label>{label}</Label>
      <div className="gl-stat__figure">
        <Numeric variant="display" prefix={prefix} unit={unit}>{value}</Numeric>
        {note != null && <span className="gl-stat__note">{note}</span>}
      </div>
      {children}
    </div>
  );
}
