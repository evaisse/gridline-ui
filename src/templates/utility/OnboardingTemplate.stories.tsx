import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardingTemplate } from './OnboardingTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Utility/Onboarding', tags: ['page', 'steps'],
  component: OnboardingTemplate,
  parameters: { layout: 'fullscreen' },
  args: { brand: slot('brand', 32), steps: slot('progress', 32), children: slot('question', 200), footer: <div style={{ width: '100%' }}>{slot('actions', 32)}</div> },
} satisfies Meta<typeof OnboardingTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Onboarding for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
