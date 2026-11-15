import type { Meta, StoryObj } from '@storybook/react-vite';
import { Numeric, Tag } from '../atoms';
import { DataTable, type Column } from './DataTable';

interface Row {
  name: string;
  status: 'Stable' | 'Beta' | 'Deprecated';
  coverage: number;
  size: number;
}

const rows: Row[] = [
  { name: 'tessera', status: 'Stable', coverage: 91.4, size: 12.4 },
  { name: 'lumen-fmt', status: 'Beta', coverage: 73.6, size: 41.2 },
  { name: 'harrow', status: 'Deprecated', coverage: 48.9, size: 7.9 },
  { name: 'sextant', status: 'Stable', coverage: 66.1, size: 18.7 },
  { name: 'castor', status: 'Stable', coverage: 81.0, size: 22.3 },
  { name: 'bramble', status: 'Beta', coverage: 59.2, size: 9.6 },
  { name: 'marlin', status: 'Stable', coverage: 77.5, size: 31.0 },
];

const toneOf = { Stable: 'pos', Beta: 'info', Deprecated: 'warn' } as const;

const columns: Column<Row>[] = [
  { key: 'name', header: 'Package', render: (row) => row.name, sortValue: (row) => row.name },
  { key: 'status', header: 'Status', width: '140px', render: (row) => <Tag dot tone={toneOf[row.status]}>{row.status}</Tag> },
  { key: 'coverage', header: 'Coverage', numeric: true, width: '120px', render: (row) => <Numeric unit="%">{row.coverage.toFixed(1)}</Numeric>, sortValue: (row) => row.coverage },
  { key: 'size', header: 'Size', numeric: true, width: '120px', render: (row) => <Numeric unit="kB">{row.size.toFixed(1)}</Numeric>, sortValue: (row) => row.size },
];

const meta = {
  title: 'Organisms/Data display/DataTable', tags: ['table', 'data'],
  component: DataTable<Row>,
  args: { columns, rows, rowKey: (row: Row) => row.name },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof DataTable<Row>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Sorted by coverage, with a rank column and the top three rows tinted. */
export const Leaderboard: Story = { args: { ranked: true, highlightTop: 3, defaultSort: { key: 'coverage', direction: 'desc' } } };
export const SelectableAndPaged: Story = { args: { selectable: true, pageSize: 4 } };
