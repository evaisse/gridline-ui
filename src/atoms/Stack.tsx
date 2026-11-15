import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../utils/cx';
import './Stack.css';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'column' | 'row';
  /** A step of the spacing scale: 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 5 = 24px, 6 = 40px. */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: boolean;
  /** Draw a hairline between children instead of leaving a gap. */
  ruled?: boolean;
}

/** Lays children out in one direction with a gap from the spacing scale. */
export function Stack({ direction = 'column', gap = 3, align, justify, wrap = false, ruled = false, className, style, ...rest }: StackProps) {
  return (
    <div
      className={cx('gl-stack', `gl-stack--${direction}`, wrap && 'gl-stack--wrap', ruled && 'gl-stack--ruled', className)}
      style={{ gap: gap === 0 ? 0 : `var(--gl-space-${gap})`, alignItems: align, justifyContent: justify, ...style }}
      {...rest}
    />
  );
}
