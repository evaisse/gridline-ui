import type { Meta, StoryObj } from '@storybook/react-vite';
import { BellIcon, FolderIcon, HomeIcon, SearchIcon, UserIcon } from '../../tokens/icons';
import { Dock } from './Dock';

const items = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'packages', label: 'Packages', icon: <FolderIcon /> },
  { id: 'alerts', label: 'Alerts', icon: <BellIcon /> },
  { id: 'account', label: 'Account', icon: <UserIcon /> },
];
const meta = {
  title: 'Molecules/Navigation/Dock', tags: ['wayfinding', 'shell'],
  component: Dock,
  args: { items, contained: true, defaultValue: 'home' },
  decorators: [(Story) => <div style={{ position: 'relative', height: 240, maxWidth: 420, border: '1px solid var(--gl-rule-strong)' }}><Story /></div>],
} satisfies Meta<typeof Dock>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const PackagesSelected: Story = { args: { defaultValue: 'packages' } };
export const ThreeDestinations: Story = { args: { items: items.slice(0, 3) } };
