import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './ColorSwatch.css';

export interface ColorSwatchProps extends HTMLAttributes<HTMLSpanElement> {
  /** Any CSS colour, usually a token such as `rgb(var(--gl-data-1))`. */
  color: string;
  /** The colour's name, read by screen readers and shown on hover. */
  label: string;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
}

/** A ruled square filled with one colour. */
export function ColorSwatch({ color, label, size = 'md', selected = false, className, style, ...rest }: ColorSwatchProps) {
  return <span role="img" aria-label={label} title={label} data-selected={selected || undefined} className={cx('gl-swatch', `gl-swatch--${size}`, className)} style={{ background: color, ...style }} {...rest} />;
}
