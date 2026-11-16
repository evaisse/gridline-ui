import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = { title: 'Atoms/Forms/Checkbox', tags: ['input', 'selection'], component: Checkbox, args: { 'aria-label': 'Accept', defaultChecked: true } } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {};
export const Unchecked: Story = { args: { defaultChecked: false } };
export const Indeterminate: Story = { args: { checked: 'indeterminate', defaultChecked: undefined } };
export const Disabled: Story = { args: { disabled: true } };
