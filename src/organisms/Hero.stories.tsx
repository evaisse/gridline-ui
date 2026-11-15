import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Tag } from '../atoms';
import { CodeBlock } from '../molecules';
import { ArrowRightIcon } from '../tokens/icons';
import { Hero } from './Hero';

const meta = {
  title: 'Organisms/Marketing/Hero', tags: ['page', 'text'], component: Hero, parameters: { layout: 'fullscreen' },
  args: {
    eyebrow: <Tag dot tone="info">Release 0.2</Tag>, title: 'Choose your dependencies on measurements, not on stars',
    lead: 'A registry that tests every package the same way and ranks it against its peers.',
    actions: <><Button variant="solid" icon={<ArrowRightIcon />}>Browse the catalogue</Button><Button>Read the method</Button></>, note: 'Free for public packages',
  },
} satisfies Meta<typeof Hero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Centred: Story = { args: { align: 'center' } };
export const WithMedia: Story = { args: { media: <CodeBlock title="terminal" code={'npm install --global gridline\ngridline measure ./my-package'} /> } };
