import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardTemplate } from './DashboardTemplate';

const slot = (name: string, height: number | string) => (
  <div className='gl-hatch' style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Dashboard',
  component: DashboardTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 32), stats: slot('stats', 96), charts: <>{slot('chart', 220)}{slot('chart', 220)}</>, children: slot('children', 200) },
} satisfies Meta<typeof DashboardTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Dashboard for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
