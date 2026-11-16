import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueueTemplate } from './QueueTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Queue', tags: ['page', 'list', 'kpi'],
  component: QueueTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 32), stats: slot('stats', 96), charts: <>{slot('chart', 200)}{slot('chart', 200)}</>, toolbar: slot('toolbar', 40), children: slot('children', 360), aside: slot('aside', '100%') },
} satisfies Meta<typeof QueueTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Tickets for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
