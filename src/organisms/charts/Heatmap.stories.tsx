import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartFrame } from './Chart';
import { Heatmap } from './Heatmap';

const meta = { title: 'Organisms/Charts/Heatmap', tags: ['data'], component: ChartFrame, decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>] } satisfies Meta<typeof ChartFrame>;
export default meta;
type Story = StoryObj<typeof meta>;

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = ['00', '04', '08', '12', '16', '20'];
const activity = days.map((_, r) => hours.map((__, c) => Math.round(((Math.sin(r * 1.7 + c * 0.9) + 1) / 2) * (c >= 2 && c <= 4 && r < 5 ? 90 : 30))));

export const Default: Story = { render: () => <ChartFrame title="Publishes by hour" description="Last four weeks, UTC" height={280} dots={false}><Heatmap values={activity} rowLabels={days} columnLabels={hours} valueLabel="Publishes" /></ChartFrame> };
export const WithValues: Story = { render: () => <ChartFrame title="Publishes by hour" height={280} dots={false}><Heatmap values={activity} rowLabels={days} columnLabels={hours} color={3} showValues valueLabel="Publishes" /></ChartFrame> };
export const ActivityGraph: Story = { render: () => <ChartFrame title="Commits per week" description="Gaps are weeks without data" height={140} dots={false}><Heatmap values={[0, 1, 2, 3, 4, 5, 6].map((r) => Array.from({ length: 26 }, (_, c) => ((r * 7 + c * 3) % 11 === 0 ? null : (r * 5 + c * 13) % 9)))} rowLabels={['M', '', 'W', '', 'F', '', 'S']} color={2} valueLabel="Commits" /></ChartFrame> };
