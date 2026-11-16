import type { Meta, StoryObj } from '@storybook/react-vite';
import { PivotGrid, type PivotRecord } from './PivotGrid';

const records: PivotRecord[] = [
  { package: 'tessera', channel: 'stable', region: 'EU', downloads: 1240, issues: 4 },
  { package: 'tessera', channel: 'beta', region: 'EU', downloads: 310, issues: 9 },
  { package: 'tessera', channel: 'stable', region: 'US', downloads: 1980, issues: 6 },
  { package: 'quillmark', channel: 'stable', region: 'EU', downloads: 860, issues: 2 },
  { package: 'quillmark', channel: 'stable', region: 'US', downloads: 1120, issues: 3 },
  { package: 'quillmark', channel: 'beta', region: 'US', downloads: 240, issues: 7 },
  { package: 'castor', channel: 'stable', region: 'EU', downloads: 540, issues: 1 },
  { package: 'castor', channel: 'beta', region: 'EU', downloads: 90, issues: 5 },
  { package: 'castor', channel: 'stable', region: 'US', downloads: 720, issues: 2 },
  { package: 'harrow', channel: 'stable', region: 'US', downloads: 130, issues: 11 },
];

const meta = {
  title: 'Organisms/Data display/PivotGrid', tags: ['table', 'data'],
  component: PivotGrid,
  args: { records, rows: 'package', columns: 'region', measure: { field: 'downloads', aggregation: 'sum' } },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof PivotGrid>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Sum: Story = {};
export const HeatTint: Story = { args: { heat: true, columns: 'channel' } };
export const Average: Story = { args: { measure: { field: 'issues', aggregation: 'avg' }, heat: true } };
export const Count: Story = { args: { measure: { field: 'downloads', aggregation: 'count' }, rows: 'region', columns: 'channel' } };
