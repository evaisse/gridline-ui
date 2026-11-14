import type { ReactNode } from 'react';
import {
  Pie, PieChart as RPieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RRadarChart,
  RadialBar, RadialBarChart, ResponsiveContainer, Tooltip,
} from 'recharts';
import { seriesColor, type ChartSeries } from '../tokens/series';
import { axisTick, ChartTooltip, type ChartTooltipProps } from './Chart';
import './PolarCharts.css';

export interface Slice {
  key: string;
  label: string;
  value: number;
  color?: ChartSeries['color'];
}

const tip = (valueFormatter?: (v: number) => ReactNode, series?: ChartSeries[]) => (props: object): ReactNode =>
  <ChartTooltip {...(props as ChartTooltipProps)} hideLabel={!series} valueFormatter={valueFormatter} series={series} />;

function sliceLabel(props: { x?: number; y?: number; textAnchor?: string; name?: string }): ReactNode {
  return <text x={props.x} y={props.y} textAnchor={props.textAnchor as 'start' | 'middle' | 'end' | undefined} dominantBaseline="central" {...axisTick}>{props.name}</text>;
}

export interface PieChartProps {
  data: Slice[];
  /** Cut a hole and show `center` inside it. */
  donut?: boolean;
  center?: ReactNode;
  /** Print each slice's label beside it. */
  labels?: boolean;
  valueFormat?: (value: number) => string;
  animate?: boolean;
}

/** Slices separated by a paper hairline. Keep to five slices or fewer. */
export function PieChart({ data, donut = false, center, labels = false, valueFormat, animate = false }: PieChartProps) {
  return (
    <div className="gl-polar">
      <ResponsiveContainer width="100%" height="100%">
        <RPieChart margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
          <Tooltip content={tip(valueFormat)} isAnimationActive={false} />
          <Pie data={data.map((slice, i) => ({ ...slice, fill: seriesColor(slice, i) }))} dataKey="value" nameKey="label" innerRadius={donut ? '58%' : 0} outerRadius={labels ? '72%' : '92%'} stroke="var(--gl-paper)" strokeWidth={1} isAnimationActive={animate} label={labels ? sliceLabel : false} labelLine={labels ? { stroke: 'var(--gl-rule-strong)' } : false} />
        </RPieChart>
      </ResponsiveContainer>
      {donut && center != null && <div className="gl-polar__center">{center}</div>}
    </div>
  );
}

export interface RadarChartProps {
  data: Array<Record<string, string | number>>;
  /** The key holding each axis name. */
  axisKey: string;
  series: ChartSeries[];
  /** Draw the grid as circles instead of polygons. */
  circular?: boolean;
  filled?: boolean;
  valueFormat?: (value: number) => string;
  animate?: boolean;
}

/** Compares a few subjects across the same axes. */
export function RadarChart({ data, axisKey, series, circular = false, filled = true, valueFormat, animate = false }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RRadarChart data={data} margin={{ top: 16, right: 24, bottom: 16, left: 24 }}>
        <PolarGrid gridType={circular ? 'circle' : 'polygon'} stroke="var(--gl-rule-strong)" />
        <PolarAngleAxis dataKey={axisKey} tick={axisTick} />
        <PolarRadiusAxis tick={false} axisLine={false} />
        <Tooltip content={tip(valueFormat, series)} isAnimationActive={false} />
        {series.map((entry, i) => (
          <Radar key={entry.key} dataKey={entry.key} name={entry.label} stroke={seriesColor(entry, i)} strokeWidth={1.5} fill={seriesColor(entry, i)} fillOpacity={filled ? 0.14 : 0} dot={{ r: 2, fill: seriesColor(entry, i), strokeWidth: 0 }} isAnimationActive={animate} />
        ))}
      </RRadarChart>
    </ResponsiveContainer>
  );
}

export interface RadialChartProps {
  data: Slice[];
  /** The value a full ring represents. */
  max?: number;
  /** Shown in the middle, typically a Numeric. */
  center?: ReactNode;
  /** Sweep in degrees: 360 for rings, 180 for a gauge. */
  sweep?: 180 | 270 | 360;
  valueFormat?: (value: number) => string;
  animate?: boolean;
}

/** Concentric bars on a tinted track: progress toward a ceiling, one ring per item. */
export function RadialChart({ data, max = 100, center, sweep = 360, valueFormat, animate = false }: RadialChartProps) {
  const rows = data.map((slice, i) => ({ ...slice, fill: seriesColor(slice, i) }));
  const start = sweep === 360 ? 90 : sweep === 180 ? 180 : 225;
  return (
    <div className="gl-polar" data-sweep={sweep}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart data={rows} innerRadius={sweep === 180 ? '64%' : '48%'} outerRadius={sweep === 180 ? '100%' : '96%'} startAngle={start} endAngle={start - sweep} barCategoryGap={3} cy={sweep === 180 ? '72%' : '50%'}>
          <PolarAngleAxis type="number" domain={[0, max]} tick={false} axisLine={false} />
          <Tooltip
            isAnimationActive={false}
            content={({ active, payload }) => {
              const row = payload?.[0]?.payload as (Slice & { fill: string }) | undefined;
              return row ? <ChartTooltip active={active} hideLabel payload={[{ name: row.label, value: row.value, color: row.fill }]} valueFormatter={valueFormat} /> : null;
            }}
          />
          <RadialBar dataKey="value" background={{ fill: 'var(--gl-surface-3)' }} isAnimationActive={animate} />
        </RadialBarChart>
      </ResponsiveContainer>
      {center != null && <div className="gl-polar__center">{center}</div>}
    </div>
  );
}
