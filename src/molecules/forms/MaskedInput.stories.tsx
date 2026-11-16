import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaskedInput } from './MaskedInput';

const meta = { title: 'Molecules/Forms/MaskedInput', tags: ['input', 'text'], component: MaskedInput, args: { mask: '(999) 999-9999', 'aria-label': 'Phone number' }, decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>] } satisfies Meta<typeof MaskedInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Phone: Story = {};
export const Filled: Story = { args: { mask: '9999 9999 9999 9999', defaultValue: '4242424242424242', 'aria-label': 'Card number' } };
export const DateMask: Story = { args: { mask: '99/99/9999', 'aria-label': 'Release date' } };
export const PackageCode: Story = { args: { mask: 'aaa-9999', 'aria-label': 'Package code', placeholder: 'tes-0001' } };
export const WithComplete: Story = {
  render: function Render() {
    const [done, setDone] = useState('');
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <MaskedInput mask="99:99" aria-label="Start time" onComplete={setDone} />
        <code>{done ? `complete: ${done}` : 'incomplete'}</code>
      </div>
    );
  },
};
