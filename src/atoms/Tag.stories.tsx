import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = {
  title: 'Atoms/Data display/Tag', tags: ['status', 'text'],
  component: Tag,
  args: { children: 'Stable', tone: 'neutral', dot: true },
} satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tag dot>Neutral</Tag>
      <Tag dot tone="pos">Passing</Tag>
      <Tag dot tone="neg">Failing</Tag>
      <Tag dot tone="warn">Deprecated</Tag>
      <Tag dot tone="info">Beta</Tag>
      <Tag>No dot</Tag>
    </div>
  ),
};
