import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Input } from '../../atoms';
import { Tour } from './Tour';

const steps = [
  { id: 'search', target: '#tour-search', title: 'Search the registry', content: 'Find packages by name, keyword or maintainer.' },
  { id: 'publish', target: '#tour-publish', title: 'Publish a version', content: 'Upload a tarball and the checks run for you.' },
  { id: 'done', title: 'You are set', content: 'Press ? at any time to see the shortcuts.' },
];

function Page() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 24, alignItems: 'center' }}>
      <div id="tour-search" style={{ width: 220, maxWidth: '100%' }}><Input aria-label="Search packages" placeholder="Search packages" /></div>
      <Button id="tour-publish" variant="solid">Publish</Button>
    </div>
  );
}

const meta = { title: 'Molecules/Overlays/Tour', tags: ['popup', 'steps'], component: Tour, args: { steps, open: true, step: 0 }, render: (args) => <><Page /><Tour {...args} /></> } satisfies Meta<typeof Tour>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {};
export const SecondStep: Story = { args: { step: 1 } };
export const CentredFinish: Story = { args: { step: 2 } };

function Demo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  return (
    <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', justifyItems: 'start', gap: 24 }}>
      <Button onClick={() => { setStep(0); setOpen(true); }}>Start tour</Button>
      <Page />
      <Tour steps={steps} open={open} onOpenChange={setOpen} step={step} onStepChange={setStep} />
    </div>
  );
}
export const Interactive: Story = { render: () => <Demo /> };
