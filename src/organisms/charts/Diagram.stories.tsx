import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChartFrame } from './Chart';
import { Diagram, type DiagramEdge, type DiagramNode } from './Diagram';

const people: DiagramNode[] = [
  { id: 'lead', label: 'Maintainers council', meta: 'Governance' },
  { id: 'core', label: 'Core team', meta: '6 people' },
  { id: 'reg', label: 'Registry team', meta: '4 people' },
  { id: 'docs', label: 'Docs team', meta: '3 people' },
  { id: 'parser', label: 'Parser', meta: 'tessera' },
  { id: 'printer', label: 'Printer', meta: 'quillmark' },
  { id: 'mirror', label: 'Mirrors', meta: 'castor', tone: 'warn' },
  { id: 'index', label: 'Search index', meta: 'castor' },
];
const reports: DiagramEdge[] = [
  { from: 'lead', to: 'core' }, { from: 'lead', to: 'reg' }, { from: 'lead', to: 'docs' },
  { from: 'core', to: 'parser' }, { from: 'core', to: 'printer' }, { from: 'reg', to: 'mirror' }, { from: 'reg', to: 'index' },
];

const meta = { title: 'Organisms/Charts/Diagram', tags: ['data', 'tree'], component: Diagram, args: { nodes: people, edges: reports } } satisfies Meta<typeof Diagram>;
export default meta;
type Story = StoryObj<typeof meta>;

function Chart({ defaultSelected = null }: { defaultSelected?: string | null }) {
  const [picked, setPicked] = useState<string | null>(defaultSelected);
  return (
    <ChartFrame title="Project structure" description="Click a node, then use the arrow keys" height={380} footer={`Selected: ${picked ?? 'none'}`}>
      <Diagram nodes={people} edges={reports} selected={picked} onSelectedChange={setPicked} aria-label="Project structure" />
    </ChartFrame>
  );
}
export const OrgChart: Story = { render: () => <Chart /> };
export const WithSelection: Story = { render: () => <Chart defaultSelected="reg" /> };

const flow: DiagramNode[] = [
  { id: 'push', label: 'Push tag', x: 16, y: 16 },
  { id: 'build', label: 'Build', meta: 'matrix', x: 16, y: 120 },
  { id: 'test', label: 'Test', meta: '3 runtimes', x: 232, y: 120 },
  { id: 'pub', label: 'Publish', tone: 'pos', x: 232, y: 224 },
  { id: 'fail', label: 'Notify owners', tone: 'neg', x: 448, y: 224 },
];
export const Flowchart: Story = {
  render: () => (
    <ChartFrame title="Release pipeline" height={320}>
      <Diagram layout="manual" nodes={flow} edges={[{ from: 'push', to: 'build' }, { from: 'build', to: 'test' }, { from: 'test', to: 'pub' }, { from: 'test', to: 'fail' }]} aria-label="Release pipeline" />
    </ChartFrame>
  ),
};
