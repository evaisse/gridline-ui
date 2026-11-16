import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Typography/Text', tags: ['text'],
  component: Text,
  args: { children: 'Gridline sets reading text in a quiet sans at 13px, with a 68-character measure.' },
} satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {};
export const Lead: Story = { args: { variant: 'lead', children: 'A serif lead paragraph introduces a page or a card.' } };
export const SmallMuted: Story = { args: { variant: 'small', tone: 'muted' } };
