import { useMemo, useState, type ReactNode } from 'react';
import { Checkbox, Label } from '../../atoms';
import { Pagination } from '../../molecules';
import { ArrowDownIcon, ArrowUpIcon, SortIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './DataTable.css';

export interface Column<Row> {
  key: string;
  header: string;
  /** Numeric columns are mono, tabular and right-aligned. */
  numeric?: boolean;
  width?: string;
  render: (row: Row) => ReactNode;
  /** Returns the value to sort by. Columns without it are not sortable. */
  sortValue?: (row: Row) => number | string;
}

export interface DataTableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  caption?: string;
  /** Show a leading rank column that follows the current sort. */
  ranked?: boolean;
  /** Tint the first N rows, strongest first, like a podium. */
  highlightTop?: number;
  selectable?: boolean;
  onSelectionChange?: (keys: string[]) => void;
  defaultSort?: { key: string; direction: 'asc' | 'desc' };
  /** Rows per page. Omit to show every row. */
  pageSize?: number;
  className?: string;
}

/** A ruled data table with sorting, row selection, ranking and paging. */
export function DataTable<Row>({ columns, rows, rowKey, caption, ranked = false, highlightTop = 0, selectable = false, onSelectionChange, defaultSort, pageSize, className }: DataTableProps<Row>) {
  const [sort, setSort] = useState(defaultSort);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const column = columns.find((c) => c.key === sort?.key);
    if (!sort || !column?.sortValue) return rows;
    const value = column.sortValue;
    const sign = sort.direction === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const [x, y] = [value(a), value(b)];
      return (typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))) * sign;
    });
  }, [rows, columns, sort]);

  const pageCount = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const current = Math.min(page, pageCount);
  const offset = pageSize ? (current - 1) * pageSize : 0;
  const visible = pageSize ? sorted.slice(offset, offset + pageSize) : sorted;

  const updateSelection = (next: Set<string>) => {
    setSelected(next);
    onSelectionChange?.([...next]);
  };
  const allKeys = rows.map(rowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((key) => selected.has(key));

  const toggleSort = (key: string) =>
    setSort((s) => (s?.key !== key ? { key, direction: 'desc' } : s.direction === 'desc' ? { key, direction: 'asc' } : undefined));

  return (
    <div className={cx('gl-data-table', className)}>
      <div className="gl-data-table__scroll">
        <table className="gl-table">
          {caption && <caption className="gl-table__caption">{caption}</caption>}
          <thead>
            <tr>
              {selectable && (
                <th scope="col" className="gl-data-table__check">
                  <Checkbox aria-label="Select all rows" checked={allSelected ? true : selected.size > 0 ? 'indeterminate' : false} onCheckedChange={(on) => updateSelection(on === true ? new Set(allKeys) : new Set())} />
                </th>
              )}
              {ranked && <th scope="col" className="gl-data-table__rank">#</th>}
              {columns.map((column) => {
                const active = sort?.key === column.key;
                return (
                  <th key={column.key} scope="col" style={{ width: column.width }} className={cx(column.numeric && 'gl-table__num')} aria-sort={active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : undefined}>
                    {column.sortValue ? (
                      <button type="button" className="gl-data-table__sort" data-active={active || undefined} onClick={() => toggleSort(column.key)}>
                        {column.header}
                        {active ? (sort.direction === 'asc' ? <ArrowUpIcon width={12} height={12} /> : <ArrowDownIcon width={12} height={12} />) : <SortIcon width={12} height={12} />}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => {
              const key = rowKey(row);
              const rank = offset + i + 1;
              return (
                <tr key={key} aria-selected={selectable ? selected.has(key) : undefined} data-top={rank <= highlightTop ? rank : undefined}>
                  {selectable && (
                    <td className="gl-data-table__check">
                      <Checkbox
                        aria-label={`Select row ${rank}`}
                        checked={selected.has(key)}
                        onCheckedChange={(on) => {
                          const next = new Set(selected);
                          if (on === true) next.add(key);
                          else next.delete(key);
                          updateSelection(next);
                        }}
                      />
                    </td>
                  )}
                  {ranked && <td className="gl-data-table__rank">{rank}</td>}
                  {columns.map((column) => (
                    <td key={column.key} className={cx(column.numeric && 'gl-table__num')}>{column.render(row)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {(pageSize || selectable) && (
        <div className="gl-data-table__footer">
          <Label>{selectable ? `${selected.size} of ${rows.length} selected` : `${rows.length} rows`}</Label>
          {pageSize && pageCount > 1 && <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />}
        </div>
      )}
    </div>
  );
}
