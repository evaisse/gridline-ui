import type { Meta, StoryObj } from '@storybook/react-vite';
import { NativeSelect } from './NativeSelect';

const meta = {
  title: 'Atoms/NativeSelect',
  component: NativeSelect,
  args: { 'aria-label': 'Registry' },
  render: (args) => (
    <NativeSelect {...args}>
      <option>All registries</option>
      <option>Core</option>
      <option>Community</option>
    </NativeSelect>
  ),
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
} satisfies Meta<typeof NativeSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {};
export const Cell: Story = { args: { variant: 'cell' } };
