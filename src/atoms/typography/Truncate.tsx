import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Truncate.css';

export interface TruncateProps extends HTMLAttributes<HTMLSpanElement> {
  /** Lines to keep before the ellipsis. */
  lines?: number;
  /** Shows the full text as a native tooltip. */
  title?: string;
}

/** Cuts text to a number of lines with an ellipsis. */
export function Truncate({ lines = 1, className, style, ...rest }: TruncateProps) {
  return <span className={cx('gl-truncate', lines > 1 && 'gl-truncate--multi', className)} style={{ ...(lines > 1 ? { WebkitLineClamp: lines } : null), ...style }} {...rest} />;
}
