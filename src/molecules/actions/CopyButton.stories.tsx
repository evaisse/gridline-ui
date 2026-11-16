import type { Meta, StoryObj } from '@storybook/react-vite';
import { CopyButton } from './CopyButton';

const meta = { title: 'Molecules/Actions/CopyButton', tags: ['action'], component: CopyButton, args: { value: 'npm install tessera' } } satisfies Meta<typeof CopyButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Labelled: Story = { args: { children: 'Copy command', copiedLabel: 'Command copied', variant: 'solid' } };
