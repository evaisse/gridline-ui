import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Organisms/DatePicker',
  component: DatePicker,
  args: { 'aria-label': 'Release date' },
  render: function Render(args) {
    const [date, setDate] = useState<Date | undefined>(args.value);
    return <div style={{ maxWidth: 220, minHeight: 340 }}><DatePicker {...args} value={date} onValueChange={setDate} /></div>;
  },
} satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithValue: Story = { args: { value: new Date(2026, 10, 12) } };
