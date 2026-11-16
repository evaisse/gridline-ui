import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const box = <span style={{ display: 'block', width: 32, height: 32, border: '1px solid var(--gl-rule-strong)' }} />;
const meta = { title: 'Atoms/Data display/Badge', tags: ['status', 'number'], component: Badge, args: { content: 8, children: box } } satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Count: Story = {};
export const Overflow: Story = { args: { content: 128, tone: 'neg' } };
export const Dot: Story = { args: { content: undefined, tone: 'pos' } };
export const Inline: Story = { args: { children: undefined, content: 'New', tone: 'info' } };
