import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberInput } from './NumberInput';

const meta = { title: 'Molecules/Forms/NumberInput', tags: ['input', 'number'], component: NumberInput, args: { defaultValue: 3, 'aria-label': 'Seats' } } satisfies Meta<typeof NumberInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Bounded: Story = { args: { min: 1, max: 5, defaultValue: 5 } };
export const Stepped: Story = { args: { step: 0.5, defaultValue: 2.5 } };
export const Disabled: Story = { args: { disabled: true } };
