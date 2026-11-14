import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = { title: 'Atoms/Switch', component: Switch, args: { 'aria-label': 'Log scale', defaultChecked: true } } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};
export const Off: Story = { args: { defaultChecked: false } };
export const Disabled: Story = { args: { disabled: true } };
