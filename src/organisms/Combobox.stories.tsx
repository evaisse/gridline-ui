import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Combobox } from './Combobox';

const options = ['tessera', 'quillmark', 'harrow', 'lumen-fmt', 'castor', 'bramble', 'sextant'].map((name) => ({ value: name, label: name }));

const meta = {
  title: 'Organisms/Forms/Combobox', tags: ['input', 'selection', 'search', 'popup'],
  component: Combobox,
  args: { options, placeholder: 'Select a package', 'aria-label': 'Package' },
  render: function Render(args) {
    const [value, setValue] = useState(args.value ?? '');
    return <div style={{ maxWidth: 260, minHeight: 320 }}><Combobox {...args} value={value} onValueChange={setValue} /></div>;
  },
} satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Selected: Story = { args: { value: 'harrow' } };
