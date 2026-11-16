import type { ReactNode } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { seriesColor, type ChartSeries } from '../../tokens/series';
import { axisStyle, ChartTooltip, cursorBand, gridStyle, type ChartTooltipProps } from './Chart';
import './CompositeChart.css';

export interface CompositeSeries extends ChartSeries {
  /** How this series is drawn. */
  type: 'bar' | 'line' | 'area';
}

export interface CompositeChartProps {
  data: Record<string, string | number>[];
  /** The key holding each row's category. */
  xKey: string;
  series: CompositeSeries[];
  xFormat?: (value: string) => string;
  yFormat?: (value: number) => string;
  showGrid?: boolean;
  animate?: boolean;
}

/** Bars, lines and areas on shared axes. */
export function CompositeChart({ data, xKey, series, xFormat, yFormat, showGrid = true, animate = false }: CompositeChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 4, left: 4 }}>
        {showGrid && <CartesianGrid vertical={false} {...gridStyle} />}
        <XAxis dataKey={xKey} tickFormatter={xFormat} {...axisStyle} />
        <YAxis width={44} tickFormatter={yFormat} {...axisStyle} axisLine={false} />
        <Tooltip cursor={cursorBand} isAnimationActive={false} content={(props: object): ReactNode => <ChartTooltip {...(props as ChartTooltipProps)} series={series} valueFormatter={yFormat} />} />
        {series.filter((s) => s.type === 'area').map((s) => {
          const i = series.indexOf(s);
          return <Area key={s.key} dataKey={s.key} name={s.label} type="linear" stroke={seriesColor(s, i)} strokeWidth={1.5} fill={seriesColor(s, i)} fillOpacity={0.14} isAnimationActive={animate} activeDot={{ r: 3, strokeWidth: 0 }} />;
        })}
        {series.filter((s) => s.type === 'bar').map((s) => {
          const i = series.indexOf(s);
          return <Bar key={s.key} dataKey={s.key} name={s.label} fill={seriesColor(s, i)} barSize={18} isAnimationActive={animate} />;
        })}
        {series.filter((s) => s.type === 'line').map((s) => {
          const i = series.indexOf(s);
          return <Line key={s.key} dataKey={s.key} name={s.label} type="linear" stroke={seriesColor(s, i)} strokeWidth={1.5} dot={false} isAnimationActive={animate} activeDot={{ r: 3, strokeWidth: 0 }} />;
        })}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
