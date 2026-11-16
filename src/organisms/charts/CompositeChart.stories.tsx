import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartFrame } from './Chart';
import { CompositeChart, type CompositeSeries } from './CompositeChart';

const meta = { title: 'Organisms/Charts/CompositeChart', tags: ['data'], component: ChartFrame, decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>] } satisfies Meta<typeof ChartFrame>;
export default meta;
type Story = StoryObj<typeof meta>;

const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const data = months.map((month, i) => ({ month, installs: [186, 305, 237, 273, 309, 344][i], target: [200, 220, 250, 280, 300, 320][i], issues: [40, 52, 47, 61, 58, 66][i] }));
const k = (v: number) => `${v}k`;

const barLine: CompositeSeries[] = [{ key: 'installs', label: 'Installs', type: 'bar' }, { key: 'target', label: 'Target', type: 'line', color: 4 }];
const all: CompositeSeries[] = [{ key: 'installs', label: 'Installs', type: 'bar' }, { key: 'issues', label: 'Open issues', type: 'area', color: 2 }, { key: 'target', label: 'Target', type: 'line', color: 4 }];

export const BarsAndLine: Story = { render: () => <ChartFrame title="Installs against target" legend={barLine} height={280}><CompositeChart data={data} xKey="month" series={barLine} yFormat={k} /></ChartFrame> };
export const BarsAreaLine: Story = { render: () => <ChartFrame title="Installs, issues and target" legend={all} height={280}><CompositeChart data={data} xKey="month" series={all} /></ChartFrame> };
export const AreaAndLine: Story = { render: () => <ChartFrame title="Issues against target" height={240}><CompositeChart data={data} xKey="month" showGrid={false} series={[{ key: 'issues', label: 'Open issues', type: 'area' }, { key: 'target', label: 'Target', type: 'line', color: 4 }]} /></ChartFrame> };
