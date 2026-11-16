import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './InboxTemplate.css';

export interface InboxTemplateProps {
  /** A bar across the top: search, compose. */
  header?: ReactNode;
  /** The folder list, usually a Sidebar or NavList. */
  folders: ReactNode;
  /** The message list, usually a MasterList. */
  list: ReactNode;
  /** The reading pane: the open message or an empty state. */
  children: ReactNode;
  className?: string;
}

/** A mail-style screen: folders on the left, the message list in the middle, the open message on the right. */
export function InboxTemplate({ header, folders, list, children, className }: InboxTemplateProps) {
  return (
    <div className={cx('gl-inbox', className)}>
      {header != null && <header className="gl-inbox__header">{header}</header>}
      <div className="gl-inbox__body">
        <nav className="gl-inbox__folders" aria-label="Folders">{folders}</nav>
        <section className="gl-inbox__list" aria-label="Messages">{list}</section>
        <main className="gl-inbox__pane">{children}</main>
      </div>
    </div>
  );
}
