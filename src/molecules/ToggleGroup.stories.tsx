import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta = { title: 'Molecules/ToggleGroup', component: ToggleGroup, args: { type: 'single' } } satisfies Meta<typeof ToggleGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="all" aria-label="Scope">
      <ToggleGroupItem value="all">All models</ToggleGroupItem>
      <ToggleGroupItem value="open">Open weights</ToggleGroupItem>
    </ToggleGroup>
  ),
};
export const Multiple: Story = {
  args: { type: 'multiple' },
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['frontier']} aria-label="Overlays">
      <ToggleGroupItem value="frontier">Frontier</ToggleGroupItem>
      <ToggleGroupItem value="log">Log scale</ToggleGroupItem>
      <ToggleGroupItem value="labels">Labels</ToggleGroupItem>
    </ToggleGroup>
  ),
};
