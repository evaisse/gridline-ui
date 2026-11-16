import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressCircle } from './ProgressCircle';

const meta = { title: 'Atoms/Feedback/ProgressCircle', tags: ['loading', 'status', 'data'], component: ProgressCircle, args: { value: 64, label: 'Publishing tessera 2.4.0' } } satisfies Meta<typeof ProgressCircle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { size: 64, thickness: 4, showValue: true, tone: 'pos' } };
export const Indeterminate: Story = { args: { value: undefined, label: 'Resolving dependencies' } };
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <ProgressCircle value={20} tone="neg" label="Coverage" />
      <ProgressCircle value={55} tone="warn" label="Coverage" />
      <ProgressCircle value={90} tone="pos" label="Coverage" />
      <ProgressCircle value={0} label="Empty" />
    </div>
  ),
};
