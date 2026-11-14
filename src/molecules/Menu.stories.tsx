import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Kbd } from '../atoms';
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger,
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from './Menu';

const meta = { title: 'Molecules/Menu', component: DropdownMenu } satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <div style={{ minHeight: 260 }}>
      <DropdownMenu {...args}>
        <DropdownMenuTrigger asChild><Button>Actions</Button></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Package</DropdownMenuLabel>
          <DropdownMenuItem hint={<Kbd>O</Kbd>}>Open</DropdownMenuItem>
          <DropdownMenuItem hint={<Kbd>D</Kbd>}>Download</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Compare with</DropdownMenuSubTrigger>
            <DropdownMenuSubContent><DropdownMenuItem>quillmark</DropdownMenuItem><DropdownMenuItem>harrow</DropdownMenuItem></DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>Show deprecated</DropdownMenuCheckboxItem>
          <DropdownMenuItem disabled>Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const Context: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height: 140, border: '1px solid var(--gl-rule-strong)' }}>Right-click here</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Row</ContextMenuLabel>
        <ContextMenuItem>Copy link</ContextMenuItem>
        <ContextMenuItem>Pin to top</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Hide</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
