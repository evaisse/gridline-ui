import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Button, Tag } from '../../atoms';
import { FileIcon } from '../../tokens/icons';
import { Item, ItemGroup } from './Item';

const meta = {
  title: 'Molecules/Data display/Item', tags: ['list'],
  component: Item,
  args: { media: <FileIcon />, title: 'release-notes.md', description: 'Edited 2 hours ago · 4 kB', actions: <Button size="sm">Open</Button> },
  decorators: [(Story) => <div style={{ maxWidth: 440 }}><Story /></div>],
} satisfies Meta<typeof Item>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {};
export const Tinted: Story = { args: { variant: 'tinted', size: 'sm' } };
export const Group: Story = {
  render: () => (
    <ItemGroup>
      <Item media={<Avatar fallback="tl" />} title="Tessera Labs" description="Maintainer" actions={<Tag dot tone="pos">Active</Tag>} />
      <Item media={<Avatar fallback="qm" />} title="Quillmark" description="Contributor" actions={<Tag dot>Invited</Tag>} />
      <Item media={<Avatar fallback="hr" />} title="Harrow" description="Contributor" actions={<Tag dot tone="warn">Paused</Tag>} />
    </ItemGroup>
  ),
};
