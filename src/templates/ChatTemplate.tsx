import type { ReactNode } from 'react';
import { cx } from '../utils/cx';
import './ChatTemplate.css';

export interface ChatTemplateProps {
  /** The conversation list, usually an AssistantThreadList. */
  sidebar: ReactNode;
  /** A strip above the thread: title, model picker, actions. */
  header?: ReactNode;
  /** The thread. */
  children: ReactNode;
  className?: string;
}

/** A full-height chat application: conversations on the left, one thread on the right. */
export function ChatTemplate({ sidebar, header, children, className }: ChatTemplateProps) {
  return (
    <div className={cx('gl-chat', className)}>
      <aside className="gl-chat__sidebar">{sidebar}</aside>
      <main className="gl-chat__main">
        {header != null && <div className="gl-chat__header">{header}</div>}
        <div className="gl-chat__thread">{children}</div>
      </main>
    </div>
  );
}
