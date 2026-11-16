import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Heading, Input, Label, Text } from '../atoms';
import { ChoiceCard, Field, Result, Steps } from '../molecules';
import { OnboardingTemplate } from '../templates';
import { ArrowRightIcon } from '../tokens/icons';

const steps = [{ id: 'you', label: 'You' }, { id: 'team', label: 'Team' }, { id: 'goals', label: 'Goals' }];
const sizes = [{ value: 'solo', title: 'Just me' }, { value: 'small', title: '2 to 10', description: 'One team' }, { value: 'mid', title: '11 to 50', description: 'Several teams' }, { value: 'large', title: 'More than 50' }];
const goals = [
  { value: 'choose', title: 'Choose dependencies', description: 'Compare packages before adopting one' },
  { value: 'watch', title: 'Watch regressions', description: 'Be told when a dependency gets worse' },
  { value: 'publish', title: 'Publish our own', description: 'Measure the packages we maintain' },
  { value: 'report', title: 'Report to the group', description: 'A monthly review of quality figures' },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [size, setSize] = useState('small');
  const [picked, setPicked] = useState(['choose']);
  const done = step === steps.length;
  const blocked = (step === 0 && name.trim() === '') || (step === 2 && picked.length === 0);

  return (
    <OnboardingTemplate
      brand={<Label tone="ink">◆ Gridline Registry</Label>}
      steps={done ? undefined : <Steps steps={steps} current={step} onStepClick={setStep} />}
      footer={done ? <Button variant="solid" icon={<ArrowRightIcon />}>Open the catalogue</Button> : (
        <>
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
          <Button variant="solid" icon={<ArrowRightIcon />} disabled={blocked} onClick={() => setStep(step + 1)}>{step === steps.length - 1 ? 'Finish' : 'Continue'}</Button>
        </>
      )}
    >
      {step === 0 && (
        <>
          <Heading level={1} size="xl">What should we call you?</Heading>
          <Text tone="muted">It appears on what you publish and in your team's activity.</Text>
          <Field label="Your name">{(ids) => <Input {...ids} value={name} onChange={(event) => setName(event.target.value)} placeholder="Ines Carvalho" autoComplete="name" />}</Field>
        </>
      )}
      {step === 1 && (
        <>
          <Heading level={1} size="xl">How many people will use it?</Heading>
          <Text tone="muted">This sets the plan we suggest. You can change it later.</Text>
          <ChoiceCard aria-label="Team size" options={sizes} value={size} onChange={setSize} columns={2} />
        </>
      )}
      {step === 2 && (
        <>
          <Heading level={1} size="xl">What do you want to do first?</Heading>
          <Text tone="muted">Pick one or more. We will set up your home page for them.</Text>
          <ChoiceCard type="checkbox" aria-label="Goals" options={goals} value={picked} onChange={setPicked} columns={1} />
        </>
      )}
      {done && <Result status="success" title={`Welcome, ${name.trim() || 'there'}`} description={`Your workspace is ready, set up for ${picked.length} goal${picked.length === 1 ? '' : 's'}.`} />}
    </OnboardingTemplate>
  );
}

const meta = { title: 'Pages/Onboarding', component: Onboarding, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Onboarding>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
