import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta = { title: 'Atoms/Actions/Toggle', tags: ['action', 'toggle'], component: Toggle, args: { children: 'Log scale', defaultPressed: true } } satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Pressed: Story = {};
export const Unpressed: Story = { args: { defaultPressed: false } };
export const Small: Story = { args: { size: 'sm' } };
