import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { IconButton, Label, Popover, PopoverContent, PopoverTrigger } from '../../atoms';
import { ExpandIcon, GripIcon, MinusIcon, PlusIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './DashboardLayout.css';

export interface DashboardTile {
  id: string;
  title: ReactNode;
  /** Columns the tile spans. Default 1. */
  colSpan?: number;
  /** Rows the tile spans. Default 1. */
  rowSpan?: number;
  /** The tile body. */
  content: ReactNode;
  /** Controls in the header, before the resize button. */
  actions?: ReactNode;
}

export interface DashboardLayoutProps {
  /** The tiles in reading order. The array order is the layout order. */
  tiles: DashboardTile[];
  /** Called with the new array after a tile is moved or resized. Without it the layout is fixed. */
  onTilesChange?: (tiles: DashboardTile[]) => void;
  /** Number of grid columns. Below 640px the grid is a single column. */
  columns?: number;
  /** Height of one grid row in pixels. */
  rowHeight?: number;
  className?: string;
}

const clamp = (n: number, max: number) => Math.min(Math.max(1, n), max);

/**
 * A grid of tiles, each with a header and a body. Drag a header to reorder
 * (or focus its grip and press the arrow keys); the resize button changes the column and row span.
 */
export function DashboardLayout({ tiles, onTilesChange, columns = 4, rowHeight = 168, className }: DashboardLayoutProps) {
  const [drag, setDrag] = useState<{ id: string; over: string | null } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const editable = onTilesChange != null;

  const move = (id: string, to: number) => {
    const from = tiles.findIndex((t) => t.id === id);
    if (from < 0 || to < 0 || to >= tiles.length || to === from) return;
    const next = tiles.slice();
    next.splice(to, 0, next.splice(from, 1)[0]);
    onTilesChange?.(next);
  };
  const resize = (id: string, dc: number, dr: number) =>
    onTilesChange?.(tiles.map((t) => (t.id === id ? { ...t, colSpan: clamp((t.colSpan ?? 1) + dc, columns), rowSpan: clamp((t.rowSpan ?? 1) + dr, 6) } : t)));

  const overId = (event: PointerEvent) => {
    const el = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-tile]');
    return el && root.current?.contains(el) ? el.dataset.tile ?? null : null;
  };
  const onKey = (event: KeyboardEvent, id: string) => {
    const at = tiles.findIndex((t) => t.id === id);
    const step = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key as 'ArrowLeft'];
    if (step) { event.preventDefault(); move(id, at + step); }
  };
  const finish = (event: PointerEvent) => {
    if (drag && drag.over && drag.over !== drag.id) move(drag.id, tiles.findIndex((t) => t.id === drag.over));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setDrag(null);
  };

  return (
    <div ref={root} className={cx('gl-dashboard-layout', className)} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gridAutoRows: rowHeight }} data-dragging={drag ? '' : undefined}>
      {tiles.map((tile) => (
        <section
          key={tile.id} data-tile={tile.id} className="gl-dashboard-layout__tile" aria-label={typeof tile.title === 'string' ? tile.title : undefined}
          data-dragging={drag?.id === tile.id || undefined} data-over={(drag != null && drag.over === tile.id && drag.id !== tile.id) || undefined}
          style={{ ['--gl-cols' as string]: clamp(tile.colSpan ?? 1, columns), ['--gl-rows' as string]: clamp(tile.rowSpan ?? 1, 6) }}
        >
          <header className="gl-dashboard-layout__head">
            {editable && (
              <button
                type="button" className="gl-dashboard-layout__grip" aria-label={`Move ${typeof tile.title === 'string' ? tile.title : 'tile'}. Arrow keys reorder.`}
                onPointerDown={(event) => { if (event.button === 0) { event.currentTarget.setPointerCapture(event.pointerId); setDrag({ id: tile.id, over: null }); } }}
                onPointerMove={(event) => { if (drag?.id === tile.id) setDrag({ id: tile.id, over: overId(event) }); }}
                onPointerUp={finish} onPointerCancel={() => setDrag(null)}
                onKeyDown={(event) => onKey(event, tile.id)}
              >
                <GripIcon aria-hidden="true" />
              </button>
            )}
            <Label tone="ink" className="gl-dashboard-layout__title">{tile.title}</Label>
            {tile.actions}
            {editable && (
              <Popover>
                <PopoverTrigger asChild>
                  <IconButton label="Resize tile" icon={<ExpandIcon />} variant="ghost" size="sm" />
                </PopoverTrigger>
                <PopoverContent className="gl-dashboard-layout__resize" align="end">
                  {([['Columns', tile.colSpan ?? 1, 1, 0], ['Rows', tile.rowSpan ?? 1, 0, 1]] as const).map(([name, value, dc, dr]) => (
                    <div key={name} className="gl-dashboard-layout__resize-row" role="group" aria-label={name}>
                      <Label>{name}</Label>
                      <IconButton label={`Fewer ${name.toLowerCase()}`} icon={<MinusIcon />} size="sm" disabled={value <= 1} onClick={() => resize(tile.id, -dc, -dr)} />
                      <output className="gl-dashboard-layout__span" aria-label={`${name} spanned`}>{value}</output>
                      <IconButton label={`More ${name.toLowerCase()}`} icon={<PlusIcon />} size="sm" disabled={name === 'Columns' ? value >= columns : value >= 6} onClick={() => resize(tile.id, dc, dr)} />
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            )}
          </header>
          <div className="gl-dashboard-layout__body">{tile.content}</div>
        </section>
      ))}
    </div>
  );
}
