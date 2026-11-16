import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Tag } from '../atoms';
import { Calendar, CheckboxGroup } from '../molecules';
import { PageHeader, Scheduler, type SchedulerEvent } from '../organisms';
import { CalendarTemplate } from '../templates';
import { PlusIcon } from '../tokens/icons';

const at = (day: number, hour: number, minute = 0) => new Date(2026, 10, day, hour, minute);
const events: Array<SchedulerEvent & { calendar: string }> = [
  { id: '1', calendar: 'releases', title: 'tessera 4.3 freeze', start: at(16, 9), end: at(16, 10), tone: 'warn' },
  { id: '2', calendar: 'team', title: 'Standup', start: at(16, 10), end: at(16, 10, 30) },
  { id: '3', calendar: 'team', title: 'Parser size review', start: at(17, 13), end: at(17, 14, 30), tone: 'info' },
  { id: '4', calendar: 'releases', title: 'castor 0.8 deprecation', start: at(18, 9, 30), end: at(18, 11), tone: 'neg' },
  { id: '5', calendar: 'oncall', title: 'On call: R. Imai', start: at(19, 8), end: at(19, 12) },
  { id: '6', calendar: 'team', title: 'Retrospective', start: at(20, 15), end: at(20, 16), tone: 'pos' },
  { id: '7', calendar: 'releases', title: 'tessera 4.3 release', start: at(24, 10), end: at(24, 11), tone: 'pos' },
];
const calendars = [{ value: 'team', label: 'Team', description: 'Meetings and reviews' }, { value: 'releases', label: 'Releases', description: 'Freezes and publishes' }, { value: 'oncall', label: 'On call' }];
const today = at(16, 9);

function CalendarPage() {
  const [date, setDate] = useState(today);
  const [shown, setShown] = useState(['team', 'releases', 'oncall']);
  return (
    <CalendarTemplate
      header={<PageHeader title="Calendar" breadcrumb={[{ label: 'Tessera Labs', href: '#' }, { label: 'Calendar' }]} meta={<Tag>UTC</Tag>} actions={<Button variant="solid" icon={<PlusIcon />}>New event</Button>} />}
      mini={<Calendar mode="single" selected={date} month={date} onMonthChange={setDate} onSelect={(day) => day && setDate(day)} />}
      calendars={<div style={{ padding: 16 }}><CheckboxGroup legend="Calendars" options={calendars} value={shown} onChange={setShown} /></div>}
    >
      <Scheduler events={events.filter((event) => shown.includes(event.calendar))} date={date} onDateChange={setDate} defaultView="week" today={today} startHour={8} endHour={18} aria-label="Team calendar" />
    </CalendarTemplate>
  );
}

const meta = { title: 'Pages/Calendar', component: CalendarPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof CalendarPage>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
