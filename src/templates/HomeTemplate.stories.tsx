import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeTemplate } from './HomeTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Home',
  component: HomeTemplate,
  parameters: { layout: 'fullscreen' },
  args: { nav: slot('nav', 32), hero: <div style={{ width: '100%' }}>{slot('hero', 240)}</div>, heroAside: slot('hero aside', 240), children: <>{slot('section', 200)}{slot('section', 200)}</>, footer: slot('footer', 120) },
} satisfies Meta<typeof HomeTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Home for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
