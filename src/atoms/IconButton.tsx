import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/cx';
import './IconButton.css';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** The accessible name. An icon alone says nothing to a screen reader. */
  label: string;
  icon: ReactNode;
  variant?: 'ruled' | 'ghost' | 'solid';
  size?: 'sm' | 'md';
}

/** A square button holding one glyph. */
export function IconButton({ label, icon, variant = 'ruled', size = 'md', className, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} title={label} className={cx('gl-icon-button', `gl-icon-button--${variant}`, `gl-icon-button--${size}`, className)} {...rest}>
      {icon}
    </button>
  );
}
