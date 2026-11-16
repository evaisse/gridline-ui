import { useEffect, useState } from 'react';
import { cx } from '../../utils/cx';
import './TableOfContents.css';

export interface TocItem {
  /** The id of the heading element in the page. */
  id: string;
  label: string;
  /** Heading depth, 1 to 4. Deeper levels are indented. */
  level: number;
}

export interface TableOfContentsProps {
  items: TocItem[];
  /** Forces the active heading, e.g. for stories. Disables scroll tracking. */
  activeId?: string;
  onActiveChange?: (id: string) => void;
  /** Accessible name of the navigation landmark. */
  label?: string;
  className?: string;
}

/** Links to the headings of the page, highlighting the one in view. */
export function TableOfContents({ items, activeId, onActiveChange, label = 'On this page', className }: TableOfContentsProps) {
  const [tracked, setTracked] = useState<string | undefined>(items[0]?.id);
  const current = activeId ?? tracked;
  const ids = items.map((item) => item.id).join('|');

  useEffect(() => {
    if (activeId !== undefined || typeof IntersectionObserver === 'undefined') return undefined;
    const visible = new Set<string>();
    const order = ids.split('|');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id);
      }
      const first = order.find((id) => visible.has(id));
      if (first) { setTracked(first); onActiveChange?.(first); }
    }, { rootMargin: '0px 0px -70% 0px' });
    for (const id of order) { const el = document.getElementById(id); if (el) observer.observe(el); }
    return () => observer.disconnect();
  }, [ids, activeId, onActiveChange]);

  return (
    <nav aria-label={label} className={cx('gl-toc', className)}>
      <p className="gl-toc__title">{label}</p>
      <ul className="gl-toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`} className="gl-toc__link" aria-current={item.id === current ? 'location' : undefined}
              style={{ paddingLeft: `calc(var(--gl-space-3) + ${Math.max(0, item.level - 1)} * var(--gl-space-3))` }}
              onClick={(event) => {
                const el = document.getElementById(item.id);
                if (el) { event.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
                setTracked(item.id);
                onActiveChange?.(item.id);
              }}
            >{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
