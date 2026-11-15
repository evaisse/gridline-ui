import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from './Carousel';

const slides = ['Coverage', 'Size', 'Build time', 'Installs', 'Issues'].map((name, i) => (
  <div key={name} className={i % 2 ? 'gl-hatch' : 'gl-dots'} style={{ display: 'grid', placeItems: 'center', height: 160, fontFamily: 'var(--gl-font-display)', fontSize: 24 }}>{name}</div>
));

const meta = { title: 'Molecules/Media/Carousel', tags: ['media', 'list'], component: Carousel, args: { label: 'Reports', children: slides }, decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>] } satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const OnePerView: Story = {};
export const ThreePerView: Story = { args: { perView: 3 } };
