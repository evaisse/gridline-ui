import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../molecules';
import { ChevronRightIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './TreeTable.css';

export interface TreeTableColumn<Row> {
  key: string;
  header: string;
  /** Numeric columns are mono, tabular and right-aligned. */
  numeric?: boolean;
  width?: string;
  render: (row: Row) => ReactNode;
}

export interface TreeTableProps<Row extends { id: string; children?: Row[] }> {
  columns: TreeTableColumn<Row>[];
  rows: Row[];
  /** Ids of the open rows. Controlled when given. */
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  'aria-label': string;
  className?: string;
}

interface Flat<Row> { row: Row; depth: number; parent?: string }

/** A table whose rows nest and collapse. The first column is indented; Left and Right arrows close and open the focused row. */
export function TreeTable<Row extends { id: string; children?: Row[] }>({ columns, rows, expanded, defaultExpanded = [], onExpandedChange, className, ...rest }: TreeTableProps<Row>) {
  const [open, setOpen] = useControlled(expanded, defaultExpanded, onExpandedChange);
  const [focusId, setFocusId] = useState<string | undefined>(undefined);

  const flat: Flat<Row>[] = [];
  const walk = (list: Row[], depth: number, parent?: string) => list.forEach((row) => {
    flat.push({ row, depth, parent });
    if (row.children?.length && open.includes(row.id)) walk(row.children, depth + 1, row.id);
  });
  walk(rows, 0);

  const toggle = (id: string, on: boolean) => setOpen(on ? [...open.filter((x) => x !== id), id] : open.filter((x) => x !== id));
  const tabbable = flat.some((f) => f.row.id === focusId) ? focusId : flat[0]?.row.id;

  const onKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, index: number) => {
    const { row, parent } = flat[index];
    const branch = !!row.children?.length;
    let target: string | undefined;
    if (event.key === 'ArrowDown') target = flat[index + 1]?.row.id;
    else if (event.key === 'ArrowUp') target = flat[index - 1]?.row.id;
    else if (event.key === 'Home') target = flat[0]?.row.id;
    else if (event.key === 'End') target = flat[flat.length - 1]?.row.id;
    else if (event.key === 'ArrowRight' && branch) { if (!open.includes(row.id)) toggle(row.id, true); else target = row.children![0].id; }
    else if (event.key === 'ArrowLeft') { if (branch && open.includes(row.id)) toggle(row.id, false); else target = parent; }
    else return;
    event.preventDefault();
    if (target) (event.currentTarget.parentElement?.querySelector(`[data-id="${CSS.escape(target)}"]`) as HTMLElement | null)?.focus();
  };

  return (
    <div className={cx('gl-tree-table', className)}>
      <Table role="treegrid" {...rest}>
        <TableHeader>
          <TableRow>
            {columns.map((c) => <TableHead key={c.key} scope="col" style={{ width: c.width }} className={cx(c.numeric && 'gl-table__num')}>{c.header}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {flat.map(({ row, depth }, index) => {
            const branch = !!row.children?.length;
            const isOpen = branch && open.includes(row.id);
            return (
              <TableRow key={row.id} data-id={row.id} aria-level={depth + 1} aria-expanded={branch ? isOpen : undefined} tabIndex={row.id === tabbable ? 0 : -1} onFocus={() => setFocusId(row.id)} onKeyDown={(e) => onKeyDown(e, index)}>
                {columns.map((c, ci) => (
                  <TableCell key={c.key} className={cx(c.numeric && 'gl-table__num')}>
                    {ci === 0 ? (
                      <span className="gl-tree-table__first" style={{ paddingLeft: depth * 20 }}>
                        {branch ? (
                          <button type="button" tabIndex={-1} className="gl-tree-table__toggle" data-open={isOpen || undefined} aria-label={`${isOpen ? 'Collapse' : 'Expand'} row`} onClick={() => toggle(row.id, !isOpen)}>
                            <ChevronRightIcon width={12} height={12} />
                          </button>
                        ) : <span className="gl-tree-table__toggle" aria-hidden="true" />}
                        {c.render(row)}
                      </span>
                    ) : c.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
