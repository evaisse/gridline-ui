import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangePicker, type DateRangeValue } from './DateRangePicker';

const meta = { title: 'Molecules/Forms/DateRangePicker', tags: ['input', 'date'], component: DateRangePicker, args: { 'aria-label': 'Reporting period' } } satisfies Meta<typeof DateRangePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: { from: new Date(2026, 10, 3), to: new Date(2026, 10, 9) } } };
export const TwoMonthsBounded: Story = { args: { numberOfMonths: 2, minDate: new Date(2026, 0, 1), maxDate: new Date(2026, 11, 31), defaultValue: { from: new Date(2026, 10, 24), to: new Date(2026, 11, 8) } } };
export const Controlled: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRangeValue>({ from: new Date(2026, 9, 1), to: new Date(2026, 9, 31) });
    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <DateRangePicker aria-label="Release window" value={range} onChange={setRange} />
        <code>{range.from?.toDateString() ?? 'none'} to {range.to?.toDateString() ?? 'none'}</code>
      </div>
    );
  },
};
