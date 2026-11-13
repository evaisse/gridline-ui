import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../utils/cx';
import './Grid.css';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** A column count, or any `grid-template-columns` value. */
  columns?: number | string;
  /** Draw the outer frame. Turn off when the parent already rules the edges. */
  framed?: boolean;
}

/**
 * The signature primitive: cells that share their borders.
 * Cells are separated by exactly one hairline, never two, and never a gap.
 */
export function Grid({ columns = 3, framed = true, className, style, ...rest }: GridProps) {
  const template = typeof columns === 'number' ? `repeat(${columns}, minmax(0, 1fr))` : columns;
  return <div className={cx('gl-grid', framed && 'gl-grid--framed', className)} style={{ ...style, gridTemplateColumns: template }} {...rest} />;
}

export interface CellProps extends HTMLAttributes<HTMLDivElement> {
  pad?: 'none' | 'sm' | 'md' | 'lg';
  tone?: 'paper' | 'surface-1' | 'surface-2' | 'invert';
  span?: number;
}

export function Cell({ pad = 'md', tone = 'paper', span, className, style, ...rest }: CellProps) {
  const spanStyle: CSSProperties | undefined = span ? { gridColumn: `span ${span}` } : undefined;
  return <div className={cx('gl-cell', `gl-cell--pad-${pad}`, `gl-cell--${tone}`, className)} style={{ ...spanStyle, ...style }} {...rest} />;
}
