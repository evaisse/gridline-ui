import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms';
import { ArrowRightIcon, LayersIcon } from '../../tokens/icons';
import { Cart, type CartLine } from './Cart';

const meta = { title: 'Organisms/Commerce/Cart', tags: ['list', 'number'], component: Cart } satisfies Meta<typeof Cart>;
export default meta;
type Story = StoryObj<typeof meta>;

const lines: CartLine[] = [
  { id: 'tessera', name: 'Tessera team licence', price: 24, quantity: 3, media: <LayersIcon /> },
  { id: 'quillmark', name: 'Quillmark audit log add-on', price: 9.5, quantity: 1, media: <LayersIcon /> },
  { id: 'castor', name: 'Castor self-hosted runner', price: 120, quantity: 2, media: <LayersIcon /> },
];
const checkout = <Button variant="solid" icon={<ArrowRightIcon />}>Check out</Button>;

function Interactive() {
  const [items, setItems] = useState(lines);
  return <div style={{ maxWidth: 560 }}><Cart lines={items} onLinesChange={setItems} shipping={items.length ? 8 : undefined} action={checkout} /></div>;
}

export const Filled: Story = { render: () => <Interactive /> };
export const FreeShipping: Story = { args: { defaultLines: lines.slice(0, 1), shipping: 0, action: checkout } };
export const Empty: Story = { args: { defaultLines: [], emptyText: 'Add a package to see its price here.', action: checkout } };
