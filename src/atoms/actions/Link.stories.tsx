import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = { title: 'Atoms/Actions/Link', tags: ['action', 'text'], component: Link, args: { href: '#', children: 'Read the method' } } satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {};
export const Plain: Story = { args: { variant: 'plain' } };
export const External: Story = { args: { external: true, children: 'Changelog' } };
