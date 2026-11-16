import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListingTemplate } from './ListingTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Listings/Listing', tags: ['page', 'list'],
  component: ListingTemplate,
  parameters: { layout: 'fullscreen' },
  args: { nav: slot('nav', 32), header: slot('header', 96), toolbar: slot('toolbar', 40), children: slot('children', 480), footer: slot('footer', 32) },
} satisfies Meta<typeof ListingTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Products for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
