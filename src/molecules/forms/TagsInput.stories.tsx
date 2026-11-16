import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagsInput } from './TagsInput';

const meta = { title: 'Molecules/Forms/TagsInput', tags: ['input', 'selection'], component: TagsInput, args: { defaultValue: ['parser', 'incremental'], 'aria-label': 'Keywords', placeholder: 'Add a keyword' }, decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>] } satisfies Meta<typeof TagsInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Limited: Story = { args: { max: 3, defaultValue: ['parser', 'incremental', 'syntax'] } };
