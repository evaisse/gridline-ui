import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

const box = (label: string) => <div key={label} style={{ padding: '8px 12px', border: '1px solid var(--gl-rule-strong)', background: 'var(--gl-surface-1)' }}>{label}</div>;
const meta = { title: 'Atoms/Layout/Stack', tags: ['spacing'], component: Stack, args: { children: ['One', 'Two', 'Three'].map(box) } } satisfies Meta<typeof Stack>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = {};
export const Row: Story = { args: { direction: 'row', gap: 2 } };
export const Spread: Story = { args: { direction: 'row', justify: 'space-between' } };
export const Wrapping: Story = { args: { direction: 'row', wrap: true, gap: 2, children: ['Parsing', 'Formatting', 'Testing', 'Tooling', 'Input / output', 'Metrics'].map(box) } };
