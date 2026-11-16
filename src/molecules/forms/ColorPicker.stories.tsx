import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker, colorFromRgb } from './ColorPicker';

const palette = [[220, 38, 38], [234, 88, 12], [202, 138, 4], [22, 163, 74], [37, 99, 235], [124, 58, 237], [82, 82, 91]].map(([r, g, b]) => colorFromRgb(r, g, b));

const meta = { title: 'Molecules/Forms/ColorPicker', tags: ['input', 'color'], component: ColorPicker, args: { 'aria-label': 'Series colour' } } satisfies Meta<typeof ColorPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSwatches: Story = { args: { swatches: palette, defaultValue: palette[3] } };
export const Disabled: Story = { args: { disabled: true } };
export const Controlled: Story = {
  render: function Render() {
    const [color, setColor] = useState(palette[5]);
    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <ColorPicker aria-label="Accent colour" value={color} onChange={setColor} swatches={palette} />
        <code>{color}</code>
      </div>
    );
  },
};
