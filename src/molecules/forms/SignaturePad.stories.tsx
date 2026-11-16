import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SignaturePad } from './SignaturePad';

const meta = { title: 'Molecules/Forms/SignaturePad', tags: ['input', 'media'], component: SignaturePad, args: { 'aria-label': 'Release approval signature' } } satisfies Meta<typeof SignaturePad>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>] };
export const Tall: Story = { args: { height: 240 }, decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>] };
export const Disabled: Story = { args: { disabled: true }, decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>] };

function Preview() {
  const [url, setUrl] = useState<string | null>(null);
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
      <SignaturePad aria-label="Maintainer signature" onChange={setUrl} />
      <span style={{ fontFamily: 'var(--gl-font-mono)', fontSize: 11, color: 'var(--gl-ink-2)' }}>{url ? `PNG captured, ${url.length} characters` : 'No signature yet'}</span>
    </div>
  );
}
export const WithOutput: Story = { render: () => <Preview /> };
