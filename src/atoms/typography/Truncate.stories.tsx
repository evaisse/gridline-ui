import type { Meta, StoryObj } from '@storybook/react-vite';
import { Truncate } from './Truncate';

const text = 'tessera is a streaming parser for large registry manifests; it validates entries as they arrive, reports the first failing path and never holds more than one record in memory.';
const meta = { title: 'Atoms/Typography/Truncate', tags: ['text'], component: Truncate, args: { children: text, style: { width: 320 } } } satisfies Meta<typeof Truncate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLine: Story = {};
export const ThreeLines: Story = { args: { lines: 3 } };
export const Short: Story = { args: { children: 'castor', lines: 2 } };
