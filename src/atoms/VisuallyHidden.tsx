import type { HTMLAttributes } from 'react';
import { cx } from '../utils/cx';
import './VisuallyHidden.css';

/** Text for screen readers only: it takes no space and paints nothing. */
export function VisuallyHidden({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('gl-visually-hidden', className)} {...rest} />;
}
