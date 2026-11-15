import type { Meta, StoryObj } from '@storybook/react-vite';
import { Highlight } from './Highlight';

const meta = { title: 'Atoms/Typography/Highlight', tags: ['text', 'search'], component: Highlight, args: { query: 'pars', children: 'An incremental parser toolkit: parse, print and diff syntax trees.' } } satisfies Meta<typeof Highlight>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoMatch: Story = { args: { query: 'lint' } };
