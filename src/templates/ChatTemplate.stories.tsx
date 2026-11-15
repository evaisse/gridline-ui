import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatTemplate } from './ChatTemplate';

const slot = (name: string, height: number | string) => (
  <div className='gl-hatch' style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Chat', tags: ['page', 'chat', 'shell'],
  component: ChatTemplate,
  parameters: { layout: 'fullscreen' },
  args: { sidebar: slot('sidebar', '100%'), header: slot('header', 39), children: slot('children', '100%') },
} satisfies Meta<typeof ChatTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Assistant for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
