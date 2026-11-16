import type { Meta, StoryObj } from '@storybook/react-vite';
import { PricingTemplate } from './PricingTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Marketing/Pricing', tags: ['page', 'data'],
  component: PricingTemplate,
  parameters: { layout: 'fullscreen' },
  args: { nav: slot('nav', 48), header: slot('heading', 120), plans: slot('plans', 240), comparison: slot('comparison', 200), faq: slot('questions', 160), footer: slot('footer', 48) },
} satisfies Meta<typeof PricingTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Pricing for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
