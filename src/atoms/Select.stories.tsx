import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  args: { 'aria-label': 'Registry' },
  render: (args) => (
    <Select {...args}>
      <option>All registries</option>
      <option>Core</option>
      <option>Community</option>
    </Select>
  ),
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {};
export const Cell: Story = { args: { variant: 'cell' } };
