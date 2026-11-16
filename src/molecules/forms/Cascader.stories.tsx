import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cascader, type CascaderOption } from './Cascader';

const registry: CascaderOption[] = [
  { value: 'tessera', label: 'tessera', children: [
    { value: '4', label: '4.x', children: [{ value: '4.2.1', label: '4.2.1' }, { value: '4.2.0', label: '4.2.0' }, { value: '4.1.9', label: '4.1.9', disabled: true }] },
    { value: '3', label: '3.x', children: [{ value: '3.9.4', label: '3.9.4' }] },
  ] },
  { value: 'quillmark', label: 'quillmark', children: [
    { value: '2', label: '2.x', children: [{ value: '2.0.0', label: '2.0.0' }, { value: '2.0.0-rc.1', label: '2.0.0-rc.1' }] },
  ] },
  { value: 'castor', label: 'castor (no releases)' },
];

const meta = { title: 'Molecules/Forms/Cascader', tags: ['input', 'selection', 'tree'], component: Cascader, args: { options: registry, 'aria-label': 'Release', placeholder: 'Package / line / version' }, decorators: [(Story) => <div style={{ maxWidth: 380, minHeight: 340 }}><Story /></div>] } satisfies Meta<typeof Cascader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Preselected: Story = { args: { defaultValue: ['tessera', '4', '4.2.1'] } };
export const Disabled: Story = { args: { disabled: true, defaultValue: ['quillmark', '2', '2.0.0'] } };

function ControlledDemo() {
  const [value, setValue] = useState<string[]>(['tessera', '3', '3.9.4']);
  return (
    <>
      <Cascader options={registry} value={value} onChange={setValue} separator=" @ " aria-label="Release" />
      <p style={{ font: '11px monospace' }}>{value.join(' > ')}</p>
    </>
  );
}
export const Controlled: Story = { render: () => <ControlledDemo /> };
