import type { SelectHTMLAttributes } from 'react';
import { cx } from '../utils/cx';
import './NativeSelect.css';

export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: 'ruled' | 'cell';
}

/** Native select dressed as a mono label with a ruled stepper. */
export function NativeSelect({ variant = 'ruled', className, children, ...rest }: NativeSelectProps) {
  return (
    <span className={cx('gl-select', `gl-select--${variant}`, className)}>
      <select className="gl-select__control" {...rest}>{children}</select>
      <span className="gl-select__stepper" aria-hidden="true">↕</span>
    </span>
  );
}
