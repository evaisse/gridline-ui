import type { Meta, StoryObj } from '@storybook/react-vite';
import { Numeric } from './Numeric';

const meta = {
  title: 'Atoms/Data display/Numeric', tags: ['number', 'data'],
  component: Numeric,
  args: { children: '68.49', unit: '%' },
} satisfies Meta<typeof Numeric>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Data: Story = {};
export const Display: Story = { args: { variant: 'display' } };
export const WithPrefix: Story = { args: { variant: 'display', prefix: '$', unit: undefined, children: '9.838' } };
