import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = { title: 'Atoms/Avatar', component: Avatar, args: { fallback: 'TL', size: 'md' } } satisfies Meta<typeof Avatar>;
export default meta;

export const Fallback: StoryObj<typeof meta> = {};
export const Sizes: StoryObj<typeof meta> = {
  render: () => <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Avatar fallback="a" size="sm" /><Avatar fallback="tl" /><Avatar fallback="GL" size="lg" /></div>,
};
