import type { ReactNode } from 'react';
import { CartesianGrid, LabelList, ReferenceArea, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { seriesColor, type ChartSeries } from '../../tokens/series';
import { axisStyle, axisTick, ChartTooltip, gridStyle } from './Chart';

export interface ScatterPoint {
  x: number;
  y: number;
  /** Printed next to the point. */
  label?: string;
}

export interface ScatterSeries extends ChartSeries {
  points: ScatterPoint[];
}

export interface ScatterPlotProps {
  series: ScatterSeries[];
  xLabel?: string;
  yLabel?: string;
  xFormat?: (value: number) => string;
  yFormat?: (value: number) => string;
  xDomain?: [number, number];
  yDomain?: [number, number];
  /** Join each series' points in order, to show a path (e.g. effort levels). */
  connected?: boolean;
  /**
   * Split the field at (x, y). The quadrant that is high on y and low on x is
   * washed green and the opposite one red: "better" and "worse" at a glance.
   */
  quadrants?: { x: number; y: number; good?: string; bad?: string };
  /** Print each point's label beside it. Turn off when points crowd. */
  labels?: boolean;
  animate?: boolean;
}

/** Round tick values inside a domain: steps of 1, 2, 2.5 or 5 times a power of ten. */
function niceTicks([min, max]: [number, number]): number[] {
  const raw = (max - min) / 5;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= raw) ?? raw;
  const ticks: number[] = [];
  for (let t = Math.ceil(min / step) * step; t <= max + step / 1e6; t += step) ticks.push(Number(t.toFixed(6)));
  return ticks;
}

const square = (color: string) => (props: { cx?: number; cy?: number }): ReactNode =>
  <rect x={(props.cx ?? 0) - 4} y={(props.cy ?? 0) - 4} width={8} height={8} fill={color} stroke="var(--gl-paper)" strokeWidth={1} />;

/** A scatter of square marks, with optional quadrants and connected paths. */
export function ScatterPlot({ series, xLabel, yLabel, xFormat, yFormat, xDomain, yDomain, connected = false, quadrants, labels = true, animate = false }: ScatterPlotProps) {
  const xs = series.flatMap((s) => s.points.map((p) => p.x));
  const ys = series.flatMap((s) => s.points.map((p) => p.y));
  const dx: [number, number] = xDomain ?? [Math.min(...xs), Math.max(...xs)];
  const dy: [number, number] = yDomain ?? [Math.min(...ys), Math.max(...ys)];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 24, bottom: xLabel ? 20 : 4, left: yLabel ? 16 : 4 }}>
        <CartesianGrid {...gridStyle} />
        {quadrants && (
          <>
            <ReferenceArea x1={dx[0]} x2={quadrants.x} y1={quadrants.y} y2={dy[1]} fill="rgb(var(--gl-pos))" fillOpacity={0.1} stroke="none" label={quadrants.good ? { value: quadrants.good.toUpperCase(), position: 'insideTopRight', ...axisTick, fill: 'rgb(var(--gl-pos))' } : undefined} />
            <ReferenceArea x1={quadrants.x} x2={dx[1]} y1={dy[0]} y2={quadrants.y} fill="rgb(var(--gl-neg))" fillOpacity={0.1} stroke="none" label={quadrants.bad ? { value: quadrants.bad.toUpperCase(), position: 'insideBottomLeft', ...axisTick, fill: 'rgb(var(--gl-neg))' } : undefined} />
          </>
        )}
        <XAxis type="number" dataKey="x" domain={dx} ticks={niceTicks(dx)} tickFormatter={xFormat} {...axisStyle} label={xLabel ? { value: xLabel.toUpperCase(), position: 'insideBottom', offset: -12, ...axisTick } : undefined} />
        <YAxis type="number" dataKey="y" domain={dy} ticks={niceTicks(dy)} width={48} tickFormatter={yFormat} {...axisStyle} axisLine={false} label={yLabel ? { value: yLabel.toUpperCase(), angle: -90, position: 'insideLeft', offset: 0, ...axisTick } : undefined} />
        <Tooltip
          cursor={{ stroke: 'var(--gl-ink-3)', strokeDasharray: '2 2' }}
          isAnimationActive={false}
          content={({ active, payload }) => {
            const point = payload?.[0]?.payload as (ScatterPoint & { series: string }) | undefined;
            if (!active || !point) return null;
            return (
              <ChartTooltip
                active
                label={point.label ? `${point.series} · ${point.label}` : point.series}
                payload={[
                  { name: xLabel ?? 'x', value: xFormat ? xFormat(point.x) : point.x, color: 'var(--gl-ink-3)' },
                  { name: yLabel ?? 'y', value: yFormat ? yFormat(point.y) : point.y, color: 'var(--gl-ink-3)' },
                ]}
                indicator="line"
              />
            );
          }}
        />
        {series.map((entry, i) => {
          const color = seriesColor(entry, i);
          return (
            <Scatter key={entry.key} name={entry.label} data={entry.points.map((p) => ({ ...p, series: entry.label }))} fill={color} shape={square(color)} line={connected ? { stroke: color, strokeWidth: 1 } : false} isAnimationActive={animate}>
              {labels && <LabelList dataKey="label" position="top" offset={8} style={axisTick} fill="var(--gl-ink)" />}
            </Scatter>
          );
        })}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
