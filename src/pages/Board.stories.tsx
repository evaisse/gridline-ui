import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar, Button, Label, NativeSelect, Tag } from '../atoms';
import { AvatarGroup, SearchField } from '../molecules';
import { Kanban, PageHeader, Toolbar, ToolbarCell, type KanbanCard } from '../organisms';
import { BoardTemplate } from '../templates';
import { PlusIcon } from '../tokens/icons';

const columns = [
  { id: 'todo', title: 'To do' },
  { id: 'doing', title: 'In progress', tone: 'info' as const, limit: 3 },
  { id: 'review', title: 'In review', tone: 'warn' as const },
  { id: 'done', title: 'Done', tone: 'pos' as const },
];
const work = [
  { id: '1', column: 'todo', title: 'Report checksum mismatch on publish', kind: 'Bug', who: 'mo' },
  { id: '2', column: 'todo', title: 'Show deprecation notice on install', kind: 'Feature', who: 'lb' },
  { id: '3', column: 'todo', title: 'Document the measure command', kind: 'Docs', who: 'ri' },
  { id: '4', column: 'doing', title: 'Revoke rotated tokens immediately', kind: 'Bug', who: 'lb' },
  { id: '5', column: 'doing', title: 'Search scoped packages by short name', kind: 'Feature', who: 'mo' },
  { id: '6', column: 'review', title: 'Recount seats after a member is removed', kind: 'Bug', who: 'ri' },
  { id: '7', column: 'done', title: 'Order webhook retries', kind: 'Bug', who: 'ri' },
  { id: '8', column: 'done', title: 'Export the leaderboard as a file', kind: 'Feature', who: 'mo' },
];
const people = ['mo', 'lb', 'ri', 'ic', 'jw'].map((fallback) => ({ fallback }));

function Board() {
  const [items, setItems] = useState(work);
  const [kind, setKind] = useState('all');
  const [query, setQuery] = useState('');
  const visible = items.filter((item) => (kind === 'all' || item.kind === kind) && item.title.toLowerCase().includes(query.toLowerCase()));
  const cards: KanbanCard[] = visible.map((item) => ({ id: item.id, column: item.column, title: item.title, meta: <><Tag>{item.kind}</Tag><Avatar size="sm" fallback={item.who} /></> }));

  return (
    <BoardTemplate
      header={<PageHeader title="Release 4.3" breadcrumb={[{ label: 'tessera', href: '#' }, { label: 'Board' }]} meta={<Tag dot tone="info">Sprint 12</Tag>} actions={<><AvatarGroup people={people} /><Button variant="solid" icon={<PlusIcon />}>New card</Button></>} />}
      filters={
        <Toolbar style={{ flexWrap: 'wrap' }}>
          <ToolbarCell flush grow style={{ minWidth: 200 }}><SearchField placeholder="Search cards" value={query} onChange={(event) => setQuery(event.target.value)} /></ToolbarCell>
          <ToolbarCell flush style={{ width: 180 }}>
            <NativeSelect variant="cell" aria-label="Kind" value={kind} onChange={(event) => setKind(event.target.value)}><option value="all">All kinds</option><option>Bug</option><option>Feature</option><option>Docs</option></NativeSelect>
          </ToolbarCell>
          <ToolbarCell><Label>{visible.length} of {items.length}</Label></ToolbarCell>
        </Toolbar>
      }
      footer={<Label size="xs">Drag a card to another column to move it</Label>}
    >
      <Kanban columns={columns} cards={cards} onMove={(id, column) => setItems(items.map((item) => (item.id === id ? { ...item, column } : item)))} />
    </BoardTemplate>
  );
}

const meta = { title: 'Pages/Board', component: Board, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Board>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
