import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './AppShellTemplate.css';

export interface AppShellTemplateProps {
  /** The top bar, usually a TopBar. */
  header?: ReactNode;
  /** The sidebar, usually a Sidebar. */
  nav: ReactNode;
  /** The page content. */
  children: ReactNode;
  /** A panel on the right: details, activity, help. */
  aside?: ReactNode;
  /** A bar under the content: status line, legal small print. */
  footer?: ReactNode;
  className?: string;
}

/** The shell every working screen shares: header on top, sidebar on the left, content in the middle, optional aside on the right. */
export function AppShellTemplate({ header, nav, children, aside, footer, className }: AppShellTemplateProps) {
  return (
    <div className={cx('gl-app-shell', className)}>
      {header != null && <header className="gl-app-shell__header">{header}</header>}
      <div className={cx('gl-app-shell__body', aside != null && 'gl-app-shell__body--aside')}>
        <nav className="gl-app-shell__nav" aria-label="Primary">{nav}</nav>
        <main className="gl-app-shell__main">{children}</main>
        {aside != null && <aside className="gl-app-shell__aside">{aside}</aside>}
      </div>
      {footer != null && <footer className="gl-app-shell__footer">{footer}</footer>}
    </div>
  );
}
