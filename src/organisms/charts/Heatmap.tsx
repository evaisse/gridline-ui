import { seriesColor } from '../../tokens/series';
import { cx } from '../../utils/cx';
import './Heatmap.css';

export interface HeatmapProps {
  /** Rows of values. `null` leaves a cell empty. */
  values: (number | null)[][];
  rowLabels?: string[];
  columnLabels?: string[];
  /** Scale start; defaults to the smallest value. */
  min?: number;
  /** Scale end; defaults to the largest value. */
  max?: number;
  /** Which of the eight data colours to tint with. */
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /** Names the quantity in each cell's tooltip and accessible name. */
  valueLabel?: string;
  format?: (value: number) => string;
  /** Print each value inside its cell. */
  showValues?: boolean;
  className?: string;
}

/** Values as tints on a grid: the stronger the cell, the larger the value. */
export function Heatmap({ values, rowLabels, columnLabels, min, max, color = 1, valueLabel = 'Value', format, showValues = false, className }: HeatmapProps) {
  const flat = values.flat().filter((v): v is number => v != null);
  const lo = min ?? Math.min(...flat);
  const hi = max ?? Math.max(...flat);
  const columns = Math.max(0, ...values.map((row) => row.length));
  const fmt = (v: number) => (format ? format(v) : String(v));
  const template = `${rowLabels ? 'max-content ' : ''}repeat(${columns}, minmax(0, 1fr))`;

  return (
    <div className={cx('gl-heatmap', className)} role="grid" aria-label={valueLabel} style={{ gridTemplateColumns: template, gridTemplateRows: `${columnLabels ? 'auto ' : ''}repeat(${values.length}, minmax(0, 1fr))` }}>
      {columnLabels && (
        <>
          {rowLabels && <span />}
          {Array.from({ length: columns }, (_, c) => <span key={c} className="gl-heatmap__col" role="columnheader">{columnLabels[c]}</span>)}
        </>
      )}
      {values.map((row, r) => (
        <div key={r} className="gl-heatmap__row" role="row">
          {rowLabels && <span className="gl-heatmap__rowlabel" role="rowheader">{rowLabels[r]}</span>}
          {Array.from({ length: columns }, (_, c) => {
            const v = row[c];
            const name = `${rowLabels?.[r] ?? `Row ${r + 1}`}, ${columnLabels?.[c] ?? `column ${c + 1}`}`;
            if (v == null) return <span key={c} className="gl-heatmap__cell gl-heatmap__cell--empty" role="gridcell" aria-label={`${name}: no data`} />;
            const t = hi === lo ? 1 : Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
            return (
              <span key={c} className="gl-heatmap__cell" role="gridcell" title={`${name} · ${valueLabel} ${fmt(v)}`} aria-label={`${name}: ${fmt(v)}`} style={{ background: seriesColor({ color }, 0, 0.08 + t * 0.92), color: t > 0.55 ? 'var(--gl-paper)' : 'var(--gl-ink)' }}>
                {showValues && fmt(v)}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
