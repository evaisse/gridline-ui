import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/cx';
import './Numeric.css';

export interface NumericProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'prefix'> {
  prefix?: ReactNode;
  unit?: ReactNode;
  /** `data` is tabular mono for tables; `display` is the large serif figure. */
  variant?: 'data' | 'display';
}

/** A figure with its unit set smaller and paler. Numbers are always tabular. */
export function Numeric({ prefix, unit, variant = 'data', className, children, ...rest }: NumericProps) {
  return (
    <span className={cx('gl-numeric', `gl-numeric--${variant}`, className)} {...rest}>
      {prefix != null && <span className="gl-numeric__unit">{prefix}</span>}
      <span className="gl-numeric__value">{children}</span>
      {unit != null && <span className="gl-numeric__unit">{unit}</span>}
    </span>
  );
}
