import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Marquee.css';

export interface MarqueeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNode;
  /** Seconds for one full loop. Larger is slower. */
  duration?: number;
  /** Scroll left to right instead of right to left. */
  reverse?: boolean;
  /** Stop while hovered or focused. */
  pauseOnHover?: boolean;
  /** Space between repeats, in pixels. */
  gap?: number;
}

/** Content that scrolls sideways in a loop. Under `prefers-reduced-motion` it stops and scrolls by hand. */
export function Marquee({ children, duration = 24, reverse = false, pauseOnHover = true, gap = 24, className, style, ...rest }: MarqueeProps) {
  const vars = { ['--gl-marquee-duration' as string]: `${duration}s`, ['--gl-marquee-gap' as string]: `${gap}px`, ...style } as CSSProperties;
  return (
    <div role="group" tabIndex={0} aria-roledescription="marquee" className={cx('gl-marquee', reverse && 'gl-marquee--reverse', pauseOnHover && 'gl-marquee--pausable', className)} style={vars} {...rest}>
      <div className="gl-marquee__track">
        <div className="gl-marquee__set">{children}</div>
        <div className="gl-marquee__set" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
