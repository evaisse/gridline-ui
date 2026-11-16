import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityFeed } from './ActivityFeed';

const now = new Date(2026, 10, 16, 15, 0);
const at = (days: number, h: number, m: number) => new Date(2026, 10, 16 - days, h, m);
const entries = [
  { id: 'a', actor: 'Ines Varga', action: 'published', target: 'tessera@4.2.0', at: at(0, 14, 20), detail: 'Coverage up 2.1 points, build time unchanged.' },
  { id: 'b', actor: 'Tomas Brandt', action: 'commented on', target: '#312 parser size', at: at(0, 11, 5) },
  { id: 'c', actor: 'Mei Okafor', action: 'deprecated', target: 'castor@0.8.x', at: at(1, 17, 45) },
  { id: 'd', actor: 'Ines Varga', action: 'added a maintainer to', target: 'quillmark', at: at(1, 9, 30) },
  { id: 'e', actor: 'Tomas Brandt', action: 'opened', target: '#298 Node 22 build', at: at(6, 16, 10) },
];
const meta = { title: 'Organisms/Data display/ActivityFeed', tags: ['history', 'list'], component: ActivityFeed, args: { entries, now }, decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>] } satisfies Meta<typeof ActivityFeed>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
export const SingleDay: StoryObj<typeof meta> = { args: { entries: entries.slice(0, 2) } };
export const Empty: StoryObj<typeof meta> = { args: { entries: [] } };
