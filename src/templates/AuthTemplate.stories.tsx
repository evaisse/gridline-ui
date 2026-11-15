import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthTemplate } from './AuthTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Utility/Auth', tags: ['page', 'auth'],
  component: AuthTemplate,
  parameters: { layout: 'fullscreen' },
  args: { brand: slot('brand', 24), children: <div style={{ width: 360 }}>{slot('children', 360)}</div>, aside: slot('aside', 320), footer: slot('footer', 24) },
} satisfies Meta<typeof AuthTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Sign in for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
