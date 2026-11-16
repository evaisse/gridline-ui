import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarTemplate } from './CalendarTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Calendar', tags: ['page', 'date'],
  component: CalendarTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 48), mini: slot('mini calendar', 240), calendars: slot('calendars', 96), children: slot('scheduler', 400) },
} satisfies Meta<typeof CalendarTemplate>;
export default meta;

/** The skeleton with its slots. */
export const Slots: StoryObj<typeof meta> = {};
