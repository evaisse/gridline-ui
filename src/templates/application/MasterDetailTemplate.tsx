import type { ReactNode } from 'react';
import { Frame } from '../../atoms';
import { cx } from '../../utils/cx';
import './MasterDetailTemplate.css';

export interface MasterDetailTemplateProps {
  /** The list side, usually a MasterList organism. */
  master: ReactNode;
  /** A Toolbar pinned above the detail pane. */
  toolbar?: ReactNode;
  /** The detail pane. */
  children: ReactNode;
  className?: string;
}

/** List on the left, record on the right, one vertical rule between them. */
export function MasterDetailTemplate({ master, toolbar, children, className }: MasterDetailTemplateProps) {
  return (
    <Frame className={cx('gl-master-detail', className)}>
      <aside className="gl-master-detail__master">{master}</aside>
      <main className="gl-master-detail__detail">
        {toolbar}
        <div className="gl-master-detail__content gl-region">{children}</div>
      </main>
    </Frame>
  );
}
