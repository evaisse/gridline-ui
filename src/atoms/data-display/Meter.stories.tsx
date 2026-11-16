import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from './Meter';

const meta = {
  title: 'Atoms/Data display/Meter', tags: ['data', 'status'],
  component: Meter,
  args: { value: 68, max: 100, tone: 'neutral', label: 'Coverage' },
  decorators: [(Story) => <div style={{ maxWidth: 420, padding: '8px 0' }}><Story /></div>],
} satisfies Meta<typeof Meter>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <Meter value={82} label="Neutral" />
      <Meter value={68} tone="pos" label="Positive" />
      <Meter value={45} tone="neg" label="Negative" />
      <Meter value={30} tone="warn" label="Warning" />
      <Meter value={56} tone="info" label="Info" />
    </div>
  ),
};
