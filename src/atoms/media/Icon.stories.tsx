import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import { CheckIcon, FileIcon, RefreshIcon, SearchIcon, TrashIcon } from '../../tokens/icons';

const meta = { title: 'Atoms/Media/Icon', tags: ['media'], component: Icon, args: { glyph: SearchIcon } } satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon glyph={FileIcon} size="sm" />
      <Icon glyph={FileIcon} size="md" />
      <Icon glyph={FileIcon} size="lg" />
      <Icon glyph={FileIcon} size="xl" />
    </div>
  ),
};
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon glyph={CheckIcon} tone="pos" label="Passing" />
      <Icon glyph={RefreshIcon} tone="info" label="Rebuilding" />
      <Icon glyph={TrashIcon} tone="neg" label="Removed" />
      <Icon glyph={FileIcon} tone="warn" label="Deprecated" />
    </div>
  ),
};
export const Labelled: Story = { args: { glyph: SearchIcon, label: 'Search packages', size: 'lg' } };
