import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Captcha } from './Captcha';

const meta = { title: 'Molecules/Forms/Captcha', tags: ['auth', 'input'], component: Captcha } satisfies Meta<typeof Captcha>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Arithmetic: Story = {};
export const Characters: Story = { args: { kind: 'text' } };

function Gate() {
  const [ok, setOk] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 280 }}>
      <Captcha onVerify={setOk} />
      <button type="button" disabled={!ok} style={{ height: 40 }}>Create account</button>
    </div>
  );
}
export const GatingASubmit: Story = { render: () => <Gate /> };
