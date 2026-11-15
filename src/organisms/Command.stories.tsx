import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from '../atoms';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './Command';

const meta = { title: 'Organisms/Navigation/Command', tags: ['search', 'menu'], component: Command, decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>] } satisfies Meta<typeof Command>;
export default meta;

export const Palette: StoryObj<typeof meta> = {
  render: () => (
    <Command label="Command palette">
      <CommandInput placeholder="Type a command" />
      <CommandList>
        <CommandEmpty>No command found</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem hint={<Kbd>G</Kbd>}>Go to catalogue</CommandItem>
          <CommandItem hint={<Kbd>P</Kbd>}>Go to package</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>Download report</CommandItem>
          <CommandItem>Compare packages</CommandItem>
          <CommandItem disabled>Archive</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
