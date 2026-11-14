import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Calendar } from './Calendar';

const meta = { title: 'Molecules/Calendar', component: Calendar } satisfies Meta<typeof Calendar>;
export default meta;
type Story = StoryObj<typeof meta>;

const month = new Date(2026, 10, 1);

export const Single: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 12));
    return <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={month} />;
  },
};
export const Range: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({ from: new Date(2026, 10, 9), to: new Date(2026, 10, 14) });
    return <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={month} />;
  },
};
