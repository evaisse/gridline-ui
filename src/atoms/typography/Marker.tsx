import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Marker.css';

export interface MarkerProps extends HTMLAttributes<HTMLDivElement> {
  /** `separator` is a labelled rule, `row` a bordered band, `inline` a bare note. */
  variant?: 'separator' | 'row' | 'inline';
}

/** A system note inside a conversation or a log: a date, a status, a break. */
export function Marker({ variant = 'separator', className, children, ...rest }: MarkerProps) {
  return (
    <div role={variant === 'separator' ? 'separator' : 'note'} className={cx('gl-marker', `gl-marker--${variant}`, className)} {...rest}>
      <span className="gl-marker__content">{children}</span>
    </div>
  );
}
