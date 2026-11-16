import { useCallback, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { Button } from '../../atoms';
import { ArrowDownIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './MessageScroller.css';

export interface MessageScrollerProps extends HTMLAttributes<HTMLDivElement> {
  /** Changes whenever content is appended; while pinned, the view follows it. */
  followKey?: unknown;
}

/**
 * A chat scroll container. It stays pinned to the newest message while content
 * streams in, releases as soon as the reader scrolls up, and offers a jump back.
 */
export function MessageScroller({ followKey, className, children, ...rest }: MessageScrollerProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(true);

  const toBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
    const el = viewport.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    if (pinned) toBottom();
  }, [followKey, pinned, toBottom]);

  const onScroll = () => {
    const el = viewport.current;
    if (el) setPinned(el.scrollHeight - el.scrollTop - el.clientHeight < 24);
  };

  return (
    <div className={cx('gl-message-scroller', className)} {...rest}>
      <div ref={viewport} className="gl-message-scroller__viewport" onScroll={onScroll} role="log" aria-live="polite" tabIndex={0}>
        <div className="gl-message-scroller__content">{children}</div>
      </div>
      {!pinned && (
        <Button className="gl-message-scroller__jump" size="sm" icon={<ArrowDownIcon />} onClick={() => toBottom('smooth')}>Latest</Button>
      )}
    </div>
  );
}
