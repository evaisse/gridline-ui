import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './ProfileTemplate.css';

export interface ProfileTemplateProps {
  /** Avatar, name and actions: the identity block. */
  header: ReactNode;
  /** Key facts beside the activity, usually a DescriptionList or SpecSheet. */
  facts?: ReactNode;
  /** The tab bar that switches between activity views, usually Tabs. */
  tabs?: ReactNode;
  /** The active tab content. */
  children: ReactNode;
  className?: string;
}

/** A person or organisation page: identity header, a column of facts, then tabs of activity. */
export function ProfileTemplate({ header, facts, tabs, children, className }: ProfileTemplateProps) {
  return (
    <div className={cx('gl-profile', className)}>
      <header className="gl-profile__header">{header}</header>
      <div className={cx('gl-profile__body', facts != null && 'gl-profile__body--facts')}>
        <main className="gl-profile__main">
          {tabs != null && <div className="gl-profile__tabs">{tabs}</div>}
          <div className="gl-profile__content">{children}</div>
        </main>
        {facts != null && <aside className="gl-profile__facts" aria-label="Facts">{facts}</aside>}
      </div>
    </div>
  );
}
