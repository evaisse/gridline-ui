import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Editable } from './Editable';

const meta = { title: 'Molecules/Forms/Editable', tags: ['input', 'text'], component: Editable, args: { 'aria-label': 'Package name', defaultValue: 'quillmark-parser' }, decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>] } satisfies Meta<typeof Editable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { defaultValue: '', placeholder: 'Add a description' } };
export const WithControls: Story = { args: { showControls: true, commitOnBlur: false } };
export const Multiline: Story = { args: { multiline: true, 'aria-label': 'Description', defaultValue: 'Incremental parser for the quillmark format.\nShips ES modules and type declarations.' } };

function ControlledDemo() {
  const [text, setText] = useState('tessera-core');
  return (
    <>
      <Editable value={text} onChange={setText} aria-label="Package name" />
      <p style={{ font: '11px monospace' }}>committed: {text}</p>
    </>
  );
}
export const Controlled: Story = { render: () => <ControlledDemo /> };
