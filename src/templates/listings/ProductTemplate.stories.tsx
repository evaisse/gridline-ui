import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductTemplate } from './ProductTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Listings/Product', tags: ['page', 'media'],
  component: ProductTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('breadcrumbs', 32), gallery: slot('gallery', 360), children: slot('options', 240), description: slot('description', 160), related: slot('related items', 160) },
} satisfies Meta<typeof ProductTemplate>;
export default meta;

/** The skeleton with its slots. */
export const Slots: StoryObj<typeof meta> = {};
