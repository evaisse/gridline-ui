import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';

const meta = { title: 'Atoms/Data display/Kbd', tags: ['text'], component: Kbd, args: { children: 'K' } } satisfies Meta<typeof Kbd>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
export const Combination: StoryObj<typeof meta> = {
  render: () => <span style={{ display: 'inline-flex', gap: 4 }}><Kbd>Ctrl</Kbd><Kbd>Shift</Kbd><Kbd>P</Kbd></span>,
};
