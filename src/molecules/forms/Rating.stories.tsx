import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from './Rating';

const meta = { title: 'Molecules/Forms/Rating', tags: ['input', 'number'], component: Rating, args: { defaultValue: 3 } } satisfies Meta<typeof Rating>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
export const ReadOnly: Story = { args: { readOnly: true, value: 4.5, showValue: true } };
export const TenMarks: Story = { args: { count: 10, defaultValue: 7 } };
