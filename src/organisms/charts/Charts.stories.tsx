import type { Meta, StoryObj } from '@storybook/react-vite';
import { Numeric, Label, Toggle } from '../../atoms';
import { ToggleGroup, ToggleGroupItem } from '../../molecules';
import type { ChartSeries } from '../../tokens/series';
import { AreaChart, BarChart, LineChart } from './CartesianCharts';
import { ChartFrame, ChartTooltip } from './Chart';
import { ColumnChart } from './ColumnChart';
import { PieChart, RadarChart, RadialChart } from './PolarCharts';
import { ScatterPlot } from './ScatterPlot';

const meta = { title: 'Organisms/Charts/Charts', tags: ['data', 'container'], component: ChartFrame, decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>] } satisfies Meta<typeof ChartFrame>;
export default meta;
type Story = StoryObj<typeof meta>;

const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const installs = months.map((month, i) => ({ month, node: [186, 305, 237, 273, 309, 344][i], browser: [80, 120, 150, 190, 170, 220][i], edge: [20, 34, 48, 61, 90, 118][i] }));
const series: ChartSeries[] = [{ key: 'node', label: 'Node' }, { key: 'browser', label: 'Browser' }, { key: 'edge', label: 'Edge' }];
const k = (value: number) => `${value}k`;

export const Area: Story = { render: () => <ChartFrame title="Weekly installs" description="By runtime, last six months" meta="Nov 2026" legend={series.slice(0, 2)}><AreaChart data={installs} xKey="month" series={series.slice(0, 2)} yFormat={k} /></ChartFrame> };
export const AreaStacked: Story = { render: () => <ChartFrame title="Weekly installs, stacked" legend={series}><AreaChart data={installs} xKey="month" series={series} stacked curve="monotone" yFormat={k} /></ChartFrame> };
export const AreaStep: Story = { render: () => <ChartFrame title="Published versions" footer="Step curves suit values that change at discrete moments."><AreaChart data={installs} xKey="month" series={[series[2]]} curve="step" /></ChartFrame> };

export const Bar: Story = { render: () => <ChartFrame title="Installs by runtime" legend={series.slice(0, 2)}><BarChart data={installs} xKey="month" series={series.slice(0, 2)} yFormat={k} /></ChartFrame> };
export const BarStacked: Story = { render: () => <ChartFrame title="Installs, stacked" legend={series}><BarChart data={installs} xKey="month" series={series} stacked yFormat={k} /></ChartFrame> };
export const BarHorizontal: Story = {
  render: () => (
    <ChartFrame title="Bundle size by module" meta="kB">
      <BarChart layout="horizontal" labels showGrid={false} data={[{ module: 'parser', size: 41.2 }, { module: 'printer', size: 18.7 }, { module: 'core', size: 12.4 }, { module: 'cli', size: 7.9 }]} xKey="module" series={[{ key: 'size', label: 'Size' }]} />
    </ChartFrame>
  ),
};

export const Line: Story = { render: () => <ChartFrame title="Installs over time" legend={series}><LineChart data={installs} xKey="month" series={series} yFormat={k} /></ChartFrame> };
export const LineWithDots: Story = { render: () => <ChartFrame title="Edge installs"><LineChart data={installs} xKey="month" series={[series[2]]} dots curve="monotone" yFormat={k} /></ChartFrame> };
export const LineStep: Story = { render: () => <ChartFrame title="Best score over time" description="Changes only when a new version ships"><LineChart data={installs} xKey="month" series={series.slice(0, 2)} curve="step" dots /></ChartFrame> };

const share = [{ key: 'node', label: 'Node', value: 344 }, { key: 'browser', label: 'Browser', value: 220 }, { key: 'edge', label: 'Edge', value: 118 }, { key: 'other', label: 'Other', value: 46, color: 8 as const }];

export const Pie: Story = { render: () => <ChartFrame title="Installs by runtime" legend={share} dots={false}><PieChart data={share} valueFormat={k} /></ChartFrame> };
export const Donut: Story = { render: () => <ChartFrame title="Installs by runtime" legend={share} dots={false}><PieChart data={share} donut valueFormat={k} center={<><Numeric variant="display" unit="k">728</Numeric><Label size="xs">Weekly installs</Label></>} /></ChartFrame> };
export const PieWithLabels: Story = { render: () => <ChartFrame title="Installs by runtime" dots={false}><PieChart data={share} labels valueFormat={k} /></ChartFrame> };

const axes = ['Coverage', 'Size', 'Build', 'Docs', 'Types', 'Issues'].map((axis, i) => ({ axis, tessera: [91, 62, 80, 74, 95, 68][i], harrow: [49, 88, 60, 40, 70, 82][i] }));
const radarSeries: ChartSeries[] = [{ key: 'tessera', label: 'tessera' }, { key: 'harrow', label: 'harrow' }];

export const Radar: Story = { render: () => <ChartFrame title="Package profile" legend={radarSeries} dots={false} height={300}><RadarChart data={axes} axisKey="axis" series={radarSeries} /></ChartFrame> };
export const RadarCircular: Story = { render: () => <ChartFrame title="Package profile" legend={radarSeries} dots={false} height={300}><RadarChart data={axes} axisKey="axis" series={radarSeries} circular filled={false} /></ChartFrame> };

