import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Transfer, type TransferItem } from './Transfer';

const packages: TransferItem[] = [
  { value: 'tessera-core', label: 'tessera-core' },
  { value: 'tessera-cli', label: 'tessera-cli' },
  { value: 'quillmark-parser', label: 'quillmark-parser' },
  { value: 'quillmark-render', label: 'quillmark-render' },
  { value: 'castor', label: 'castor' },
  { value: 'castor-legacy', label: 'castor-legacy', disabled: true },
];

const meta = { title: 'Molecules/Forms/Transfer', tags: ['selection', 'list'], component: Transfer, args: { items: packages, 'aria-label': 'Workspace packages' } } satisfies Meta<typeof Transfer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Prefilled: Story = { args: { defaultValue: ['tessera-core', 'castor'], titles: ['Registry', 'Workspace'] } };
export const AllMoved: Story = { args: { defaultValue: packages.map((item) => item.value) } };

function ControlledDemo() {
  const [value, setValue] = useState<string[]>(['quillmark-parser']);
  return (
    <>
      <Transfer items={packages} value={value} onChange={setValue} aria-label="Workspace packages" />
      <p style={{ font: '11px monospace' }}>{value.join(', ') || 'none'}</p>
    </>
  );
}
export const Controlled: Story = { render: () => <ControlledDemo /> };
