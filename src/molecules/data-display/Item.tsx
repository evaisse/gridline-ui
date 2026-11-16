import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Item.css';

export interface ItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** An icon, avatar or thumbnail. */
  media?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons or metadata on the right. */
  actions?: ReactNode;
  variant?: 'plain' | 'ruled' | 'tinted';
  size?: 'sm' | 'md';
}

/** A general-purpose row: media, title, description, actions. */
export function Item({ media, title, description, actions, variant = 'ruled', size = 'md', className, ...rest }: ItemProps) {
  return (
    <div className={cx('gl-item', `gl-item--${variant}`, `gl-item--${size}`, className)} {...rest}>
      {media != null && <div className="gl-item__media">{media}</div>}
      <div className="gl-item__content">
        <div className="gl-item__title">{title}</div>
        {description != null && <div className="gl-item__desc">{description}</div>}
      </div>
      {actions != null && <div className="gl-item__actions">{actions}</div>}
    </div>
  );
}

/** Stacks Items so they share rules. */
export function ItemGroup({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div role="list" className={cx('gl-item-group', className)} {...rest} />;
}
