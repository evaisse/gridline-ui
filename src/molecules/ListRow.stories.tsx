import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListRow } from './ListRow';

const meta = {
  title: 'Molecules/ListRow',
  component: ListRow,
  args: { meta: 'Nov 12, 2026', icon: '◆', children: 'tessera', trailing: 'v4.2.0' },
  decorators: [(Story) => <div style={{ maxWidth: 440, border: '1px solid var(--gl-rule-strong)', borderBottom: 0 }}><Story /></div>],
} satisfies Meta<typeof ListRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true, trailing: '→' } };
