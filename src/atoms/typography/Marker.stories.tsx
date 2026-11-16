import type { Meta, StoryObj } from '@storybook/react-vite';
import { Marker } from './Marker';

const meta = {
  title: 'Atoms/Typography/Marker', tags: ['text'],
  component: Marker,
  args: { children: 'Today', variant: 'separator' },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Marker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Separator: Story = {};
export const Row: Story = { args: { variant: 'row', children: 'Context compacted · 12 messages summarised' } };
export const Inline: Story = { args: { variant: 'inline', children: 'Tessera Labs joined the conversation' } };
