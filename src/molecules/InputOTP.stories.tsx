import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOTP } from './InputOTP';

const meta = { title: 'Molecules/InputOTP', component: InputOTP, args: { maxLength: 6, 'aria-label': 'Verification code' } } satisfies Meta<typeof InputOTP>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SixDigits: Story = {};
export const Grouped: Story = { args: { groupSize: 3, defaultValue: '4821' } };
