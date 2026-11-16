import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AngleSlider } from './AngleSlider';

const meta = { title: 'Molecules/Forms/AngleSlider', tags: ['input', 'number'], component: AngleSlider, args: { 'aria-label': 'Rotation' } } satisfies Meta<typeof AngleSlider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 135 } };
export const SnappedDialOnly: Story = { args: { step: 15, defaultValue: 90, showInput: false } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 45 } };
export const Controlled: Story = {
  render: function Render() {
    const [angle, setAngle] = useState(30);
    return (
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <AngleSlider aria-label="Gradient angle" value={angle} onChange={setAngle} step={5} />
        <code>{angle} deg</code>
      </div>
    );
  },
};
