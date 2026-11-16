import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Button, Label, Textarea } from '../../atoms';
import { Comment } from '../../molecules';
import { cx } from '../../utils/cx';
import './CommentThread.css';

export interface ThreadComment {
  id: string;
  author: string;
  time?: ReactNode;
  body: ReactNode;
  badge?: ReactNode;
  replies?: ThreadComment[];
}

export interface CommentThreadProps {
  comments: ThreadComment[];
  /** Called with the text and, for a reply, the id of the comment answered. */
  onSubmit?: (text: string, parentId?: string) => void;
  /** Heading of the thread. */
  title?: string;
  placeholder?: string;
  className?: string;
}

function countAll(list: ThreadComment[]): number {
  return list.reduce((sum, c) => sum + 1 + countAll(c.replies ?? []), 0);
}

interface ComposerProps {
  label: string;
  placeholder: string;
  submitLabel: string;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}

function Composer({ label, placeholder, submitLabel, onSubmit, onCancel, autoFocus }: ComposerProps) {
  const [text, setText] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText('');
  };
  return (
    <form className="gl-comment-thread__composer" onSubmit={submit}>
      <Textarea aria-label={label} placeholder={placeholder} value={text} rows={3} autoFocus={autoFocus} onChange={(event) => setText(event.target.value)} />
      <div className="gl-comment-thread__buttons">
        {onCancel && <Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>}
        <Button size="sm" variant="solid" type="submit" disabled={text.trim() === ''}>{submitLabel}</Button>
      </div>
    </form>
  );
}

/** A discussion with nested replies and a field to add a comment or answer one. */
export function CommentThread({ comments, onSubmit, title = 'Discussion', placeholder = 'Write a comment', className }: CommentThreadProps) {
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const render = (list: ThreadComment[]): ReactNode =>
    list.map((c) => (
      <Comment
        key={c.id}
        author={c.author}
        time={c.time}
        badge={c.badge}
        actions={<Button size="sm" variant="ghost" aria-expanded={replyTo === c.id} onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}>Reply</Button>}
        replies={(c.replies?.length || replyTo === c.id) ? (
          <>
            {c.replies && render(c.replies)}
            {replyTo === c.id && (
              <Composer label={`Reply to ${c.author}`} placeholder={`Reply to ${c.author}`} submitLabel="Reply" autoFocus onCancel={() => setReplyTo(null)} onSubmit={(text) => { onSubmit?.(text, c.id); setReplyTo(null); }} />
            )}
          </>
        ) : undefined}
      >
        {c.body}
      </Comment>
    ));

  return (
    <section className={cx('gl-comment-thread', className)} aria-label={title}>
      <header className="gl-comment-thread__head">
        <span className="gl-comment-thread__title">{title}</span>
        <Label size="xs">{countAll(comments)}</Label>
      </header>
      <div className="gl-comment-thread__list">
        {comments.length === 0 ? <p className="gl-comment-thread__empty">No comments yet.</p> : render(comments)}
      </div>
      <Composer label="New comment" placeholder={placeholder} submitLabel="Comment" onSubmit={(text) => onSubmit?.(text)} />
    </section>
  );
}
