import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = {
  title: 'Atoms/Slider',
  component: Slider,
  args: { defaultValue: [40], max: 100, step: 1 },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const Range: Story = { args: { defaultValue: [20, 70], thumbLabels: ['Minimum', 'Maximum'] } };
