import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Forms/Input', tags: ['input', 'text'],
  component: Input,
  args: { placeholder: 'Package name', 'aria-label': 'Package name' },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {};
export const WithLeading: Story = { args: { leading: '⌕', placeholder: 'Search', 'aria-label': 'Search' } };
export const Cell: Story = {
  args: { variant: 'cell' },
  decorators: [(Story) => <div style={{ border: '1px solid var(--gl-rule-strong)' }}><Story /></div>],
};
