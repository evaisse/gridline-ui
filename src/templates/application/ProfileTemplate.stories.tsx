import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileTemplate } from './ProfileTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Profile', tags: ['page', 'identity'],
  component: ProfileTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('identity', 96), facts: slot('facts', 200), tabs: slot('tabs', 40), children: slot('activity', 280) },
} satisfies Meta<typeof ProfileTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Profile for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
