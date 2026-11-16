import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonitoringTemplate } from './MonitoringTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Dashboards/Monitoring', tags: ['page', 'status', 'data'],
  component: MonitoringTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 32), banner: slot('banner', 48), stats: slot('stats', 96), panels: <>{slot('panel', 200)}{slot('panel', 200)}</>, children: slot('children', 200), aside: slot('aside', '100%') },
} satisfies Meta<typeof MonitoringTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Monitoring for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
