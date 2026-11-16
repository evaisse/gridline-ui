import type { ReactNode } from 'react';
import { Label } from '../../atoms';
import { seriesColor, type ChartSeries } from '../../tokens/series';
import { cx } from '../../utils/cx';
import './ColumnChart.css';

export interface Column {
  key: string;
  label: string;
  value: number;
  icon?: ReactNode;
  color?: ChartSeries['color'];
}

export interface ColumnChartProps {
  columns: Column[];
  max?: number;
  format?: (value: number) => string;
  /** Give every column its own colour. Off, all columns use the first series colour. */
  colorByColumn?: boolean;
  className?: string;
}

/**
 * Edge-to-edge ranked columns: the value sits at the top of each column and the
 * name at its foot, so no axis is needed. Fill a ChartFrame plot with it.
 */
export function ColumnChart({ columns, max, format = String, colorByColumn = true, className }: ColumnChartProps) {
  const ceiling = max ?? Math.max(...columns.map((column) => column.value));
  return (
    <ol className={cx('gl-column-chart', className)}>
      {columns.map((column, i) => (
        <li key={column.key} className="gl-column-chart__slot">
          <div
            className="gl-column-chart__bar"
            style={{ height: `${(column.value / ceiling) * 100}%`, background: seriesColor(colorByColumn ? column : { color: column.color ?? 1 }, i, 0.82), borderColor: seriesColor(colorByColumn ? column : { color: column.color ?? 1 }, i) }}
          >
            <Label tone="inherit" className="gl-column-chart__value">{format(column.value)}</Label>
            <span className="gl-column-chart__foot">
              {column.icon != null && <span className="gl-column-chart__icon">{column.icon}</span>}
              <Label tone="inherit" size="xs" className="gl-column-chart__name">{column.label}</Label>
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
