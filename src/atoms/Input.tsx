import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils/cx';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leading?: ReactNode;
  /** `cell` drops the border so the input fills a ruled cell edge to edge. */
  variant?: 'ruled' | 'cell';
}

export function Input({ leading, variant = 'ruled', className, ...rest }: InputProps) {
  return (
    <span className={cx('gl-input', `gl-input--${variant}`, className)}>
      {leading != null && <span className="gl-input__leading" aria-hidden="true">{leading}</span>}
      <input className="gl-input__control" {...rest} />
    </span>
  );
}
