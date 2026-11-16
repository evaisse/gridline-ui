import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeSelect, type TreeSelectNode } from './TreeSelect';

const packages: TreeSelectNode[] = [
  { value: 'tessera', label: 'tessera', children: [
    { value: 'tessera-core', label: 'tessera-core' },
    { value: 'tessera-cli', label: 'tessera-cli' },
    { value: 'tessera-plugins', label: 'tessera-plugins', children: [
      { value: 'plugin-svg', label: 'plugin-svg' },
      { value: 'plugin-legacy', label: 'plugin-legacy', disabled: true },
    ] },
  ] },
  { value: 'quillmark', label: 'quillmark', children: [
    { value: 'quillmark-parser', label: 'quillmark-parser' },
    { value: 'quillmark-render', label: 'quillmark-render' },
  ] },
  { value: 'castor', label: 'castor' },
];

const meta = { title: 'Molecules/Forms/TreeSelect', tags: ['input', 'selection', 'tree'], component: TreeSelect, args: { options: packages, 'aria-label': 'Package', placeholder: 'Choose a package' }, decorators: [(Story) => <div style={{ maxWidth: 360, minHeight: 360 }}><Story /></div>] } satisfies Meta<typeof TreeSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Preselected: Story = { args: { defaultValue: ['quillmark-parser'], defaultExpanded: ['quillmark'] } };
export const Multiple: Story = { args: { multiple: true, defaultValue: ['tessera-core', 'castor'], defaultExpanded: ['tessera'] } };

function ControlledDemo() {
  const [value, setValue] = useState<string[]>(['plugin-svg']);
  return <TreeSelect options={packages} value={value} onChange={setValue} multiple defaultExpanded={['tessera', 'tessera-plugins']} aria-label="Packages" />;
}
export const Controlled: Story = { render: () => <ControlledDemo /> };
