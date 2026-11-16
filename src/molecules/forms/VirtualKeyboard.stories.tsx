import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { VirtualKeyboard } from './VirtualKeyboard';

const meta = { title: 'Molecules/Forms/VirtualKeyboard', tags: ['input'], component: VirtualKeyboard } satisfies Meta<typeof VirtualKeyboard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Qwerty: Story = {};
export const Prefilled: Story = { args: { defaultValue: 'tessera' } };
export const Numeric: Story = { args: { layout: 'numeric', 'aria-label': 'PIN pad' } };

function Search() {
  const [text, setText] = useState('quill');
  const [submitted, setSubmitted] = useState('');
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <VirtualKeyboard value={text} onChange={setText} onEnter={setSubmitted} />
      <span style={{ fontFamily: 'var(--gl-font-mono)', fontSize: 11, color: 'var(--gl-ink-2)' }}>{submitted ? `Searched for "${submitted}"` : 'Press Enter to search'}</span>
    </div>
  );
}
export const Kiosk: Story = { render: () => <Search /> };
