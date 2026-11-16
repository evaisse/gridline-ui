import type { Meta, StoryObj } from '@storybook/react-vite';
import { Attachment } from './Attachment';

const meta = { title: 'Molecules/Assistant/Attachment', tags: ['ai', 'file'], component: Attachment, args: { name: 'coverage-report.pdf', meta: 'PDF · 240 kB', onRemove: () => {} } } satisfies Meta<typeof Attachment>;
export default meta;
type Story = StoryObj<typeof meta>;

export const File: Story = {};
export const Uploading: Story = { args: { progress: 45, meta: undefined } };
export const Failed: Story = { args: { error: 'Too large' } };
