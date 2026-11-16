import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Switch, Text } from '../../atoms';
import { Field, KeyValue } from '../../molecules';
import { Wizard, type WizardStep } from './Wizard';

const base: WizardStep[] = [
  { id: 'details', label: 'Details', description: 'Name and licence', content: <Field label="Package name">{(ids) => <Input {...ids} defaultValue="castor" />}</Field> },
  { id: 'files', label: 'Files', description: 'Upload the tarball', content: <Text tone="muted">castor-2.4.0.tgz, 182 kB</Text> },
  { id: 'review', label: 'Review', content: <Text>Check the details, then publish.</Text> },
];

const meta = { title: 'Organisms/Forms/Wizard', tags: ['steps', 'form'], component: Wizard, args: { steps: base } } satisfies Meta<typeof Wizard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const MiddleStep: Story = { args: { defaultCurrent: 1 } };

function Gated() {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const steps: WizardStep[] = [
    { id: 'name', label: 'Name', valid: name.trim().length > 2, content: <Field label="Package name" description="At least three characters.">{(ids) => <Input {...ids} value={name} onChange={(e) => setName(e.target.value)} />}</Field> },
    { id: 'terms', label: 'Terms', valid: agreed, content: <Field label="I accept the registry terms" orientation="horizontal">{(ids) => <Switch id={ids.id} checked={agreed} onCheckedChange={setAgreed} />}</Field> },
    { id: 'done', label: 'Publish', content: <KeyValue label="Package">{name}</KeyValue> },
  ];
  return <Wizard steps={steps} finishLabel="Publish" />;
}
export const ValidationGated: Story = { render: () => <Gated /> };
