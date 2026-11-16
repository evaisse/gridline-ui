import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../tokens/tone';
import './Tag.css';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** Shows a small square in the tone colour. The label stays ink. */
  dot?: boolean;
}

export function Tag({ tone = 'neutral', dot = false, className, children, ...rest }: TagProps) {
  return (
    <span className={cx('gl-tag', `gl-tone--${tone}`, className)} {...rest}>
      {dot && <span className="gl-tag__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
