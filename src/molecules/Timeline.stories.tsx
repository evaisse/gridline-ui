import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';

const events = [
  { id: 'a', title: 'Version 4.2.0 published', time: 'Nov 12', tone: 'pos' as const, children: 'Coverage up 2.1 points, build time unchanged.' },
  { id: 'b', title: 'Size regression detected', time: 'Nov 09', tone: 'warn' as const, children: 'The parser module grew by 6 kB between two commits.' },
  { id: 'c', title: 'Maintainer added', time: 'Nov 02' },
  { id: 'd', title: 'Build failed on Node 22', time: 'Oct 28', tone: 'neg' as const },
];
const meta = { title: 'Molecules/Data display/Timeline', tags: ['history', 'list'], component: Timeline, args: { events }, decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>] } satisfies Meta<typeof Timeline>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
