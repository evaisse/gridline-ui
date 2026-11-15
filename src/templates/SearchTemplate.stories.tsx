import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchTemplate } from './SearchTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Search',
  component: SearchTemplate,
  parameters: { layout: 'fullscreen' },
  args: { search: slot('search', 96), filters: slot('filters', '100%'), summary: slot('summary', 24), children: slot('children', 480), footer: slot('footer', 32) },
} satisfies Meta<typeof SearchTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Search for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
