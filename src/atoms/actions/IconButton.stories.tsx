import type { Meta, StoryObj } from '@storybook/react-vite';
import { PencilIcon, TrashIcon, XIcon } from '../../tokens/icons';
import { IconButton } from './IconButton';

const meta = { title: 'Atoms/Actions/IconButton', tags: ['action'], component: IconButton, args: { label: 'Edit', icon: <PencilIcon /> } } satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {};
export const Ghost: Story = { args: { variant: 'ghost', label: 'Close', icon: <XIcon /> } };
export const Solid: Story = { args: { variant: 'solid', label: 'Delete', icon: <TrashIcon /> } };
export const Small: Story = { args: { size: 'sm' } };
export const Disabled: Story = { args: { disabled: true } };
