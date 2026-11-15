import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import './QueueTemplate.css';

export interface QueueTemplateProps {
  /** Page title and primary actions. */
  header: ReactNode;
  /** Headline figures, usually a StatGroup. */
  stats?: ReactNode;
  /** Chart frames. They flow into a two-column grid. */
  charts?: ReactNode;
  /** Filters pinned above the queue, usually a Toolbar. */
  toolbar?: ReactNode;
  /** The queue itself, usually a DataTable. */
  children: ReactNode;
  /** The selected record, shown in a rail on the right. */
  aside?: ReactNode;
  className?: string;
}

/** A work queue: figures and charts on top, then a filterable list beside the selected record. */
export function QueueTemplate({ header, stats, charts, toolbar, children, aside, className }: QueueTemplateProps) {
  return (
    <div className={cx('gl-queue', className)}>
      <header className="gl-queue__header">{header}</header>
      {stats != null && <section className="gl-queue__band">{stats}</section>}
      {charts != null && <section className="gl-queue__charts">{charts}</section>}
      <div className={cx('gl-queue__body', aside != null && 'gl-queue__body--split')}>
        <section className="gl-queue__list">
          {toolbar}
          {children}
        </section>
        {aside != null && <aside className="gl-queue__aside">{aside}</aside>}
      </div>
    </div>
  );
}
