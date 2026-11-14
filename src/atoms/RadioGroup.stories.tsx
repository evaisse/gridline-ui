import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './RadioGroup';

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  args: { defaultValue: 'stable', 'aria-label': 'Channel' },
  render: (args) => (
    <RadioGroup {...args}>
      {['stable', 'beta', 'nightly'].map((value) => (
        <label key={value} style={{ display: 'flex', gap: 8, alignItems: 'center', textTransform: 'capitalize' }}><Radio value={value} />{value}</label>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: 'horizontal' } };
