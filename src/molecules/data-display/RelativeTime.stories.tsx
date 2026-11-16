import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelativeTime } from './RelativeTime';

const NOW = '2026-11-16T12:00:00Z';
const ago = (ms: number) => new Date(new Date(NOW).getTime() - ms).toISOString();

const meta = { title: 'Molecules/Data display/RelativeTime', tags: ['date', 'text'], component: RelativeTime, args: { now: NOW, value: ago(3 * 3600e3) } } satisfies Meta<typeof RelativeTime>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Scale: Story = {
  render: (args) => (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
      {[10e3, 5 * 60e3, 3 * 3600e3, 2 * 86400e3, 21 * 86400e3, 400 * 86400e3, -2 * 86400e3].map((ms) => (
        <li key={ms}>tessera 2.4.1 published <RelativeTime {...args} value={ago(ms)} /></li>
      ))}
    </ul>
  ),
};
export const Live: Story = { args: { now: undefined, value: new Date(Date.now() - 90e3).toISOString(), refreshMs: 5000 } };
export const Invalid: Story = { args: { value: 'not a date' } };
