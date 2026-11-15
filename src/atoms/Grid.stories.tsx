import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cell, Grid } from './Grid';
import { Label } from './Label';

const meta = {
  title: 'Atoms/Layout/Grid', tags: ['spacing', 'container'],
  component: Grid,
  args: { columns: 3, framed: true },
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

const cells = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2'];

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      {cells.map((id) => <Cell key={id}><Label>{id}</Label></Cell>)}
    </Grid>
  ),
};

/** An incomplete last row leaves paper, not a filled block. */
export const IncompleteRow: Story = {
  render: (args) => (
    <Grid {...args}>
      {cells.slice(0, 5).map((id) => <Cell key={id}><Label>{id}</Label></Cell>)}
    </Grid>
  ),
};

export const SpansAndTones: Story = {
  args: { columns: 4 },
  render: (args) => (
    <Grid {...args}>
      <Cell span={2} tone="invert"><Label tone="inherit">Invert · span 2</Label></Cell>
      <Cell tone="surface-1"><Label>Surface 1</Label></Cell>
      <Cell tone="surface-2"><Label>Surface 2</Label></Cell>
      <Cell><Label>Paper</Label></Cell>
      <Cell span={3} pad="none" className="gl-dots" style={{ minHeight: 72 }} />
    </Grid>
  ),
};

export const AutoFit: Story = {
  args: { columns: 'repeat(auto-fit, minmax(160px, 1fr))' },
  render: Default.render,
};
