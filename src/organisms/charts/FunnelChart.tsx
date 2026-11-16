import type { ReactNode } from 'react';
import { Funnel, FunnelChart as RFunnelChart, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import { seriesColor, type ChartSeries } from '../../tokens/series';
import { ChartTooltip } from './Chart';
import './FunnelChart.css';

export interface FunnelStage extends Omit<ChartSeries, 'key'> {
  key?: string;
  value: number;
}

export interface FunnelChartProps {
  /** Stages from widest to narrowest. */
  data: FunnelStage[];
  valueFormat?: (value: number) => string;
  /** Print the stage name and value inside each stage. */
  labels?: boolean;
  animate?: boolean;
}

/** How many remain at each stage; the tooltip adds the share of the first stage. */
export function FunnelChart({ data, valueFormat, labels = true, animate = false }: FunnelChartProps) {
  const fmt = (v: number) => (valueFormat ? valueFormat(v) : String(v));
  const rows = data.map((d, i) => ({ name: d.label, value: d.value, text: `${d.label} · ${fmt(d.value)}`, fill: seriesColor(d, i, 0.85) }));
  const first = data[0]?.value || 1;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RFunnelChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        <Tooltip
          isAnimationActive={false}
          content={({ active, payload }): ReactNode => {
            const row = payload?.[0]?.payload as { name: string; value: number; fill: string } | undefined;
            if (!active || !row) return null;
            return <ChartTooltip active label={row.name} indicator="square" payload={[{ name: 'Count', value: fmt(row.value), color: row.fill }, { name: 'Of first', value: `${((row.value / first) * 100).toFixed(1)}%`, color: row.fill }]} />;
          }}
        />
        <Funnel dataKey="value" data={rows} stroke="var(--gl-paper)" strokeWidth={1} isAnimationActive={animate}>
          {labels && <LabelList dataKey="text" position="center" className="gl-funnel__label" />}
        </Funnel>
      </RFunnelChart>
    </ResponsiveContainer>
  );
}
