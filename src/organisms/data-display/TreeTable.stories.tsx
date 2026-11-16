import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Numeric, Tag } from '../../atoms';
import { TreeTable, type TreeTableColumn } from './TreeTable';

interface Pkg {
  id: string;
  name: string;
  status: 'Stable' | 'Beta' | 'Deprecated';
  size: number;
  children?: Pkg[];
}

const rows: Pkg[] = [
  { id: 'tessera', name: 'tessera', status: 'Stable', size: 12.4, children: [
    { id: 'tessera-core', name: 'tessera-core', status: 'Stable', size: 8.1 },
    { id: 'tessera-cli', name: 'tessera-cli', status: 'Beta', size: 4.3, children: [
      { id: 'tessera-cli-init', name: 'init', status: 'Beta', size: 1.2 },
      { id: 'tessera-cli-pack', name: 'pack', status: 'Beta', size: 3.1 },
    ] },
  ] },
  { id: 'quillmark', name: 'quillmark', status: 'Stable', size: 31.0, children: [
    { id: 'quillmark-parse', name: 'quillmark-parse', status: 'Stable', size: 19.5 },
    { id: 'quillmark-render', name: 'quillmark-render', status: 'Stable', size: 11.5 },
  ] },
  { id: 'harrow', name: 'harrow', status: 'Deprecated', size: 7.9 },
];

const toneOf = { Stable: 'pos', Beta: 'info', Deprecated: 'warn' } as const;
const columns: TreeTableColumn<Pkg>[] = [
  { key: 'name', header: 'Package', render: (r) => r.name },
  { key: 'status', header: 'Status', width: '140px', render: (r) => <Tag dot tone={toneOf[r.status]}>{r.status}</Tag> },
  { key: 'size', header: 'Size', numeric: true, width: '120px', render: (r) => <Numeric unit="kB">{r.size.toFixed(1)}</Numeric> },
];

const meta = {
  title: 'Organisms/Data display/TreeTable', tags: ['table', 'tree'],
  component: TreeTable<Pkg>,
  args: { columns, rows, 'aria-label': 'Packages' },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof TreeTable<Pkg>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};
export const PartlyOpen: Story = { args: { defaultExpanded: ['tessera', 'tessera-cli'] } };

function Controlled() {
  const [open, setOpen] = useState<string[]>(['quillmark']);
  return (
    <div>
      <TreeTable<Pkg> columns={columns} rows={rows} expanded={open} onExpandedChange={setOpen} aria-label="Packages" />
      <p style={{ fontFamily: 'var(--gl-font-mono)', fontSize: 12 }}>Open: {open.join(', ') || 'none'}</p>
    </div>
  );
}
export const ControlledExpansion: Story = { render: () => <Controlled /> };
