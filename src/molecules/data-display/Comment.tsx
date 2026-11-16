import type { ReactNode } from 'react';
import { Avatar, Label } from '../../atoms';
import { cx } from '../../utils/cx';
import './Comment.css';

export interface CommentProps {
  /** Display name of the author. */
  author: string;
  /** Initials shown in the avatar; derived from the author when omitted. */
  initials?: string;
  /** When it was written, as text: "2 h ago", "Nov 12". */
  time?: ReactNode;
  /** A short tag after the time, such as "edited" or "maintainer". */
  badge?: ReactNode;
  /** The comment text. */
  children: ReactNode;
  /** Buttons under the body: reply, like, resolve. */
  actions?: ReactNode;
  /** Nested replies, usually more `Comment`s. */
  replies?: ReactNode;
  className?: string;
}

function initialsOf(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');
}

/** An author, a time and a body, with replies nested under it. */
export function Comment({ author, initials, time, badge, children, actions, replies, className }: CommentProps) {
  return (
    <article className={cx('gl-comment', className)}>
      <Avatar fallback={initials ?? initialsOf(author)} size="sm" />
      <div className="gl-comment__main">
        <header className="gl-comment__head">
          <strong className="gl-comment__author">{author}</strong>
          {time != null && <Label size="xs">{time}</Label>}
          {badge != null && <Label size="xs" tone="ink">{badge}</Label>}
        </header>
        <div className="gl-comment__body">{children}</div>
        {actions != null && <div className="gl-comment__actions">{actions}</div>}
        {replies != null && <div className="gl-comment__replies">{replies}</div>}
      </div>
    </article>
  );
}
