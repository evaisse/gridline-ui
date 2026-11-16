import type { HTMLAttributes, ReactNode } from 'react';
import { Label } from '../../atoms';
import { cx } from '../../utils/cx';
import './KeyValue.css';

export interface KeyValueProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
}

/** One spec line: muted key on the left, ink value on the right. */
export function KeyValue({ label, children, className, ...rest }: KeyValueProps) {
  return (
    <div className={cx('gl-kv', className)} {...rest}>
      <Label>{label}</Label>
      <Label tone="ink" className="gl-kv__value">{children}</Label>
    </div>
  );
}
