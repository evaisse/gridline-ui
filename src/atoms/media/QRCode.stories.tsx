import type { Meta, StoryObj } from '@storybook/react-vite';
import { QRCode } from './QRCode';

const meta = { title: 'Atoms/Media/QRCode', tags: ['media', 'data'], component: QRCode, args: { value: 'https://registry.example.dev/tessera' } } satisfies Meta<typeof QRCode>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 240, value: 'https://registry.example.dev/packages/quillmark/releases/3.1.0?channel=stable' } };
export const Compact: Story = { args: { size: 96, margin: 2, value: 'castor', label: 'castor package id' } };
export const TooLong: Story = { args: { value: 'x'.repeat(300) } };
