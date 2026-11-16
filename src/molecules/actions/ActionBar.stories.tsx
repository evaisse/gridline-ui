import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Checkbox } from '../../atoms';
import { ActionBar } from './ActionBar';

const packages = ['tessera', 'quillmark', 'castor', 'ledgerline'];
const actions = (<><Button size="sm">Archive</Button><Button size="sm">Transfer</Button><Button size="sm">Delete</Button></>);

const meta = { title: 'Molecules/Actions/ActionBar', tags: ['action', 'selection'], component: ActionBar, args: { count: 3, children: actions, onClear: () => {} } } satisfies Meta<typeof ActionBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Single: Story = { args: { count: 1, noun: 'package' } };
export const NoClear: Story = { args: { onClear: undefined, count: 12, noun: 'package' } };

function Demo() {
  const [picked, setPicked] = useState<string[]>(['castor']);
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
      {packages.map((name) => (
        <label key={name} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Checkbox checked={picked.includes(name)} aria-label={name} onCheckedChange={(on) => setPicked(on ? [...picked, name] : picked.filter((p) => p !== name))} />
          {name}
        </label>
      ))}
      <ActionBar count={picked.length} noun="package" onClear={() => setPicked([])}>{actions}</ActionBar>
    </div>
  );
}
export const Interactive: Story = { render: () => <Demo /> };
