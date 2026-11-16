import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';

// Builds an inline SVG picture so stories never touch the network.
const svgPicture = (hue: string, label: string) => `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="${hue}"/><path d="M0 300l140-110 120 80 140-150 240 180v100H0z" fill="rgba(255,255,255,0.35)"/><circle cx="500" cy="110" r="34" fill="rgba(255,255,255,0.6)"/><text x="24" y="44" font-family="monospace" font-size="22" fill="white">${label}</text></svg>`,
)}`;

const meta = { title: 'Molecules/Media/Image', tags: ['media'], component: Image, args: { src: svgPicture('rgb(44,92,160)', 'tessera 2.4'), alt: 'Generated landscape for tessera 2.4', ratio: '16 / 10' }, decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>] } satisfies Meta<typeof Image>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Contain: Story = { args: { fit: 'contain', ratio: '1 / 1' } };
export const Broken: Story = { args: { src: 'broken://missing.png', alt: 'Cover for quillmark' } };
export const NoSource: Story = { args: { src: undefined, alt: 'No cover set' } };