const rings = [{ key: 'core', label: 'core', value: 91 }, { key: 'parser', label: 'parser', value: 74 }, { key: 'cli', label: 'cli', value: 49 }];

export const Radial: Story = { render: () => <ChartFrame title="Coverage by module" legend={rings} dots={false}><RadialChart data={rings} valueFormat={(v) => `${v}%`} /></ChartFrame> };
export const RadialGauge: Story = { render: () => <ChartFrame title="Overall coverage" dots={false} height={220}><RadialChart sweep={180} data={[{ key: 'all', label: 'Coverage', value: 68.5, color: 3 }]} center={<><Numeric variant="display" unit="%">68.5</Numeric><Label size="xs">of lines</Label></>} /></ChartFrame> };

/** The three tooltip markers. Charts take `tooltip={{ indicator }}`. */
export const Tooltips: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {(['square', 'line', 'dashed'] as const).map((indicator) => (
        <ChartTooltip key={indicator} active label="Nov 2026" indicator={indicator} series={series} valueFormatter={k} payload={[{ dataKey: 'node', value: 344, color: 'rgb(var(--gl-data-1))' }, { dataKey: 'browser', value: 220, color: 'rgb(var(--gl-data-2))' }]} />
      ))}
      <ChartTooltip active hideLabel series={series} payload={[{ dataKey: 'edge', value: 118, color: 'rgb(var(--gl-data-3))' }]} />
    </div>
  ),
};

const packages = [['tessera', 71.3], ['castor', 70.4], ['marlin', 66.8], ['sextant', 65.0], ['quillmark', 62.5], ['lumen-fmt', 61.3], ['bramble', 59.8], ['ostinato', 59.0], ['fennel-io', 56.5], ['harrow', 43.4], ['juniper', 29.8]] as const;

/** Edge-to-edge ranked columns on the dotted field. Values sit on the columns, so there is no axis. */
export const Columns: Story = {
  render: () => (
    <ChartFrame title="Quality index" meta="Nov 11, 2026" height={320} toolbar={<><ToggleGroup type="single" defaultValue="score" aria-label="Metric"><ToggleGroupItem value="score">Score</ToggleGroupItem><ToggleGroupItem value="cost">Cost</ToggleGroupItem><ToggleGroupItem value="latency">Latency</ToggleGroupItem></ToggleGroup></>} footer="Showing the best release from each maintainer.">
      <ColumnChart max={100} format={(v) => `${v.toFixed(2)}%`} columns={packages.map(([label, value]) => ({ key: label, label, value }))} />
    </ChartFrame>
  ),
};

const field = [
  { key: 'stable', label: 'Stable', points: [{ x: 4.1, y: 70, label: 'tessera' }, { x: 9.8, y: 68, label: 'castor' }, { x: 14.6, y: 71, label: 'marlin' }, { x: 2.2, y: 61, label: 'sextant' }] },
  { key: 'beta', label: 'Beta', points: [{ x: 6.5, y: 58, label: 'lumen-fmt' }, { x: 18.9, y: 62, label: 'bramble' }, { x: 22.4, y: 49, label: 'juniper' }] },
];
const usd = (v: number) => `$${v.toFixed(0)}`;
const pct = (v: number) => `${v}%`;

/** Score against cost. The cheap-and-good quadrant is washed green, the costly-and-weak one red. */
export const ScatterQuadrants: Story = {
  render: () => (
    <ChartFrame title="Score against cost" description="Each mark is one package" legend={field} height={340} toolbar={<Toggle size="sm" defaultPressed>Frontier</Toggle>}>
      <ScatterPlot series={field} xLabel="Cost" yLabel="Score" xFormat={usd} yFormat={pct} xDomain={[0, 25]} yDomain={[40, 80]} quadrants={{ x: 12.5, y: 60, good: 'Efficient', bad: 'Inefficient' }} />
    </ChartFrame>
  ),
};

const effort = [
  { key: 'tessera', label: 'tessera', points: [{ x: 4, y: 56, label: 'Low' }, { x: 11, y: 68, label: 'High' }, { x: 26, y: 70, label: 'Max' }] },
  { key: 'castor', label: 'castor', points: [{ x: 4.2, y: 58, label: 'Low' }, { x: 8.6, y: 62.5, label: 'High' }, { x: 22, y: 65, label: 'Max' }] },
  { key: 'harrow', label: 'harrow', color: 5 as const, points: [{ x: 0.4, y: 54.5, label: 'Low' }, { x: 0.5, y: 57, label: 'High' }, { x: 0.7, y: 61, label: 'Max' }] },
];

/** Connected points show a path: here, three effort settings per package. */
export const ScatterConnected: Story = {
  render: () => (
    <ChartFrame title="Effort settings" description="Score at three effort levels" legend={effort} height={340} footer="Costs are per full run.">
      <ScatterPlot series={effort} connected xLabel="Cost" yLabel="Score" xFormat={usd} yFormat={pct} xDomain={[0, 28]} yDomain={[52, 72]} />
    </ChartFrame>
  ),
};
