import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpIcon, ChatIcon, DownloadIcon, PlusIcon } from '../../tokens/icons';
import { FloatButton } from './FloatButton';

const meta = {
  title: 'Molecules/Actions/FloatButton', tags: ['action'],
  component: FloatButton,
  args: { label: 'Back to top', icon: <ArrowUpIcon />, contained: true },
  decorators: [(Story) => <div style={{ position: 'relative', height: 280, border: '1px solid var(--gl-rule-strong)' }}><Story /></div>],
} satisfies Meta<typeof FloatButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const BackToTop: Story = {};
export const BottomLeft: Story = { args: { position: 'bottom-left', label: 'New package', icon: <PlusIcon /> } };
export const SpeedDial: Story = {
  args: {
    label: 'Quick actions',
    actions: [
      { id: 'chat', label: 'Ask the maintainers', icon: <ChatIcon /> },
      { id: 'dl', label: 'Download tessera 2.4', icon: <DownloadIcon /> },
    ],
  },
};
export const TopRight: Story = { args: { position: 'top-right', label: 'Add', icon: <PlusIcon />, actions: [{ id: 'dl', label: 'Download', icon: <DownloadIcon /> }] } };
