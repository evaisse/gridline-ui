import type { ReactNode } from 'react';
import { Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { axisStyle, ChartTooltip, cursorLine, gridStyle } from './Chart';
import './CandlestickChart.css';

export interface Candle {
  /** The period: a date or a label. */
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandlestickChartProps {
  data: Candle[];
  xFormat?: (value: string) => string;
  yFormat?: (value: number) => string;
  showGrid?: boolean;
  animate?: boolean;
}

interface ShapeProps { x: number; y: number; width: number; height: number; payload: Candle }

function candle({ x, y, width, height, payload }: ShapeProps): ReactNode {
  const { open, high, low, close } = payload;
  const span = high - low || 1;
  const at = (v: number) => y + ((high - v) / span) * height;
  const up = close >= open;
  const color = up ? 'rgb(var(--gl-pos))' : 'rgb(var(--gl-neg))';
  const body = Math.max(1, Math.abs(at(open) - at(close)));
  const w = Math.max(3, Math.min(width, 18));
  const cx = x + width / 2;
  return (
    <g>
      <line x1={cx} x2={cx} y1={y} y2={y + height} stroke={color} strokeWidth={1} />
      <rect x={cx - w / 2} y={Math.min(at(open), at(close))} width={w} height={body} fill={up ? 'var(--gl-paper)' : color} stroke={color} strokeWidth={1} />
    </g>
  );
}

/** Open, high, low and close per period. Rising candles are hollow green, falling ones solid red. */
export function CandlestickChart({ data, xFormat, yFormat, showGrid = true, animate = false }: CandlestickChartProps) {
  const rows = data.map((d) => ({ ...d, range: [d.low, d.high] as [number, number] }));
  const lo = Math.min(...data.map((d) => d.low));
  const hi = Math.max(...data.map((d) => d.high));
  const pad = (hi - lo) * 0.08 || 1;
  const fmt = (v: number) => (yFormat ? yFormat(v) : String(v));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={rows} margin={{ top: 16, right: 16, bottom: 4, left: 4 }}>
        {showGrid && <CartesianGrid vertical={false} {...gridStyle} />}
        <XAxis dataKey="x" tickFormatter={xFormat} {...axisStyle} />
        <YAxis width={44} domain={[Math.floor(lo - pad), Math.ceil(hi + pad)]} tickFormatter={yFormat} {...axisStyle} axisLine={false} />
        <Tooltip
          cursor={cursorLine}
          isAnimationActive={false}
          content={({ active, payload }): ReactNode => {
            const d = payload?.[0]?.payload as Candle | undefined;
            if (!active || !d) return null;
            const c = d.close >= d.open ? 'rgb(var(--gl-pos))' : 'rgb(var(--gl-neg))';
            return <ChartTooltip active label={xFormat ? xFormat(d.x) : d.x} payload={(['open', 'high', 'low', 'close'] as const).map((k) => ({ name: k, value: fmt(d[k]), color: c }))} />;
          }}
        />
        <Bar dataKey="range" shape={(p: unknown) => candle(p as ShapeProps)} isAnimationActive={animate} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
