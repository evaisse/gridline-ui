import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react';
import { GripIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Sortable.css';

export interface SortableItem {
  id: string;
  content: ReactNode;
}

export interface SortableProps {
  items?: SortableItem[];
  defaultItems?: SortableItem[];
  /** Called with the new order after a drop or a keyboard move. */
  onChange?: (items: SortableItem[]) => void;
  /** Accessible name of the list. */
  label: string;
  className?: string;
}

function move<T>(list: T[], from: number, to: number): T[] {
  const next = list.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/** A list reordered by pointer drag, or from the keyboard: focus a handle, Space to lift, arrows to move, Space to drop. */
export function Sortable({ items, defaultItems = [], onChange, label, className }: SortableProps) {
  const [list, setList] = useControlled<SortableItem[]>(items, defaultItems, onChange);
  const [lifted, setLifted] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const refs = useRef(new Map<string, HTMLLIElement>());
  const handles = useRef(new Map<string, HTMLButtonElement>());
  const origin = useRef<SortableItem[] | null>(null);

  const announce = (id: string, index: number, verb: string) => setStatus(`${verb} position ${index + 1} of ${list.length}: ${id}`);

  const moveTo = (id: string, to: number) => {
    const from = list.findIndex((it) => it.id === id);
    if (from < 0 || to < 0 || to >= list.length || from === to) return;
    setList(move(list, from, to));
    announce(id, to, 'Moved to');
    requestAnimationFrame(() => handles.current.get(id)?.focus());
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string, index: number) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (lifted === id) { setLifted(null); announce(id, index, 'Dropped at'); origin.current = null; }
      else { setLifted(id); origin.current = list; announce(id, index, 'Lifted from'); }
    } else if (event.key === 'Escape' && lifted === id) {
      event.preventDefault();
      if (origin.current) setList(origin.current);
      setLifted(null);
      setStatus('Move cancelled');
    } else if (lifted === id && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      event.preventDefault();
      moveTo(id, index + (event.key === 'ArrowUp' ? -1 : 1));
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(id);
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (dragging !== id) return;
    const from = list.findIndex((it) => it.id === id);
    let to = from;
    list.forEach((it, i) => {
      const rect = refs.current.get(it.id)?.getBoundingClientRect();
      if (rect && event.clientY >= rect.top && event.clientY <= rect.bottom) to = i;
    });
    if (to !== from) setList(move(list, from, to));
  };

  const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(null);
  };

  return (
    <div className={cx('gl-sortable', className)}>
      <ul className="gl-sortable__list" aria-label={label}>
        {list.map((item, index) => (
          <li
            key={item.id}
            ref={(node) => { if (node) refs.current.set(item.id, node); else refs.current.delete(item.id); }}
            className="gl-sortable__item"
            data-lifted={lifted === item.id || undefined}
            data-dragging={dragging === item.id || undefined}
          >
            <button
              type="button"
              ref={(node) => { if (node) handles.current.set(item.id, node); else handles.current.delete(item.id); }}
              className="gl-sortable__handle"
              aria-label={`Reorder ${index + 1} of ${list.length}`}
              aria-pressed={lifted === item.id}
              onKeyDown={(event) => onKeyDown(event, item.id, index)}
              onBlur={() => { if (lifted === item.id) setLifted(null); }}
              onPointerDown={(event) => onPointerDown(event, item.id)}
              onPointerMove={(event) => onPointerMove(event, item.id)}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <GripIcon />
            </button>
            <div className="gl-sortable__content">{item.content}</div>
          </li>
        ))}
      </ul>
      <span className="gl-sortable__status" role="status" aria-live="polite">{status}</span>
    </div>
  );
}
