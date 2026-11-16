import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Scheduler, type SchedulerEvent } from './Scheduler';

const at = (day: number, h: number, m = 0) => new Date(2026, 10, day, h, m);

const events: SchedulerEvent[] = [
  { id: 'e1', title: 'tessera release review', start: at(16, 9), end: at(16, 10, 30), tone: 'info' },
  { id: 'e2', title: 'Triage: castor issues', start: at(16, 10), end: at(16, 11), tone: 'warn' },
  { id: 'e3', title: 'quillmark sync', start: at(17, 13), end: at(17, 14), tone: 'pos' },
  { id: 'e4', title: 'Deprecation window', start: at(18, 9, 30), end: at(18, 12) },
  { id: 'e5', title: 'harrow incident review', start: at(19, 15), end: at(19, 16, 30), tone: 'neg' },
  { id: 'e6', title: 'Planning', start: at(20, 11), end: at(20, 12) },
  { id: 'e7', title: 'Changelog freeze', start: at(23, 9), end: at(23, 10), tone: 'warn' },
  { id: 'e8', title: 'sextant benchmark', start: at(23, 10), end: at(23, 11), tone: 'info' },
  { id: 'e9', title: 'Docs sprint', start: at(23, 14), end: at(23, 15) },
  { id: 'e10', title: 'Release train', start: at(23, 16), end: at(23, 17), tone: 'pos' },
  { id: 'e11', title: 'bramble 2.0 cut', start: at(30, 12), end: at(30, 13), tone: 'pos' },
];

const meta = {
  title: 'Organisms/Data display/Scheduler', tags: ['date', 'board'],
  component: Scheduler,
  args: { events, defaultDate: new Date(2026, 10, 16), today: new Date(2026, 10, 16), 'aria-label': 'Team schedule' },
} satisfies Meta<typeof Scheduler>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Week: Story = {};
export const Day: Story = { args: { defaultView: 'day', defaultDate: new Date(2026, 10, 16) } };
export const Month: Story = { args: { defaultView: 'month' } };

function Clickable() {
  const [picked, setPicked] = useState('Nothing selected');
  return (
    <div>
      <Scheduler events={events} defaultDate={new Date(2026, 10, 23)} today={new Date(2026, 10, 16)} defaultView="month" onEventClick={(e) => setPicked(e.title)} aria-label="Team schedule" />
      <p style={{ fontFamily: 'var(--gl-font-mono)', fontSize: 12 }}>Clicked: {picked}</p>
    </div>
  );
}
export const WithEventClick: Story = { render: () => <Clickable /> };
