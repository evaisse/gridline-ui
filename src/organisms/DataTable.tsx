import type { ReactNode } from 'react';
import { Label } from '../atoms';
import { cx } from '../utils/cx';
import './DataTable.css';

export interface Column<Row> {
  key: string;
  header: string;
  /** Numeric columns are mono, tabular and right-aligned. */
  numeric?: boolean;
  width?: string;
  render: (row: Row) => ReactNode;
}

export interface DataTableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  caption?: string;
  className?: string;
}

/** A ruled table. Horizontal hairlines only; columns align on the grid. */
export function DataTable<Row>({ columns, rows, rowKey, caption, className }: DataTableProps<Row>) {
  return (
    <table className={cx('gl-table', className)}>
      {caption && <caption className="gl-table__caption"><Label>{caption}</Label></caption>}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col" style={{ width: column.width }} className={cx(column.numeric && 'gl-table__num')}>
              <Label>{column.header}</Label>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={rowKey(row)}>
            {columns.map((column) => (
              <td key={column.key} className={cx(column.numeric && 'gl-table__num')}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
