import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ruler } from './Ruler';

const meta = {
  title: 'Atoms/Data display/Ruler', tags: ['data'],
  component: Ruler,
  args: { value: 68, min: 0, max: 100, range: [28, 74] },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof Ruler>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithRange: Story = {};
export const MarkerOnly: Story = { args: { range: undefined, value: 40 } };
