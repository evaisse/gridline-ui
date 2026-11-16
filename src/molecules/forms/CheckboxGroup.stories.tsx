import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup } from './CheckboxGroup';

const targets = [
  { value: 'esm', label: 'ES modules', description: 'Tree-shakeable output for bundlers.' },
  { value: 'cjs', label: 'CommonJS' },
  { value: 'types', label: 'Type declarations' },
  { value: 'umd', label: 'UMD bundle', disabled: true },
];

const meta = { title: 'Molecules/Forms/CheckboxGroup', tags: ['input', 'selection', 'form'], component: CheckboxGroup, args: { options: targets, legend: 'Build targets' } } satisfies Meta<typeof CheckboxGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Preselected: Story = { args: { defaultValue: ['esm', 'types'], hint: 'tessera publishes every checked target.' } };
export const Horizontal: Story = { args: { orientation: 'horizontal', defaultValue: ['cjs'] } };
export const Disabled: Story = { args: { disabled: true, defaultValue: ['esm'] } };

function ControlledDemo() {
  const [value, setValue] = useState<string[]>(['esm']);
  return <CheckboxGroup options={targets} legend="Build targets" value={value} onChange={setValue} hint={`${value.length} selected`} />;
}
export const Controlled: Story = { render: () => <ControlledDemo /> };
