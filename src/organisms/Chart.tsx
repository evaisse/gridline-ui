import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Heading, Label, Text } from '../atoms';
import { seriesColor, type ChartSeries } from '../tokens/series';
import { cx } from '../utils/cx';
import './Chart.css';

export interface ChartFrameProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** Mono metadata on the right of the header: a source, a date. */
  meta?: ReactNode;
  /** A strip of controls between the header and the plot. */
  toolbar?: ReactNode;
  /** Series to list in the legend. */
  legend?: ChartSeries[];
  /** A note under the plot. */
  footer?: ReactNode;
  /** Plot height in pixels. */
  height?: number;
  /** Draw the dotted field behind the plot. */
  dots?: boolean;
}

/** The ruled frame every chart sits in: header, legend, plot on a dotted field, footnote. */
export function ChartFrame({ title, description, meta, toolbar, legend, footer, height = 260, dots = true, className, children, ...rest }: ChartFrameProps) {
  return (
    <figure className={cx('gl-chart', className)} {...rest}>
      {(title != null || meta != null) && (
        <figcaption className="gl-chart__header">
          <div className="gl-chart__heading">
            {title != null && <Heading level={3} size="md">{title}</Heading>}
            {description != null && <Text variant="small" tone="muted">{description}</Text>}
          </div>
          {meta != null && <Label>{meta}</Label>}
        </figcaption>
      )}
      {toolbar != null && <div className="gl-chart__toolbar">{toolbar}</div>}
      {legend && legend.length > 0 && <ChartLegend series={legend} className="gl-chart__legend" />}
      <div className={cx('gl-chart__plot', dots && 'gl-dots')} style={{ height }}>{children}</div>
      {footer != null && <div className="gl-chart__footer">{footer}</div>}
    </figure>
  );
}

export function ChartLegend({ series, className }: { series: ChartSeries[]; className?: string }) {
  return (
    <ul className={cx('gl-chart-legend', className)}>
      {series.map((entry, i) => (
        <li key={entry.key}>
          <span className="gl-chart-legend__swatch" style={{ background: seriesColor(entry, i) }} />
          {entry.label}
        </li>
      ))}
    </ul>
  );
}

export interface ChartTooltipProps {
  active?: boolean;
  label?: ReactNode;
  payload?: ReadonlyArray<{ name?: unknown; value?: unknown; color?: string; dataKey?: unknown }>;
  /** Shape of the series marker. */
  indicator?: 'square' | 'line' | 'dashed';
  hideLabel?: boolean;
  labelFormatter?: (label: unknown) => ReactNode;
  valueFormatter?: (value: number) => ReactNode;
  /** Maps a data key to its display label. */
  series?: ChartSeries[];
}

/** The tooltip body shared by every chart: mono, ruled, values aligned right. */
export function ChartTooltip({ active, label, payload, indicator = 'square', hideLabel = false, labelFormatter, valueFormatter, series }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="gl-chart-tooltip">
      {!hideLabel && label != null && <div className="gl-chart-tooltip__label">{labelFormatter ? labelFormatter(label) : label}</div>}
      {payload.map((entry, i) => {
        const name = series?.find((s) => s.key === entry.dataKey)?.label ?? String(entry.name ?? '');
        return (
          <div key={i} className="gl-chart-tooltip__row">
            <span className={cx('gl-chart-tooltip__mark', `gl-chart-tooltip__mark--${indicator}`)} style={{ ['--gl-mark' as string]: entry.color } as CSSProperties} />
            <span className="gl-chart-tooltip__name">{name}</span>
            <span className="gl-chart-tooltip__value">{typeof entry.value === 'number' && valueFormatter ? valueFormatter(entry.value) : String(entry.value ?? '')}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Axis and grid dress, spread onto Recharts elements. */
export const axisTick = { fontSize: 10, fontFamily: 'var(--gl-font-mono)', fill: 'var(--gl-ink-2)' } as const;
export const axisStyle = { tickLine: false, axisLine: { stroke: 'var(--gl-rule-strong)' }, tick: axisTick, tickMargin: 8 } as const;
export const gridStyle = { stroke: 'var(--gl-rule-strong)', strokeDasharray: '1 4' } as const;
export const cursorLine = { stroke: 'var(--gl-ink)', strokeWidth: 1 } as const;
export const cursorBand = { fill: 'var(--gl-surface-3)' } as const;
