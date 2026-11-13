import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Label } from '../atoms';
import { cx } from '../utils/cx';
import './NavItem.css';

export interface NavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  count?: number;
  selected?: boolean;
}

/** A category entry for a ruled sidebar. */
export function NavItem({ icon, count, selected = false, className, children, ...rest }: NavItemProps) {
  return (
    <button type="button" aria-current={selected || undefined} className={cx('gl-nav-item', className)} {...rest}>
      {icon != null && <span className="gl-nav-item__icon" aria-hidden="true">{icon}</span>}
      <Label tone="inherit" className="gl-nav-item__label">{children}</Label>
      {count != null && <Label tone="inherit" size="xs" className="gl-nav-item__count">{count}</Label>}
    </button>
  );
}
