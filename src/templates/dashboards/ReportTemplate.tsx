import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './ReportTemplate.css';

export interface ReportTemplateProps {
  /** Report title, period and author: the title block. */
  header: ReactNode;
  /** Screen-only buttons (print, export, share). Not printed. */
  actions?: ReactNode;
  /** The headline figures, usually a StatGroup. */
  summary?: ReactNode;
  /** The sections: commentary, charts and tables. Each direct child stays on one printed page where it fits. */
  children: ReactNode;
  /** Sources and notes, printed at the end. */
  footer?: ReactNode;
  className?: string;
}

/** A printable report page: title block, summary, then sections mixing commentary, figures and charts. Screen-only chrome is dropped and sections stay whole when printed. */
export function ReportTemplate({ header, actions, summary, children, footer, className }: ReportTemplateProps) {
  return (
    <div className={cx('gl-report', className)}>
      {actions != null && <div className="gl-report__actions">{actions}</div>}
      <article className="gl-report__page">
        <header className="gl-report__header">{header}</header>
        {summary != null && <section className="gl-report__summary" aria-label="Summary">{summary}</section>}
        <main className="gl-report__body gl-region">{children}</main>
        {footer != null && <footer className="gl-report__footer">{footer}</footer>}
      </article>
    </div>
  );
}
