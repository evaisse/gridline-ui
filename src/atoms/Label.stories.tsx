import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  title: 'Atoms/Typography/Label', tags: ['text'],
  component: Label,
  args: { children: 'Release date', tone: 'muted', size: 'sm' },
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Ink: Story = { args: { tone: 'ink', children: 'Nov 12, 2026' } };
export const ExtraSmall: Story = { args: { size: 'xs', children: '/ 37' } };
