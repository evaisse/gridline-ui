import type { Meta, StoryObj } from '@storybook/react-vite';
import { Backdrop } from './Backdrop';

const region = { position: 'relative', height: 200, padding: 16, border: '1px solid var(--gl-rule-strong)' } as const;
const meta = { title: 'Atoms/Overlays/Backdrop', tags: ['modal'], component: Backdrop, args: { position: 'absolute' } } satisfies Meta<typeof Backdrop>;
export default meta;
type Story = StoryObj<typeof meta>;

export const OverRegion: Story = {
  render: (args) => (
    <div style={region}>
      Releases for quillmark: 12 published, 2 yanked.
      <Backdrop {...args} />
    </div>
  ),
};
export const Loading: Story = {
  args: { strength: 'light', children: 'Loading releases' },
  render: (args) => (
    <div style={region}>
      Releases for castor: 31 published.
      <Backdrop {...args} />
    </div>
  ),
};
export const Closed: Story = {
  args: { open: false },
  render: (args) => (
    <div style={region}>
      Backdrop is closed, content is interactive.
      <Backdrop {...args} />
    </div>
  ),
};
