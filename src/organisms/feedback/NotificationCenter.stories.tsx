import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationCenter, type NotificationItem } from './NotificationCenter';

const items: NotificationItem[] = [
  { id: '1', title: 'tessera@4.2.0 published', body: 'Build passed on all 5 targets.', time: '5 min ago', read: false, tone: 'pos' },
  { id: '2', title: 'Size regression in quillmark', body: 'The parser module grew by 6 kB.', time: '2 h ago', read: false, tone: 'warn' },
  { id: '3', title: 'Build failed on Node 22', time: 'Yesterday', read: true, tone: 'neg' },
  { id: '4', title: 'Maintainer added to castor', time: 'Nov 12', read: true },
];
const meta = { title: 'Organisms/Feedback/NotificationCenter', tags: ['message', 'list', 'popup'], component: NotificationCenter, args: { defaultItems: items }, decorators: [(Story) => <div style={{ display: 'flex', justifyContent: 'flex-end', minHeight: 420, padding: 16 }}><Story /></div>] } satisfies Meta<typeof NotificationCenter>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
export const AllRead: StoryObj<typeof meta> = { args: { defaultItems: items.map((n) => ({ ...n, read: true })) } };
export const Empty: StoryObj<typeof meta> = { args: { defaultItems: [] } };
