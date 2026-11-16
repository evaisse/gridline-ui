import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Label.css';

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** `muted` for metadata keys, `ink` for values and headers. */
  tone?: 'muted' | 'ink' | 'inherit';
  size?: 'xs' | 'sm';
}

/** Monospace, uppercase. The voice of metadata: keys, dates, units, column heads. */
export function Label({ tone = 'muted', size = 'sm', className, ...rest }: LabelProps) {
  return <span className={cx('gl-label', `gl-label--${tone}`, `gl-label--${size}`, className)} {...rest} />;
}
