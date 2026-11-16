import type { Meta, StoryObj } from '@storybook/react-vite';
import { Status } from './Status';

const meta = { title: 'Atoms/Data display/Status', tags: ['status'], component: Status, args: { tone: 'pos', children: 'Online' } } satisfies Meta<typeof Status>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Status tone="pos">castor-registry online</Status>
      <Status tone="warn">quillmark-cdn degraded</Status>
      <Status tone="neg">tessera-index down</Status>
      <Status tone="info">mirror syncing</Status>
      <Status hollow>build queue paused</Status>
    </div>
  ),
};
export const MarkOnly: Story = { args: { children: undefined, 'aria-label': 'Online', role: 'img' } };
