import type { Meta, StoryObj } from '@storybook/react-vite';
import { Center } from './Center';

const frame = { border: '1px solid var(--gl-rule-strong)', background: 'var(--gl-surface-1)' };
const meta = { title: 'Atoms/Layout/Center', tags: ['spacing'], component: Center, args: { minHeight: 160, style: frame, children: 'No packages match' } } satisfies Meta<typeof Center>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Inline: Story = {
  render: () => (
    <Center inline minHeight={40} style={{ ...frame, width: 120 }}>
      Pinned
    </Center>
  ),
};
export const Block: Story = {
  args: {
    children: <div style={{ padding: 12, border: '1px solid var(--gl-rule-strong)', background: 'var(--gl-paper)' }}>Block child</div>,
  },
};
