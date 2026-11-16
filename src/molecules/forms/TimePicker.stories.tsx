import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker } from './TimePicker';

const meta = { title: 'Molecules/Forms/TimePicker', tags: ['input', 'date'], component: TimePicker, args: { 'aria-label': 'Release time' } } satisfies Meta<typeof TimePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: '14:30' } };
export const TwelveHour: Story = { args: { hour12: true, defaultValue: '09:15', minuteStep: 15 } };
export const Controlled: Story = {
  render: function Render() {
    const [time, setTime] = useState('06:00');
    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <TimePicker aria-label="Nightly build" value={time} onChange={setTime} minuteStep={30} />
        <code>{time || 'none'}</code>
      </div>
    );
  },
};
