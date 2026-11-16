import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './MonitoringTemplate.css';

export interface MonitoringTemplateProps {
  /** Page title, overall status and time-range controls. */
  header: ReactNode;
  /** An active alert, shown full width under the header. */
  banner?: ReactNode;
  /** Headline figures, usually a StatGroup. */
  stats?: ReactNode;
  /** Chart frames. They flow into a two-column grid; add `gl-chart--wide` to span both. */
  panels: ReactNode;
  /** A full-width block under the panels, usually a DataTable of services. */
  children?: ReactNode;
  /** A rail on the right for incidents and events. */
  aside?: ReactNode;
  className?: string;
}

/** A supervision screen: status on top, live panels in the middle, an event rail on the right. */
export function MonitoringTemplate({ header, banner, stats, panels, children, aside, className }: MonitoringTemplateProps) {
  return (
    <div className={cx('gl-monitor', className)}>
      <header className="gl-monitor__header">{header}</header>
      {banner != null && <div className="gl-monitor__banner">{banner}</div>}
      {stats != null && <section className="gl-monitor__band">{stats}</section>}
      <div className={cx('gl-monitor__body', aside != null && 'gl-monitor__body--split')}>
        <div className="gl-monitor__main">
          <section className="gl-monitor__panels">{panels}</section>
          {children != null && <section className="gl-monitor__band">{children}</section>}
        </div>
        {aside != null && <aside className="gl-monitor__aside">{aside}</aside>}
      </div>
    </div>
  );
}
