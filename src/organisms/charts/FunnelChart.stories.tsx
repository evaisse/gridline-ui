import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartFrame } from './Chart';
import { FunnelChart } from './FunnelChart';

const meta = { title: 'Organisms/Charts/FunnelChart', tags: ['data'], component: ChartFrame, decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>] } satisfies Meta<typeof ChartFrame>;
export default meta;
type Story = StoryObj<typeof meta>;

const stages = [
  { label: 'Visited docs', value: 12400 },
  { label: 'Installed', value: 5200 },
  { label: 'First import', value: 3100 },
  { label: 'In production', value: 1450 },
];
const k = (v: number) => v.toLocaleString('en-US');

export const Default: Story = { render: () => <ChartFrame title="Adoption of tessera" description="Unique visitors, last 30 days" height={300} dots={false}><FunnelChart data={stages} valueFormat={k} /></ChartFrame> };
export const SingleColour: Story = { render: () => <ChartFrame title="Adoption of tessera" height={300} dots={false}><FunnelChart data={stages.map((s) => ({ ...s, color: 2 as const }))} valueFormat={k} /></ChartFrame> };
export const NoLabels: Story = { render: () => <ChartFrame title="Release pipeline" description="Hover a stage for its share" height={220} dots={false}><FunnelChart labels={false} data={[{ label: 'Opened', value: 90 }, { label: 'Reviewed', value: 64 }, { label: 'Merged', value: 51 }]} /></ChartFrame> };
