import type { Meta, StoryObj } from '@storybook/react-vite';
import { WizardTemplate } from './WizardTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Wizard', tags: ['page', 'steps', 'form'],
  component: WizardTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 48), steps: slot('steps', 40), children: slot('form step', 240), footer: slot('actions', 32) },
} satisfies Meta<typeof WizardTemplate>;
export default meta;

/** The skeleton with its slots. */
export const Slots: StoryObj<typeof meta> = {};
