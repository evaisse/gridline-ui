import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';

const meta = { title: 'Molecules/Forms/FileUpload', tags: ['file', 'input'], component: FileUpload, args: { hint: 'A .tgz archive, 20 MB at most' }, decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>] } satisfies Meta<typeof FileUpload>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Single: Story = { args: { multiple: false, title: 'Drop one file or browse' } };
export const Disabled: Story = { args: { disabled: true } };
