import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorSwatch } from './ColorSwatch';

const meta = { title: 'Atoms/Data display/ColorSwatch', tags: ['color'], component: ColorSwatch, args: { color: 'rgb(var(--gl-data-1))', label: 'Data 1' } } satisfies Meta<typeof ColorSwatch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const Palette: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => <ColorSwatch key={slot} size="lg" color={`rgb(var(--gl-data-${slot}))`} label={`Data ${slot}`} />)}
    </div>
  ),
};
