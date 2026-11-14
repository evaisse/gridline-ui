import type { ReactNode } from 'react';
import {
  Area, AreaChart as RAreaChart, Bar, BarChart as RBarChart, CartesianGrid, LabelList, Line, LineChart as RLineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { seriesColor, type ChartSeries } from '../tokens/series';
import { axisStyle, axisTick, ChartTooltip, cursorBand, cursorLine, gridStyle, type ChartTooltipProps } from './Chart';

type Datum = Record<string, string | number>;

interface CartesianProps {
  data: Datum[];
  /** The key holding each row's category. */
  xKey: string;
  series: ChartSeries[];
  xFormat?: (value: string) => string;
  yFormat?: (value: number) => string;
  showGrid?: boolean;
  showYAxis?: boolean;
  tooltip?: Pick<ChartTooltipProps, 'indicator' | 'hideLabel'>;
  animate?: boolean;
}

const margin = { top: 16, right: 16, bottom: 4, left: 4 };

function tooltipContent(series: ChartSeries[], yFormat: CartesianProps['yFormat'], options: CartesianProps['tooltip']) {
  return (props: object): ReactNode => <ChartTooltip {...(props as ChartTooltipProps)} series={series} valueFormatter={yFormat} {...options} />;
}

export interface AreaChartProps extends CartesianProps {
  stacked?: boolean;
  curve?: 'linear' | 'monotone' | 'step';
}

/** Areas are a flat wash under a 1.5px line. No gradients. */
export function AreaChart({ data, xKey, series, stacked = false, curve = 'linear', xFormat, yFormat, showGrid = true, showYAxis = true, tooltip, animate = false }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RAreaChart data={data} margin={margin}>
        {showGrid && <CartesianGrid vertical={false} {...gridStyle} />}
        <XAxis dataKey={xKey} tickFormatter={xFormat} {...axisStyle} />
        {showYAxis && <YAxis width={44} tickFormatter={yFormat} {...axisStyle} axisLine={false} />}
        <Tooltip cursor={cursorLine} content={tooltipContent(series, yFormat, tooltip)} isAnimationActive={false} />
        {series.map((entry, i) => (
          <Area key={entry.key} dataKey={entry.key} name={entry.label} type={curve} stackId={stacked ? 'stack' : undefined} stroke={seriesColor(entry, i)} strokeWidth={1.5} fill={seriesColor(entry, i)} fillOpacity={stacked ? 0.35 : 0.14} isAnimationActive={animate} activeDot={{ r: 3, strokeWidth: 0 }} />
        ))}
      </RAreaChart>
    </ResponsiveContainer>
  );
}

export interface BarChartProps extends CartesianProps {
  stacked?: boolean;
  /** `horizontal` lays bars along the x axis, for long category names. */
  layout?: 'vertical' | 'horizontal';
  /** Print each value at the end of its bar. */
  labels?: boolean;
}

/** Square bars. A 1px paper gap separates stacked segments. */
export function BarChart({ data, xKey, series, stacked = false, layout = 'vertical', labels = false, xFormat, yFormat, showGrid = true, showYAxis = true, tooltip, animate = false }: BarChartProps) {
  const horizontal = layout === 'horizontal';
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RBarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'} margin={{ ...margin, right: horizontal && labels ? 40 : 16 }} barCategoryGap="24%" barGap={2}>
        {showGrid && <CartesianGrid vertical={horizontal} horizontal={!horizontal} {...gridStyle} />}
        {horizontal ? (
          <>
            <XAxis type="number" tickFormatter={yFormat} {...axisStyle} hide={!showYAxis} />
            <YAxis type="category" dataKey={xKey} width={88} tickFormatter={xFormat} {...axisStyle} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tickFormatter={xFormat} {...axisStyle} />
            {showYAxis && <YAxis width={44} tickFormatter={yFormat} {...axisStyle} axisLine={false} />}
          </>
        )}
        <Tooltip cursor={cursorBand} content={tooltipContent(series, yFormat, tooltip)} isAnimationActive={false} />
        {series.map((entry, i) => (
          <Bar key={entry.key} dataKey={entry.key} name={entry.label} stackId={stacked ? 'stack' : undefined} fill={seriesColor(entry, i)} stroke="var(--gl-paper)" strokeWidth={stacked ? 1 : 0} isAnimationActive={animate}>
            {labels && !stacked && <LabelList dataKey={entry.key} position={horizontal ? 'right' : 'top'} formatter={(value: unknown) => (typeof value === 'number' && yFormat ? yFormat(value) : String(value))} style={axisTick} fill="var(--gl-ink)" />}
          </Bar>
        ))}
      </RBarChart>
    </ResponsiveContainer>
  );
}

export interface LineChartProps extends CartesianProps {
  curve?: 'linear' | 'monotone' | 'step';
  /** Draw a square marker on every point. */
  dots?: boolean;
}

/** 1.5px lines. Use `curve="step"` for values that change at discrete moments. */
export function LineChart({ data, xKey, series, curve = 'linear', dots = false, xFormat, yFormat, showGrid = true, showYAxis = true, tooltip, animate = false }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RLineChart data={data} margin={margin}>
        {showGrid && <CartesianGrid vertical={false} {...gridStyle} />}
        <XAxis dataKey={xKey} tickFormatter={xFormat} {...axisStyle} />
        {showYAxis && <YAxis width={44} tickFormatter={yFormat} {...axisStyle} axisLine={false} />}
        <Tooltip cursor={cursorLine} content={tooltipContent(series, yFormat, tooltip)} isAnimationActive={false} />
        {series.map((entry, i) => (
          <Line key={entry.key} dataKey={entry.key} name={entry.label} type={curve} stroke={seriesColor(entry, i)} strokeWidth={1.5} dot={dots ? { r: 2.5, fill: seriesColor(entry, i), strokeWidth: 0 } : false} activeDot={{ r: 3.5, strokeWidth: 0 }} isAnimationActive={animate} />
        ))}
      </RLineChart>
    </ResponsiveContainer>
  );
}
