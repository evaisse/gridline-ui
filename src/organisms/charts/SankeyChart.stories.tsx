import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartFrame } from './Chart';
import { SankeyChart, type SankeyLink, type SankeyNode } from './SankeyChart';

const meta = { title: 'Organisms/Charts/SankeyChart', tags: ['data'], component: ChartFrame, decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>] } satisfies Meta<typeof ChartFrame>;
export default meta;
type Story = StoryObj<typeof meta>;

const nodes: SankeyNode[] = [
  { key: 'npm', label: 'Registry', color: 1 }, { key: 'cdn', label: 'CDN', color: 2 }, { key: 'git', label: 'Git', color: 3 },
  { key: 'node', label: 'Node', color: 1 }, { key: 'browser', label: 'Browser', color: 2 }, { key: 'edge', label: 'Edge', color: 4 },
];
const links: SankeyLink[] = [
  { source: 'npm', target: 'node', value: 320 }, { source: 'npm', target: 'edge', value: 60 },
  { source: 'cdn', target: 'browser', value: 210 }, { source: 'cdn', target: 'edge', value: 40 },
  { source: 'git', target: 'node', value: 70 }, { source: 'git', target: 'browser', value: 25 },
];

export const Default: Story = { render: () => <ChartFrame title="Installs by source and runtime" meta="k / week" height={320} dots={false}><SankeyChart nodes={nodes} links={links} valueFormat={(v) => `${v}k`} /></ChartFrame> };
export const ThreeStages: Story = {
  render: () => (
    <ChartFrame title="Issue triage" height={320} dots={false}>
      <SankeyChart
        nodes={[{ key: 'new', label: 'New' }, { key: 'bug', label: 'Bug', color: 4 }, { key: 'ask', label: 'Question', color: 2 }, { key: 'fixed', label: 'Fixed', color: 3 }, { key: 'open', label: 'Open', color: 5 }, { key: 'closed', label: 'Answered', color: 6 }]}
        links={[{ source: 'new', target: 'bug', value: 48 }, { source: 'new', target: 'ask', value: 30 }, { source: 'bug', target: 'fixed', value: 31 }, { source: 'bug', target: 'open', value: 17 }, { source: 'ask', target: 'closed', value: 30 }]}
      />
    </ChartFrame>
  ),
};
