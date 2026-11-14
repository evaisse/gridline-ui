import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta = { title: 'Atoms/Popover', component: Popover } satisfies Meta<typeof Popover>;
export default meta;

export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>A flat floating surface: paper, a strong rule, and a tinted halo in place of a shadow.</PopoverContent>
    </Popover>
  ),
};
export const Open: StoryObj<typeof meta> = { ...Default, args: { defaultOpen: true }, decorators: [(Story) => <div style={{ minHeight: 140 }}><Story /></div>] };
