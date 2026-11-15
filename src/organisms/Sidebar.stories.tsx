import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Label, Text } from '../atoms';
import { CalendarIcon, ChatIcon, FileIcon, GlobeIcon, TerminalIcon } from '../tokens/icons';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset, SidebarItem, SidebarProvider, SidebarTrigger } from './Sidebar';

const meta = { title: 'Organisms/Navigation/Sidebar', tags: ['shell', 'wayfinding'], component: SidebarProvider, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof SidebarProvider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  render: (args) => (
    <SidebarProvider {...args} style={{ height: 420 }}>
      <Sidebar>
        <SidebarHeader><SidebarTrigger /><Label tone="ink">Gridline</Label></SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Workspace">
            <SidebarItem icon={<GlobeIcon />} active>Overview</SidebarItem>
            <SidebarItem icon={<FileIcon />} badge={42}>Packages</SidebarItem>
            <SidebarItem icon={<TerminalIcon />}>Builds</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="Team">
            <SidebarItem icon={<ChatIcon />} badge={3}>Discussions</SidebarItem>
            <SidebarItem icon={<CalendarIcon />}>Releases</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter><Avatar fallback="tl" /><Label tone="ink">Tessera Labs</Label></SidebarFooter>
      </Sidebar>
      <SidebarInset><div style={{ padding: 24 }}><Text>Page content. Use the button in the rail to collapse it to icons.</Text></div></SidebarInset>
    </SidebarProvider>
  ),
};
export const Collapsed: Story = { ...Expanded, args: { defaultOpen: false } };
