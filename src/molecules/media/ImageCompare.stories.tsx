import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ImageCompare } from './ImageCompare';

const picture = (fill: string, label: string) => `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="${fill}"/><path d="M0 300l140-110 120 80 140-150 240 180v100H0z" fill="rgba(255,255,255,0.3)"/><text x="24" y="44" font-family="monospace" font-size="24" fill="white">${label}</text></svg>`,
)}`;

const before = { src: picture('rgb(96,108,124)', 'before: v1 theme'), alt: 'Dashboard with the v1 theme' };
const after = { src: picture('rgb(44,92,160)', 'after: v2 theme'), alt: 'Dashboard with the v2 theme' };

const meta = { title: 'Molecules/Media/ImageCompare', tags: ['media'], component: ImageCompare, args: { before, after }, decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>] } satisfies Meta<typeof ImageCompare>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StartsAtQuarter: Story = { args: { defaultValue: 25 } };
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(60);
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <ImageCompare {...args} value={value} onChange={setValue} />
        <code>divider at {Math.round(value)}%</code>
      </div>
    );
  },
};
