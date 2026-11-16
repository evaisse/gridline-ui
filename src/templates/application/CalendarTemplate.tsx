import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './CalendarTemplate.css';

export interface CalendarTemplateProps {
  /** Title, view switch and today button, usually a PageHeader or Toolbar. */
  header?: ReactNode;
  /** A small month picker, usually a Calendar. */
  mini: ReactNode;
  /** The list of calendars to show or hide, usually a CheckboxGroup. */
  calendars?: ReactNode;
  /** The scheduler: week, day or month grid. */
  children: ReactNode;
  className?: string;
}

/** A calendar app: a mini calendar and the list of calendars on the left, the scheduler filling the rest. */
export function CalendarTemplate({ header, mini, calendars, children, className }: CalendarTemplateProps) {
  return (
    <div className={cx('gl-calendar-page', className)}>
      {header != null && <header className="gl-calendar-page__header">{header}</header>}
      <div className="gl-calendar-page__body">
        <aside className="gl-calendar-page__side">
          <div className="gl-calendar-page__mini">{mini}</div>
          {calendars != null && <nav className="gl-calendar-page__calendars" aria-label="Calendars">{calendars}</nav>}
        </aside>
        <main className="gl-calendar-page__main">{children}</main>
      </div>
    </div>
  );
}
