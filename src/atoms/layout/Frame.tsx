import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Frame.css';

/** The page frame: two continuous vertical rules that every section hangs between. */
export function Frame({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('gl-frame', className)} {...rest} />;
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  pad?: 'none' | 'md' | 'lg';
  tone?: 'paper' | 'surface-1' | 'invert';
}

/** A horizontal band inside a Frame. Sections touch: a rule separates them, not space. */
export function Section({ pad = 'md', tone = 'paper', className, ...rest }: SectionProps) {
  return <section className={cx('gl-section', `gl-section--pad-${pad}`, `gl-section--${tone}`, className)} {...rest} />;
}
