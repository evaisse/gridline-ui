import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitButton } from './SplitButton';

const items = [
  { id: 'draft', label: 'Publish as draft' },
  { id: 'schedule', label: 'Schedule release' },
  { id: 'private', label: 'Publish to private registry' },
  { id: 'yank', label: 'Yank version', disabled: true },
];
const meta = { title: 'Molecules/Actions/SplitButton', tags: ['action', 'menu'], component: SplitButton, args: { children: 'Publish tessera 2.4', items } } satisfies Meta<typeof SplitButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Ruled: Story = { args: { variant: 'ruled', children: 'Save' } };
export const Disabled: Story = { args: { disabled: true } };
