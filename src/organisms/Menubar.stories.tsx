import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from '../atoms';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from './Menubar';

const meta = { title: 'Organisms/Menubar', component: Menubar, decorators: [(Story) => <div style={{ minHeight: 200 }}><Story /></div>] } satisfies Meta<typeof Menubar>;
export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent><MenubarItem hint={<Kbd>N</Kbd>}>New report</MenubarItem><MenubarItem hint={<Kbd>O</Kbd>}>Open</MenubarItem><MenubarSeparator /><MenubarItem>Export</MenubarItem></MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent><MenubarItem>Undo</MenubarItem><MenubarItem>Redo</MenubarItem></MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent><MenubarItem>Compact rows</MenubarItem><MenubarItem>Log scale</MenubarItem></MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
