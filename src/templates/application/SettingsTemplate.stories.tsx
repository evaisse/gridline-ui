import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsTemplate } from './SettingsTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Settings', tags: ['page', 'form'],
  component: SettingsTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 96), nav: slot('nav', '100%'), children: <>{slot('section', 200)}{slot('section', 200)}</>, footer: <div style={{ width: '100%' }}>{slot('footer', 32)}</div> },
} satisfies Meta<typeof SettingsTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Settings for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
