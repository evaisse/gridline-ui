import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta = { title: 'Atoms/Separator', component: Separator, args: { strength: 'faint' } } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Strong: Story = { args: { strength: 'strong' } };
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [(Story) => <div style={{ display: 'flex', gap: 12, height: 24, alignItems: 'center' }}>Left<Story />Right</div>],
};
