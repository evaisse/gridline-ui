import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Highlight.css';

export interface HighlightProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** The full text. */
  children: string;
  /** The substring to mark, matched without regard to case. */
  query: string;
}

/** Marks every occurrence of a search term inside a string. */
export function Highlight({ children, query, className, ...rest }: HighlightProps) {
  const needle = query.trim().toLowerCase();
  if (needle === '') return <span className={className} {...rest}>{children}</span>;
  const parts: Array<{ text: string; hit: boolean }> = [];
  const hay = children.toLowerCase();
  let from = 0;
  for (let at = hay.indexOf(needle); at !== -1; at = hay.indexOf(needle, from)) {
    if (at > from) parts.push({ text: children.slice(from, at), hit: false });
    parts.push({ text: children.slice(at, at + needle.length), hit: true });
    from = at + needle.length;
  }
  if (from < children.length) parts.push({ text: children.slice(from), hit: false });
  return (
    <span className={cx('gl-highlight', className)} {...rest}>
      {parts.map((part, i) => (part.hit ? <mark key={i} className="gl-highlight__mark">{part.text}</mark> : part.text))}
    </span>
  );
}
