import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabPanels } from './TabPanels';

const meta = {
  title: 'Molecules/Navigation/TabPanels', tags: ['selection', 'disclosure'],
  component: TabPanels,
  args: {
    panels: [
      { id: 'overview', label: 'Overview', content: 'An incremental parser toolkit.' },
      { id: 'modules', label: 'Modules', content: 'core, parser, printer, cli' },
      { id: 'history', label: 'History', content: '42 releases since 2023.' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
} satisfies Meta<typeof TabPanels>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Hug: Story = {};
export const Fill: Story = { args: { fill: true } };
