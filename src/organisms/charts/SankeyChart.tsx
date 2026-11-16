import type { ReactElement, ReactNode, SVGProps } from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';
import { seriesColor } from '../../tokens/series';
import { ChartTooltip } from './Chart';
import './SankeyChart.css';

export interface SankeyNode {
  key: string;
  label: string;
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export interface SankeyLink {
  /** `key` of the node the flow leaves. */
  source: string;
  /** `key` of the node the flow reaches. */
  target: string;
  value: number;
}

export interface SankeyChartProps {
  nodes: SankeyNode[];
  links: SankeyLink[];
  valueFormat?: (value: number) => string;
}

interface NodeRenderProps { x: number; y: number; width: number; height: number; index: number; payload: { name: string; value: number } }
interface LinkRenderProps { sourceX: number; targetX: number; sourceY: number; targetY: number; sourceControlX: number; targetControlX: number; linkWidth: number; index: number; payload: { source: { name: string }; target: { name: string } } }

/** Flows between stages, drawn as bands sized by quantity and tinted by their source. */
export function SankeyChart({ nodes, links, valueFormat }: SankeyChartProps) {
  const fmt = (v: number) => (valueFormat ? valueFormat(v) : String(v));
  const index = new Map(nodes.map((n, i) => [n.key, i]));
  const colorOf = (i: number, alpha?: number) => seriesColor(nodes[i], i, alpha);
  const data = {
    nodes: nodes.map((n) => ({ name: n.label })),
    links: links.filter((l) => index.has(l.source) && index.has(l.target)).map((l) => ({ source: index.get(l.source)!, target: index.get(l.target)!, value: l.value })),
  };
  const byName = (name: string) => nodes.findIndex((n) => n.label === name);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Sankey
        data={data}
        nodeWidth={10}
        nodePadding={18}
        margin={{ top: 12, right: 96, bottom: 12, left: 8 }}
        node={(p: unknown): ReactNode => {
          const { x, y, width, height, index: i, payload } = p as NodeRenderProps;
          const onRight = x + width > 200;
          return (
            <g>
              <rect x={x} y={y} width={width} height={height} fill={colorOf(i)} />
              <text className="gl-sankey__label" x={onRight && i >= nodes.length / 2 ? x - 6 : x + width + 6} y={y + height / 2} textAnchor={onRight && i >= nodes.length / 2 ? 'end' : 'start'} dominantBaseline="middle">{payload.name}</text>
            </g>
          );
        }}
        link={(p: unknown): ReactElement<SVGProps<SVGPathElement>> => {
          const l = p as LinkRenderProps;
          const d = `M${l.sourceX},${l.sourceY} C${l.sourceControlX},${l.sourceY} ${l.targetControlX},${l.targetY} ${l.targetX},${l.targetY}`;
          return <path d={d} fill="none" stroke={colorOf(Math.max(0, byName(l.payload.source.name)), 0.3)} strokeWidth={l.linkWidth} className="gl-sankey__link" />;
        }}
      >
        <Tooltip
          isAnimationActive={false}
          content={({ active, payload }): ReactNode => {
            const item = payload?.[0]?.payload as { value?: number; name?: string; source?: { name: string }; target?: { name: string } } | undefined;
            if (!active || !item) return null;
            const isLink = item.source && item.target;
            return <ChartTooltip active label={isLink ? `${item.source!.name} → ${item.target!.name}` : item.name} payload={[{ name: 'Flow', value: fmt(item.value ?? 0), color: 'var(--gl-ink-3)' }]} />;
          }}
        />
      </Sankey>
    </ResponsiveContainer>
  );
}
