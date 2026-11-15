import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from './AspectRatio';

const meta = {
  title: 'Atoms/Layout/AspectRatio', tags: ['container', 'media'],
  component: AspectRatio,
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <AspectRatio {...args}><div className="gl-hatch" style={{ height: '100%', border: '1px solid var(--gl-rule-strong)' }} /></AspectRatio>
    </div>
  ),
} satisfies Meta<typeof AspectRatio>;
export default meta;

export const Widescreen: StoryObj<typeof meta> = {};
export const Square: StoryObj<typeof meta> = { args: { ratio: 1 } };
