import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './TopBar.css';

export interface TopBarLink {
  id: string;
  label: ReactNode;
  href?: string;
}

export interface TopBarProps {
  /** The brand: a mark and a name. */
  brand: ReactNode;
  links?: TopBarLink[];
  /** Id of the link for the current section. */
  current?: string;
  onNavigate?: (id: string) => void;
  /** A search field or other content between the links and the actions. */
  children?: ReactNode;
  /** Buttons, an avatar or a menu on the right. */
  actions?: ReactNode;
  sticky?: boolean;
  className?: string;
}

/** A site or application header: brand, sections, actions, in ruled cells. */
export function TopBar({ brand, links = [], current, onNavigate, children, actions, sticky = false, className }: TopBarProps) {
  return (
    <header className={cx('gl-top-bar', sticky && 'gl-top-bar--sticky', className)}>
      <div className="gl-top-bar__brand">{brand}</div>
      {links.length > 0 && (
        <nav className="gl-top-bar__nav" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.id} href={link.href ?? '#'} className="gl-top-bar__link" aria-current={link.id === current ? 'page' : undefined}
              onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate(link.id); } }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      <div className="gl-top-bar__fill">{children}</div>
      {actions != null && <div className="gl-top-bar__actions">{actions}</div>}
    </header>
  );
}
