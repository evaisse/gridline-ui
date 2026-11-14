import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from './Select';

const meta = {
  title: 'Molecules/Select',
  component: Select,
  args: { placeholder: 'Pick a category', 'aria-label': 'Category', children: null },
  render: (args) => (
    <Select {...args}>
      <SelectGroup>
        <SelectLabel>Language</SelectLabel>
        <SelectItem value="parsing">Parsing</SelectItem>
        <SelectItem value="formatting">Formatting</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Runtime</SelectLabel>
        <SelectItem value="io">Input / output</SelectItem>
        <SelectItem value="testing">Testing</SelectItem>
        <SelectItem value="legacy" disabled>Legacy</SelectItem>
      </SelectGroup>
    </Select>
  ),
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
export const Open: Story = { args: { defaultOpen: true, defaultValue: 'formatting' }, decorators: [(Story) => <div style={{ minHeight: 260 }}><Story /></div>] };
