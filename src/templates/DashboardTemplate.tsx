import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import './DashboardTemplate.css';

export interface DashboardTemplateProps {
  /** Page title and controls. */
  header: ReactNode;
  /** Headline figures, usually a StatGroup. */
  stats?: ReactNode;
  /** Chart frames. They flow into a two-column grid. */
  charts: ReactNode;
  /** A full-width block under the charts, usually a DataTable. */
  children?: ReactNode;
  className?: string;
}

/** An analytics page body: header, headline figures, a grid of charts, then a table. */
export function DashboardTemplate({ header, stats, charts, children, className }: DashboardTemplateProps) {
  return (
    <div className={cx('gl-dashboard', className)}>
      <header className="gl-dashboard__header">{header}</header>
      {stats != null && <section className="gl-dashboard__band">{stats}</section>}
      <section className="gl-dashboard__charts">{charts}</section>
      {children != null && <section className="gl-dashboard__band">{children}</section>}
    </div>
  );
}
