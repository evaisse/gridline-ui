import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Breadcrumb.css';

export interface Crumb {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

/** A mono path. The last item is the current page. */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cx('gl-breadcrumb', className)}>
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {item.href && !last ? <a href={item.href}>{item.label}</a> : <span aria-current={last ? 'page' : undefined}>{item.label}</span>}
              {!last && <span className="gl-breadcrumb__sep" aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
