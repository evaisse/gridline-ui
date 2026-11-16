import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartFrame } from './Chart';
import { Gauge, type GaugeBand } from './Gauge';

const meta = { title: 'Organisms/Charts/Gauge', tags: ['data', 'kpi', 'status'], component: ChartFrame, decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>] } satisfies Meta<typeof ChartFrame>;
export default meta;
type Story = StoryObj<typeof meta>;

const coverage: GaugeBand[] = [{ to: 60, tone: 'neg' }, { to: 80, tone: 'warn' }, { to: 100, tone: 'pos' }];
const pct = (v: number) => `${v}%`;

export const Linear: Story = { render: () => <ChartFrame title="Test coverage" meta="tessera" height={120} dots={false}><Gauge variant="linear" label="Lines covered" value={72} bands={coverage} target={80} format={pct} /></ChartFrame> };
export const Arc: Story = { render: () => <ChartFrame title="Test coverage" meta="quillmark" height={200} dots={false}><Gauge variant="arc" label="Lines covered" value={91} bands={coverage} format={pct} /></ChartFrame> };
export const Radial: Story = { render: () => <ChartFrame title="Build budget" meta="castor" height={240} dots={false}><Gauge variant="radial" label="Of 400 kB" value={338} min={0} max={400} bands={[{ to: 240, tone: 'pos' }, { to: 320, tone: 'warn' }, { to: 400, tone: 'neg' }]} format={(v) => `${v}k`} /></ChartFrame> };
export const WithoutBands: Story = { render: () => <ChartFrame title="Release progress" height={120} dots={false}><Gauge label="Packages published" value={14} max={20} /></ChartFrame> };
