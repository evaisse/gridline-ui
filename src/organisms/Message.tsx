import type { HTMLAttributes, ReactNode } from 'react';
import { Label } from '../atoms';
import { cx } from '../utils/cx';
import './Message.css';

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  /** `end` right-aligns the message, as for the person's own turns. */
  align?: 'start' | 'end';
  avatar?: ReactNode;
  /** Author name. */
  author?: ReactNode;
  /** A timestamp or status next to the author. */
  meta?: ReactNode;
  /** Actions under the content: copy, retry, feedback. */
  footer?: ReactNode;
}

/** One turn of a conversation: avatar, header, content (usually Bubbles), footer. */
export function Message({ align = 'start', avatar, author, meta, footer, className, children, ...rest }: MessageProps) {
  return (
    <div className={cx('gl-message', `gl-message--${align}`, className)} {...rest}>
      {avatar != null && <div className="gl-message__avatar">{avatar}</div>}
      <div className="gl-message__main">
        {(author != null || meta != null) && (
          <div className="gl-message__header">
            {author != null && <Label tone="ink">{author}</Label>}
            {meta != null && <Label size="xs">{meta}</Label>}
          </div>
        )}
        <div className="gl-message__content">{children}</div>
        {footer != null && <div className="gl-message__footer">{footer}</div>}
      </div>
    </div>
  );
}
