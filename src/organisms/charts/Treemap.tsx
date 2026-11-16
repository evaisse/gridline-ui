import type { ReactElement, ReactNode } from 'react';
import { ResponsiveContainer, Tooltip, Treemap as RTreemap } from 'recharts';
import { seriesColor } from '../../tokens/series';
import { ChartTooltip } from './Chart';
import './Treemap.css';

export interface TreemapNode {
  [key: string]: unknown;
  name: string;
  /** Size of a leaf. Parents take the sum of their children. */
  value?: number;
  children?: TreemapNode[];
}

export interface TreemapProps {
  /** Top-level groups; each gets its own data colour. */
  data: TreemapNode[];
  valueFormat?: (value: number) => string;
  animate?: boolean;
}

interface ContentProps { x: number; y: number; width: number; height: number; depth: number; name: string; value: number; root?: { name: string } }

/** Nested rectangles sized by value, tinted by their top-level group. */
export function Treemap({ data, valueFormat, animate = false }: TreemapProps) {
  const fmt = (v: number) => (valueFormat ? valueFormat(v) : String(v));
  const groupOf = (name: string) => Math.max(0, data.findIndex((d) => d.name === name));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RTreemap
        data={data}
        dataKey="value"
        nameKey="name"
        aspectRatio={4 / 3}
        isAnimationActive={animate}
        content={(p: unknown): ReactElement => {
          const { x, y, width, height, depth, name, value, root } = p as ContentProps;
          if (depth === 0) return <g />;
          const group = groupOf(depth === 1 ? name : root?.name ?? name);
          const room = width > 56 && height > 28;
          return (
            <g>
              <rect x={x} y={y} width={width} height={height} fill={depth === 1 ? 'none' : seriesColor(undefined, group, 0.22)} stroke={depth === 1 ? seriesColor(undefined, group) : 'var(--gl-paper)'} strokeWidth={depth === 1 ? 1 : 1} />
              {room && (depth > 1 || !data[group]?.children) && (
                <>
                  <text className="gl-treemap__name" x={x + 6} y={y + 14}>{name}</text>
                  <text className="gl-treemap__value" x={x + 6} y={y + 26}>{fmt(value)}</text>
                </>
              )}
              {room && depth === 1 && data[group]?.children && <text className="gl-treemap__group" x={x + 6} y={y + 14} fill={seriesColor(undefined, group)}>{name}</text>}
            </g>
          );
        }}
      >
        <Tooltip
          isAnimationActive={false}
          content={({ active, payload }): ReactNode => {
            const item = payload?.[0]?.payload as { name?: string; value?: number; root?: { name: string } } | undefined;
            if (!active || !item) return null;
            const g = groupOf(item.root?.name ?? item.name ?? '');
            return <ChartTooltip active label={item.root && item.root.name !== item.name ? `${item.root.name} / ${item.name}` : item.name} payload={[{ name: 'Size', value: fmt(item.value ?? 0), color: seriesColor(undefined, g) }]} />;
          }}
        />
      </RTreemap>
    </ResponsiveContainer>
  );
}
