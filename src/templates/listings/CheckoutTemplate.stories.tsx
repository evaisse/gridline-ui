import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckoutTemplate } from './CheckoutTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Listings/Checkout', tags: ['page', 'form', 'number'],
  component: CheckoutTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 48), children: <>{slot('contact', 120)}{slot('shipping', 160)}{slot('payment', 160)}</>, summary: slot('summary', 240), footer: slot('footer', 32) },
} satisfies Meta<typeof CheckoutTemplate>;
export default meta;

/** The skeleton with its slots. */
export const Slots: StoryObj<typeof meta> = {};
