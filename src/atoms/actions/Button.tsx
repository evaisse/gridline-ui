import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ruled' | 'ghost';
  size?: 'sm' | 'md';
  /** Rendered in a ruled square before the label. */
  icon?: ReactNode;
}

export function Button({ variant = 'ruled', size = 'md', icon, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={cx('gl-button', `gl-button--${variant}`, `gl-button--${size}`, className)} {...rest}>
      {icon != null && <span className="gl-button__icon" aria-hidden="true">{icon}</span>}
      {children != null && <span className="gl-button__label">{children}</span>}
    </button>
  );
}
