import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocsTemplate } from './DocsTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Docs', tags: ['page', 'text', 'tree'],
  component: DocsTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 48), nav: slot('nav', '100%'), children: slot('children', 480), toc: slot('toc', 200), footer: <div style={{ width: '100%' }}>{slot('footer', 32)}</div> },
} satisfies Meta<typeof DocsTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Documentation for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
