import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ImageCropper, type CropArea } from './ImageCropper';

const src = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="rgb(44,92,160)"/><path d="M0 380l180-140 150 100 200-190 270 230v120H0z" fill="rgba(255,255,255,0.3)"/><circle cx="620" cy="120" r="44" fill="rgba(255,255,255,0.6)"/><text x="28" y="52" font-family="monospace" font-size="26" fill="white">castor avatar source</text></svg>',
)}`;

const meta = { title: 'Molecules/Media/ImageCropper', tags: ['media', 'input'], component: ImageCropper, args: { src, alt: 'Source picture to crop' }, decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>] } satisfies Meta<typeof ImageCropper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Square: Story = { args: { aspect: 1, defaultValue: { x: 30, y: 10, width: 40, height: 64 } } };
export const Controlled: Story = {
  render: (args) => {
    const [area, setArea] = useState<CropArea>({ x: 10, y: 20, width: 50, height: 50 });
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <ImageCropper {...args} value={area} onChange={setArea} />
        <pre style={{ margin: 0 }}>{JSON.stringify(area, (_, v) => (typeof v === 'number' ? Math.round(v * 10) / 10 : v))}</pre>
      </div>
    );
  },
};
export const BrokenPicture: Story = { args: { src: 'broken://missing.png', alt: 'Missing picture' } };
