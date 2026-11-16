import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReportTemplate } from './ReportTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Dashboards/Report', tags: ['page', 'data', 'text'],
  component: ReportTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('title block', 96), actions: slot('actions', 32), summary: slot('summary', 80), children: <>{slot('commentary', 160)}{slot('chart', 220)}{slot('table', 160)}</>, footer: slot('sources', 32) },
} satisfies Meta<typeof ReportTemplate>;
export default meta;

/** The skeleton with its slots. */
export const Slots: StoryObj<typeof meta> = {};
