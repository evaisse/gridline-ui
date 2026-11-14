import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/cx';
import './Bubble.css';

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  /** `tinted` for the person, `plain` for the assistant, `ruled` for quoted or system content. */
  variant?: 'tinted' | 'plain' | 'ruled' | 'solid';
  align?: 'start' | 'end';
  /** Small controls pinned under the bubble, such as reaction buttons. */
  reactions?: ReactNode;
}

/** Conversational content. A ruled or tinted box, not a rounded balloon. */
export function Bubble({ variant = 'tinted', align = 'start', reactions, className, children, ...rest }: BubbleProps) {
  return (
    <div className={cx('gl-bubble-wrap', `gl-bubble-wrap--${align}`, className)} {...rest}>
      <div className={cx('gl-bubble', `gl-bubble--${variant}`)}>{children}</div>
      {reactions != null && <div className="gl-bubble__reactions">{reactions}</div>}
    </div>
  );
}

/** Stacks consecutive bubbles from one author so they share rules. */
export function BubbleGroup({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('gl-bubble-group', className)} {...rest} />;
}
