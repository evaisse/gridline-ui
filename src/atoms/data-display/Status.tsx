import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { Tone } from '../../tokens/tone';
import './Status.css';

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colour of the mark. */
  tone?: Tone;
  /** Text next to the mark, e.g. "Degraded". */
  children?: ReactNode;
  /** Hollow mark, for "unknown" or "paused". */
  hollow?: boolean;
}

/** A coloured mark with a label: online, degraded, down. */
export function Status({ tone = 'neutral', hollow = false, children, className, ...rest }: StatusProps) {
  return (
    <span className={cx('gl-status', `gl-tone--${tone}`, hollow && 'gl-status--hollow', className)} {...rest}>
      <span className="gl-status__mark" aria-hidden="true" />
      {children ? <span className="gl-status__label">{children}</span> : null}
    </span>
  );
}
