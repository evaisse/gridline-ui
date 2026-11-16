import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../../atoms';
import { Marquee } from './Marquee';

const packages = ['tessera 2.4.1', 'quillmark 0.9.0', 'castor 5.0.2', 'lumen 1.12.0', 'harbor 3.3.7', 'pylon 0.4.4'];

const meta = { title: 'Molecules/Media/Marquee', tags: ['media'], component: Marquee, args: { 'aria-label': 'Latest releases' } } satisfies Meta<typeof Marquee>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: packages.map((name) => <span key={name} style={{ fontFamily: 'var(--gl-font-mono)', fontSize: 13 }}>{name}</span>) } };
export const Reverse: Story = { args: { reverse: true, duration: 40, children: packages.map((name) => <Tag key={name}>{name}</Tag>) } };
export const NoPause: Story = { args: { pauseOnHover: false, gap: 48, duration: 12, children: ['Published', 'Deprecated', 'Yanked', 'Restored'].map((word) => <strong key={word}>{word}</strong>) } };
