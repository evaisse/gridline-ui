import { useState, type ReactNode } from 'react';
import { Label } from '../atoms';
import type { Tone } from '../tokens/tone';
import { cx } from '../utils/cx';
import './Kanban.css';

export interface KanbanColumn {
  id: string;
  title: string;
  tone?: Tone;
  /** Work-in-progress limit. The count turns negative-toned above it. */
  limit?: number;
}

export interface KanbanCard {
  id: string;
  /** The id of the column the card sits in. */
  column: string;
  title: ReactNode;
  /** Tags, assignee, due date. */
  meta?: ReactNode;
}

export interface KanbanProps {
  columns: KanbanColumn[];
  cards: KanbanCard[];
  /** Called when a card is dropped on another column. Without it the board is read-only. */
  onMove?: (cardId: string, columnId: string) => void;
  className?: string;
}

/** Cards in ruled columns, one per stage. Drag a card to another column to move it. */
export function Kanban({ columns, cards, onMove, className }: KanbanProps) {
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);

  return (
    <div className={cx('gl-kanban', className)}>
      {columns.map((column) => {
        const own = cards.filter((card) => card.column === column.id);
        const above = column.limit != null && own.length > column.limit;
        return (
          <section
            key={column.id} className={cx('gl-kanban__column', `gl-tone--${column.tone ?? 'neutral'}`)} data-over={over === column.id || undefined} aria-label={column.title}
            onDragOver={(event) => { if (onMove && dragging) { event.preventDefault(); setOver(column.id); } }}
            onDragLeave={() => setOver((current) => (current === column.id ? null : current))}
            onDrop={() => { if (dragging) onMove?.(dragging, column.id); setDragging(null); setOver(null); }}
          >
            <header className="gl-kanban__head">
              <span className="gl-kanban__dot" aria-hidden="true" />
              <Label tone="ink">{column.title}</Label>
              <Label className="gl-kanban__count" data-above={above || undefined}>{own.length}{column.limit != null && ` / ${column.limit}`}</Label>
            </header>
            <ul className="gl-kanban__cards">
              {own.map((card) => (
                <li
                  key={card.id} className="gl-kanban__card" draggable={onMove != null} data-dragging={dragging === card.id || undefined}
                  onDragStart={() => setDragging(card.id)} onDragEnd={() => { setDragging(null); setOver(null); }}
                >
                  <span className="gl-kanban__title">{card.title}</span>
                  {card.meta != null && <div className="gl-kanban__meta">{card.meta}</div>}
                </li>
              ))}
              {own.length === 0 && <li className="gl-kanban__empty gl-hatch" aria-label="Empty" />}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
