import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './SettingsTemplate.css';

export interface SettingsTemplateProps {
  /** Page title and actions, usually a PageHeader. */
  header: ReactNode;
  /** The list of settings sections. */
  nav: ReactNode;
  /** The sections themselves. Wrap each in SettingsSection. */
  children: ReactNode;
  /** A bar pinned under the sections: save and discard. */
  footer?: ReactNode;
  className?: string;
}

export interface SettingsSectionProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

/** One block of settings: its title and explanation on the left, its fields on the right. */
export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className="gl-settings__section">
      <div className="gl-settings__legend">
        <h2 className="gl-settings__title">{title}</h2>
        {description != null && <p className="gl-settings__desc">{description}</p>}
      </div>
      <div className="gl-settings__fields">{children}</div>
    </section>
  );
}

/** A settings page: sections listed on the left, forms on the right, one save bar at the bottom. */
export function SettingsTemplate({ header, nav, children, footer, className }: SettingsTemplateProps) {
  return (
    <div className={cx('gl-settings', className)}>
      {header}
      <div className="gl-settings__body">
        <nav className="gl-settings__nav" aria-label="Settings">{nav}</nav>
        <main className="gl-settings__main">
          {children}
          {footer != null && <div className="gl-settings__footer">{footer}</div>}
        </main>
      </div>
    </div>
  );
}
