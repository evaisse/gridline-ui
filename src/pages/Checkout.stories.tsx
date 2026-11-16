import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Heading, Input, Label, NativeSelect } from '../atoms';
import { ChoiceCard, Field, MaskedInput, Steps } from '../molecules';
import { Cart, TopBar, type CartLine } from '../organisms';
import { CheckoutTemplate } from '../templates';
import { LockIcon } from '../tokens/icons';

const delivery = [
  { value: 'standard', title: 'Standard', description: 'Two working days', meta: 'Free' },
  { value: 'express', title: 'Express', description: 'Next working day', meta: '$12' },
  { value: 'pickup', title: 'Pick-up point', description: 'Ready in three days', meta: 'Free' },
];
const basket: CartLine[] = [
  { id: 'k75', name: 'Meridian 75', price: 189, quantity: 1 },
  { id: 'sw-l', name: 'Linear 45 g, pack of 90', price: 42, quantity: 2 },
  { id: 'cab', name: 'Coiled cable', price: 34, quantity: 1 },
];
const block = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 16, padding: 24, borderBottom: '1px solid var(--gl-rule-strong)' } as const;
const pair = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 } as const;

function Checkout() {
  const [lines, setLines] = useState(basket);
  const [method, setMethod] = useState('standard');
  return (
    <CheckoutTemplate
      header={<><TopBar brand="▦ Meridian Supply" actions={<Label><LockIcon width={12} height={12} /> Secure checkout</Label>} /><Steps current={1} steps={[{ id: 'cart', label: 'Cart' }, { id: 'details', label: 'Details' }, { id: 'done', label: 'Confirmation' }]} /></>}
      summary={<Cart lines={lines} onLinesChange={setLines} shipping={method === 'express' ? 12 : 0} action={<Button variant="solid" disabled={lines.length === 0}>Pay now</Button>} />}
      footer={<Label size="xs">Returns within thirty days · invented shop</Label>}
    >
      <section style={block}>
        <Heading level={2} size="lg">1 · Contact</Heading>
        <div style={pair}>
          <Field label="Email">{(ids) => <Input {...ids} type="email" defaultValue="ines@tessera.example" />}</Field>
          <Field label="Phone">{(ids) => <MaskedInput id={ids.id} mask="(999) 999-9999" aria-label="Phone" />}</Field>
        </div>
      </section>
      <section style={block}>
        <Heading level={2} size="lg">2 · Delivery</Heading>
        <div style={pair}>
          <Field label="Full name">{(ids) => <Input {...ids} defaultValue="Ines Carvalho" />}</Field>
          <Field label="Country">{(ids) => <NativeSelect {...ids} defaultValue="Portugal"><option>France</option><option>Portugal</option><option>Sweden</option></NativeSelect>}</Field>
        </div>
        <Field label="Address">{(ids) => <Input {...ids} defaultValue="12 Rua das Flores" />}</Field>
        <ChoiceCard aria-label="Delivery method" options={delivery} value={method} onChange={setMethod} columns={3} />
      </section>
      <section style={{ ...block, borderBottom: 0 }}>
        <Heading level={2} size="lg">3 · Payment</Heading>
        <Field label="Card number">{(ids) => <MaskedInput id={ids.id} mask="9999 9999 9999 9999" aria-label="Card number" />}</Field>
        <div style={pair}>
          <Field label="Expiry">{(ids) => <MaskedInput id={ids.id} mask="99/99" aria-label="Expiry" />}</Field>
          <Field label="Security code">{(ids) => <MaskedInput id={ids.id} mask="999" aria-label="Security code" />}</Field>
        </div>
      </section>
    </CheckoutTemplate>
  );
}

const meta = { title: 'Pages/Checkout', component: Checkout, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Checkout>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
