import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar, Tag } from '../atoms';
import { Kanban, type KanbanCard } from './Kanban';

const columns = [
  { id: 'todo', title: 'To do' },
  { id: 'doing', title: 'In progress', tone: 'info' as const, limit: 2 },
  { id: 'review', title: 'In review', tone: 'warn' as const },
  { id: 'done', title: 'Done', tone: 'pos' as const },
];
const card = (id: string, column: string, title: string, tag: string, who: string): KanbanCard => ({ id, column, title, meta: <><Tag>{tag}</Tag><Avatar size="sm" fallback={who} /></> });
const initial = [
  card('1', 'todo', 'Report checksum mismatch on publish', 'Bug', 'mo'),
  card('2', 'todo', 'Show deprecation notice on install', 'Feature', 'lb'),
  card('3', 'doing', 'Revoke rotated tokens immediately', 'Bug', 'lb'),
  card('4', 'doing', 'Search scoped packages by short name', 'Feature', 'mo'),
  card('5', 'doing', 'Order webhook retries', 'Bug', 'ri'),
  card('6', 'review', 'Recount seats after removal', 'Billing', 'ri'),
];

function Board({ movable = true }) {
  const [cards, setCards] = useState(initial);
  return <Kanban columns={columns} cards={cards} onMove={movable ? (id, column) => setCards(cards.map((entry) => (entry.id === id ? { ...entry, column } : entry))) : undefined} />;
}

const meta = { title: 'Organisms/Data display/Kanban', tags: ['board', 'list'], component: Board } satisfies Meta<typeof Board>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Drag a card to another column. "In progress" is above its limit of two. */
export const Draggable: Story = {};
export const ReadOnly: Story = { args: { movable: false } };
