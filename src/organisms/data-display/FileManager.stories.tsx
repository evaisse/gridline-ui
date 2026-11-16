import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms';
import { FileManager, type FileItem } from './FileManager';

const meta = { title: 'Organisms/Data display/FileManager', tags: ['file', 'tree', 'list'], component: FileManager } satisfies Meta<typeof FileManager>;
export default meta;
type Story = StoryObj<typeof meta>;

const items: FileItem[] = [
  { id: 'tessera', name: 'tessera', kind: 'folder', children: [
    { id: 'tessera-src', name: 'src', kind: 'folder', children: [
      { id: 'index', name: 'index.ts', kind: 'file', size: 4200, modified: '2026-10-02' },
      { id: 'grid', name: 'grid.ts', kind: 'file', size: 18800, modified: '2026-10-09' },
    ] },
    { id: 'tessera-docs', name: 'docs', kind: 'folder', children: [] },
    { id: 'tessera-pkg', name: 'package.json', kind: 'file', size: 1180, modified: '2026-10-11' },
    { id: 'tessera-readme', name: 'README.md', kind: 'file', size: 9400, modified: '2026-09-28' },
  ] },
  { id: 'quillmark', name: 'quillmark', kind: 'folder', children: [
    { id: 'q-bench', name: 'bench.csv', kind: 'file', size: 2400000, modified: '2026-11-01' },
  ] },
  { id: 'castor-report', name: 'castor-report.pdf', kind: 'file', size: 5300000, modified: '2026-11-12' },
  { id: 'notes', name: 'notes.txt', kind: 'file', size: 640, modified: '2026-11-14' },
];

function Demo({ view }: { view?: 'list' | 'grid' }) {
  const [last, setLast] = useState('Nothing opened yet');
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <FileManager items={items} defaultFolderId="tessera" defaultView={view} actions={<Button size="sm">Upload</Button>} onOpen={(item) => setLast(`Opened ${item.name}`)} />
      <code style={{ fontSize: 11 }}>{last}</code>
    </div>
  );
}

export const List: Story = { args: { items }, render: () => <Demo /> };
export const Grid: Story = { args: { items }, render: () => <Demo view="grid" /> };
export const EmptyFolder: Story = { args: { items, defaultFolderId: 'tessera-docs' } };
