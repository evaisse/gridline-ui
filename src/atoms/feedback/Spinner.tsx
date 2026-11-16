import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Spinner.css';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

/** Four ticks that step, like a terminal progress mark. */
export function Spinner({ label = 'Loading', className, ...rest }: SpinnerProps) {
  return <span role="status" aria-label={label} className={cx('gl-spinner', className)} {...rest} />;
}
