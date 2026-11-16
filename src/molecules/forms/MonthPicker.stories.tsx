import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPicker } from './MonthPicker';

const meta = { title: 'Molecules/Forms/MonthPicker', tags: ['input', 'date'], component: MonthPicker, args: { 'aria-label': 'Billing month' } } satisfies Meta<typeof MonthPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: new Date(2026, 10, 1) } };
export const Quarter: Story = { args: { granularity: 'quarter', defaultValue: new Date(2026, 3, 1), 'aria-label': 'Reporting quarter' } };
export const Year: Story = { args: { granularity: 'year', defaultValue: new Date(2026, 0, 1), 'aria-label': 'Release year' } };
export const Bounded: Story = { args: { minDate: new Date(2026, 2, 1), maxDate: new Date(2026, 8, 30), defaultValue: new Date(2026, 5, 1) } };
export const Controlled: Story = {
  render: function Render() {
    const [month, setMonth] = useState<Date | undefined>();
    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <MonthPicker aria-label="Invoice month" value={month} onChange={setMonth} />
        <code>{month ? month.toLocaleDateString('en', { month: 'long', year: 'numeric' }) : 'none'}</code>
      </div>
    );
  },
};
