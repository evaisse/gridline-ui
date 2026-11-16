import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Numeric, Label } from '../../atoms';
import { DashboardLayout, type DashboardTile } from './DashboardLayout';

const stat = (value: number, unit: string) => <div style={{ display: 'grid', gap: 4 }}><Numeric variant="display">{value.toLocaleString('en')}</Numeric><Label>{unit}</Label></div>;
const rows = (items: string[]) => <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;

const initial: DashboardTile[] = [
  { id: 'installs', title: 'Installs today', content: stat(48210, 'installs') },
  { id: 'publish', title: 'Publishes', content: stat(312, 'versions') },
  { id: 'errors', title: 'Failed installs', content: stat(27, 'last hour') },
  { id: 'latency', title: 'Registry latency', content: stat(84, 'ms p95') },
  { id: 'top', title: 'Top packages', colSpan: 2, rowSpan: 2, content: rows(['tessera 18,402', 'quillmark 11,950', 'castor 6,318', 'ferrule 4,077', 'lintel 3,260']) },
  { id: 'events', title: 'Recent events', colSpan: 2, rowSpan: 2, content: rows(['castor 2.4.0 published', 'Token rotated for quillmark', 'Mirror SIN back online', 'tessera 5.1.2 yanked']) },
];

function Board({ editable = true, columns = 4 }: { editable?: boolean; columns?: number }) {
  const [tiles, setTiles] = useState(initial);
  return <DashboardLayout tiles={tiles} columns={columns} onTilesChange={editable ? setTiles : undefined} />;
}

const meta = { title: 'Organisms/Layout/DashboardLayout', tags: ['container', 'board'], component: Board, parameters: { layout: 'fullscreen' }, decorators: [(Story) => <div style={{ padding: 16 }}><Story /></div>] } satisfies Meta<typeof Board>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Drag a header grip to reorder, or focus it and use the arrow keys. The expand button sets column and row spans. */
export const Editable: Story = {};
export const Fixed: Story = { args: { editable: false } };
export const ThreeColumns: Story = { args: { columns: 3 } };
