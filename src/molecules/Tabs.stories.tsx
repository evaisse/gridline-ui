import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs } from './Tabs';

const items = [
  { id: 'coverage', label: 'Coverage' },
  { id: 'size', label: 'Size' },
  { id: 'build', label: 'Build time' },
];

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  args: { items, value: 'coverage', fill: true },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <Tabs {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Fill: Story = {};
export const Hug: Story = { args: { fill: false } };
