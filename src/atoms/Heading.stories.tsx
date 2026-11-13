import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  args: { children: 'Measured, ruled, compact', level: 1 },
} satisfies Meta<typeof Heading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Scale: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Heading level={1}>Page title, 36px</Heading>
      <Heading level={2}>Section title, 24px</Heading>
      <Heading level={3}>Card title, 19px</Heading>
      <Heading level={4}>Inline title, 16px</Heading>
    </div>
  ),
};
