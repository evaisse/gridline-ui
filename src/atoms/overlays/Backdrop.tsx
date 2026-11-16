import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Backdrop.css';

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  /** Renders nothing when false. */
  open?: boolean;
  /** `fixed` covers the viewport (behind a modal); `absolute` covers the nearest positioned parent (loading region). */
  position?: 'fixed' | 'absolute';
  /** Tint depth: `light` for loading regions, `strong` for modals. */
  strength?: 'light' | 'strong';
}

/** The dimmed layer behind a modal or over a loading region; children are centred on it. */
export function Backdrop({ open = true, position = 'fixed', strength = 'strong', className, ...rest }: BackdropProps) {
  if (!open) return null;
  return <div className={cx('gl-backdrop', `gl-backdrop--${position}`, `gl-backdrop--${strength}`, className)} {...rest} />;
}
