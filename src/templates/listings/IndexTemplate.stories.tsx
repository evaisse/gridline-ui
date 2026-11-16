import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndexTemplate } from './IndexTemplate';

const slot = (name: string, height: number) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>
    {name}
  </div>
);

const meta = {
  title: 'Templates/Listings/Index', tags: ['page', 'list'],
  component: IndexTemplate,
  parameters: { layout: 'fullscreen' },
  args: { hero: slot('hero', 160), nav: slot('nav', 320), bandTitle: 'Band title', children: slot('children', 320) },
} satisfies Meta<typeof IndexTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Catalogue for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
