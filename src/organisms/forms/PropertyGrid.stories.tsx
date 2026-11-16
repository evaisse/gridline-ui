import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PropertyGrid, type PropertyDef, type PropertyValues } from './PropertyGrid';

const properties: PropertyDef[] = [
  { key: 'name', label: 'Name' },
  { key: 'version', label: 'Version', type: 'readonly' },
  { key: 'licence', label: 'Licence', type: 'select', options: ['MIT', 'Apache-2.0', 'ISC'] },
  { key: 'private', label: 'Private', type: 'boolean' },
  { key: 'timeout', label: 'Timeout', type: 'number', hint: 'ms', group: 'Build' },
  { key: 'entry', label: 'Entry point', group: 'Build' },
];
const values: PropertyValues = { name: 'tessera', version: '2.4.0', licence: 'MIT', private: false, timeout: 3000, entry: 'src/index.ts' };

const meta = { title: 'Organisms/Forms/PropertyGrid', tags: ['form', 'table'], component: PropertyGrid, args: { properties, 'aria-label': 'Package properties' }, decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>] } satisfies Meta<typeof PropertyGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: values } };
export const Blank: Story = {};
export const Flat: Story = { args: { properties: properties.slice(0, 4), defaultValue: { ...values, private: true } } };

function Live() {
  const [current, setCurrent] = useState(values);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <PropertyGrid properties={properties} value={current} onChange={setCurrent} aria-label="Package properties" />
      <pre style={{ margin: 0, fontFamily: 'var(--gl-font-mono)', fontSize: 11, color: 'var(--gl-ink-2)' }}>{JSON.stringify(current)}</pre>
    </div>
  );
}
export const WithOutput: Story = { render: () => <Live /> };
