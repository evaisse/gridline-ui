import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../tokens/tone';
import './Badge.css';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** The count or short text. Omit it for a bare dot. */
  content?: ReactNode;
  /** Counts above this show as `max+`. */
  max?: number;
  tone?: Tone;
  /** The element the badge is pinned to. Without it the badge sits inline. */
  children?: ReactNode;
}

/** A count or a dot pinned to the corner of another element. */
export function Badge({ content, max = 99, tone = 'neutral', className, children, ...rest }: BadgeProps) {
  const text = typeof content === 'number' && content > max ? `${max}+` : content;
  const mark = <span className={cx('gl-badge__mark', text == null && 'gl-badge__mark--dot', `gl-tone--${tone}`)}>{text}</span>;
  if (children == null) return <span className={cx('gl-badge', className)} {...rest}>{mark}</span>;
  return <span className={cx('gl-badge gl-badge--pinned', className)} {...rest}>{children}{mark}</span>;
}
