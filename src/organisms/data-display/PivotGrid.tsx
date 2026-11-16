import { useMemo, useState } from 'react';
import { Label, NativeSelect } from '../../atoms';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../molecules';
import { cx } from '../../utils/cx';
import './PivotGrid.css';

export type PivotAggregation = 'sum' | 'count' | 'avg';
export type PivotRecord = Record<string, string | number>;

export interface PivotMeasure {
  /** Numeric field to aggregate. Ignored by `count`. */
  field: string;
  aggregation: PivotAggregation;
}

export interface PivotConfig {
  rows: string;
  columns: string;
  measure: PivotMeasure;
}

export interface PivotGridProps {
  records: PivotRecord[];
  /** Initial row field. The toolbar changes it. */
  rows: string;
  /** Initial column field. */
  columns: string;
  measure: PivotMeasure;
  /** Fields offered as row and column; defaults to the text fields of the first record. */
  dimensions?: string[];
  /** Fields offered as measure; defaults to the numeric fields of the first record. */
  measures?: string[];
  /** Tint body cells in proportion to their value. */
  heat?: boolean;
  /** Formats a computed value. */
  format?: (value: number) => string;
  onConfigChange?: (config: PivotConfig) => void;
  className?: string;
}

const AGGREGATIONS: PivotAggregation[] = ['sum', 'count', 'avg'];
const defaultFormat = (v: number) => (Number.isInteger(v) ? v.toLocaleString('en-US') : v.toLocaleString('en-US', { maximumFractionDigits: 1 }));
const labelOf = (v: string | number | undefined) => (v === undefined || v === '' ? '(none)' : String(v));

function aggregate(list: PivotRecord[], m: PivotMeasure): number | undefined {
  if (list.length === 0) return undefined;
  if (m.aggregation === 'count') return list.length;
  const sum = list.reduce((t, r) => t + (Number(r[m.field]) || 0), 0);
  return m.aggregation === 'sum' ? sum : sum / list.length;
}

/** Cross-tabulates flat records by a row field and a column field, with totals and an optional heat tint. Fields swap through the toolbar. */
export function PivotGrid({ records, rows, columns, measure, dimensions, measures, heat = false, format = defaultFormat, onConfigChange, className }: PivotGridProps) {
  const [config, setConfig] = useState<PivotConfig>({ rows, columns, measure });
  const update = (patch: Partial<PivotConfig>) => {
    const next = { ...config, ...patch };
    setConfig(next);
    onConfigChange?.(next);
  };

  const first = records[0] ?? {};
  const dims = dimensions ?? Object.keys(first).filter((k) => typeof first[k] === 'string');
  const nums = measures ?? Object.keys(first).filter((k) => typeof first[k] === 'number');

  const { rowKeys, colKeys, cells, rowTotals, colTotals, grand, max } = useMemo(() => {
    const keys = (field: string) => [...new Set(records.map((r) => labelOf(r[field])))].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
    const rk = keys(config.rows);
    const ck = keys(config.columns);
    const cell = new Map<string, PivotRecord[]>();
    records.forEach((r) => {
      const k = `${labelOf(r[config.rows])}\u0000${labelOf(r[config.columns])}`;
      cell.set(k, [...(cell.get(k) ?? []), r]);
    });
    const values = new Map([...cell].map(([k, list]) => [k, aggregate(list, config.measure)]));
    return {
      rowKeys: rk,
      colKeys: ck,
      cells: values,
      rowTotals: rk.map((k) => aggregate(records.filter((r) => labelOf(r[config.rows]) === k), config.measure)),
      colTotals: ck.map((k) => aggregate(records.filter((r) => labelOf(r[config.columns]) === k), config.measure)),
      grand: aggregate(records, config.measure),
      max: Math.max(0, ...[...values.values()].map((v) => v ?? 0)),
    };
  }, [records, config]);

  const show = (v: number | undefined) => (v === undefined ? '' : format(v));
  const select = (name: string, value: string, options: string[], onChange: (v: string) => void) => (
    <label className="gl-pivot-grid__control">
      <Label size="xs">{name}</Label>
      <NativeSelect value={value} onChange={(e) => onChange(e.target.value)} aria-label={name}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </NativeSelect>
    </label>
  );

  return (
    <div className={cx('gl-pivot-grid', className)}>
      <div className="gl-pivot-grid__toolbar" role="group" aria-label="Pivot fields">
        {select('Rows', config.rows, dims, (v) => update({ rows: v }))}
        {select('Columns', config.columns, dims, (v) => update({ columns: v }))}
        {select('Aggregation', config.measure.aggregation, AGGREGATIONS, (v) => update({ measure: { ...config.measure, aggregation: v as PivotAggregation } }))}
        {config.measure.aggregation !== 'count' && select('Measure', config.measure.field, nums, (v) => update({ measure: { ...config.measure, field: v } }))}
      </div>
      <div className="gl-pivot-grid__scroll">
        <Table aria-label={`${config.measure.aggregation} by ${config.rows} and ${config.columns}`}>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">{config.rows} / {config.columns}</TableHead>
              {colKeys.map((c) => <TableHead key={c} scope="col" className="gl-table__num">{c}</TableHead>)}
              <TableHead scope="col" className="gl-table__num gl-pivot-grid__total">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowKeys.map((r, ri) => (
              <TableRow key={r}>
                <TableHead scope="row" className="gl-pivot-grid__rowhead">{r}</TableHead>
                {colKeys.map((c) => {
                  const v = cells.get(`${r}\u0000${c}`);
                  return (
                    <TableCell key={c} className="gl-table__num gl-pivot-grid__cell" style={heat && v !== undefined && max > 0 ? { background: `rgb(var(--gl-data-1) / ${0.06 + 0.4 * (v / max)})` } : undefined}>{show(v)}</TableCell>
                  );
                })}
                <TableCell className="gl-table__num gl-pivot-grid__total">{show(rowTotals[ri])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHead scope="row" className="gl-pivot-grid__rowhead">Total</TableHead>
              {colTotals.map((v, i) => <TableCell key={colKeys[i]} className="gl-table__num gl-pivot-grid__total">{show(v)}</TableCell>)}
              <TableCell className="gl-table__num gl-pivot-grid__total">{show(grand)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
