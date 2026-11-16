import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageGallery, type GalleryImage } from './ImageGallery';

const picture = (fill: string, label: string, height = 400) => `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="${height}" viewBox="0 0 600 ${height}"><rect width="600" height="${height}" fill="${fill}"/><path d="M0 ${height * 0.8}l150-110 120 70 160-130 170 140v${height * 0.2}H0z" fill="rgba(255,255,255,0.3)"/><text x="20" y="40" font-family="monospace" font-size="22" fill="white">${label}</text></svg>`,
)}`;

const fills = ['rgb(44,92,160)', 'rgb(200,84,48)', 'rgb(38,118,76)', 'rgb(112,84,168)', 'rgb(24,126,132)', 'rgb(176,62,104)'];
const names = ['tessera', 'quillmark', 'castor', 'lumen', 'harbor', 'pylon'];
const images: GalleryImage[] = names.map((name, i) => ({ src: picture(fills[i], name, i % 2 ? 600 : 400), alt: `${name} release banner`, caption: `Banner for ${name}`, ratio: i % 2 ? '1 / 1' : '3 / 2' }));

const meta = { title: 'Molecules/Media/ImageGallery', tags: ['media', 'list'], component: ImageGallery, args: { images } } satisfies Meta<typeof ImageGallery>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {};
export const Masonry: Story = { args: { layout: 'masonry' } };
export const FourColumns: Story = { args: { columns: 4 } };
export const SinglePicture: Story = { args: { images: images.slice(0, 1), columns: 2 } };
