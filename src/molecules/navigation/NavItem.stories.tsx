import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavItem } from './NavItem';

const meta = {
  title: 'Molecules/Navigation/NavItem', tags: ['wayfinding', 'list'],
  component: NavItem,
  args: { icon: '▤', children: 'Parsing', count: 12 },
  decorators: [(Story) => <div style={{ maxWidth: 240, border: '1px solid var(--gl-rule-strong)', borderBottom: 0 }}><Story /></div>],
} satisfies Meta<typeof NavItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
