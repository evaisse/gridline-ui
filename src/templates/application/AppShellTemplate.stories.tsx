import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShellTemplate } from './AppShellTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/AppShell', tags: ['page', 'shell'],
  component: AppShellTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 48), nav: slot('nav', '100%'), children: slot('content', 320), aside: slot('aside', '100%'), footer: slot('footer', 32) },
} satisfies Meta<typeof AppShellTemplate>;
export default meta;

/** The skeleton with its slots. */
export const Slots: StoryObj<typeof meta> = {};
