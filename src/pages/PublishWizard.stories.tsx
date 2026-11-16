import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Heading, Input, NativeSelect, Switch, Text, Textarea } from '../atoms';
import { Field, FileUpload, Result, Steps, TagsInput } from '../molecules';
import { PageHeader, SpecSheet } from '../organisms';
import { WizardTemplate } from '../templates';
import { ArrowRightIcon } from '../tokens/icons';

const steps = [{ id: 'details', label: 'Details', description: 'Name and licence' }, { id: 'files', label: 'Files', description: 'Upload the tarball' }, { id: 'review', label: 'Review', description: 'Check before publishing' }];

function PublishWizard() {
  const [current, setCurrent] = useState(0);
  const [name, setName] = useState('quillmark-tables');
  const [licence, setLicence] = useState('MIT');
  const [keywords, setKeywords] = useState(['markdown', 'tables']);
  const done = current === steps.length;

  return (
    <WizardTemplate
      header={<PageHeader title="Publish a package" breadcrumb={[{ label: 'Packages', href: '#' }, { label: 'New' }]} description="Three steps. Nothing is public until the last one." />}
      steps={<Steps steps={steps} current={current} onStepClick={setCurrent} />}
      footer={done ? undefined : (
        <>
          <Button disabled={current === 0} onClick={() => setCurrent(current - 1)}>Back</Button>
          <Button variant="solid" icon={<ArrowRightIcon />} disabled={name.trim() === ''} onClick={() => setCurrent(current + 1)}>{current === steps.length - 1 ? 'Publish' : 'Continue'}</Button>
        </>
      )}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 16, maxWidth: 560 }}>
        {current === 0 && (
          <>
            <Heading level={2} size="lg">Describe the package</Heading>
            <Field label="Name" description="Lowercase letters, digits and dashes.">{(ids) => <Input {...ids} value={name} onChange={(event) => setName(event.target.value)} />}</Field>
            <Field label="Description">{(ids) => <Textarea {...ids} rows={3} defaultValue="Table support for quillmark, with column alignment." />}</Field>
            <Field label="Licence">{(ids) => <NativeSelect {...ids} value={licence} onChange={(event) => setLicence(event.target.value)}><option>MIT</option><option>Apache-2.0</option><option>ISC</option></NativeSelect>}</Field>
            <Field label="Keywords">{(ids) => <TagsInput id={ids.id} value={keywords} onChange={setKeywords} />}</Field>
          </>
        )}
        {current === 1 && (
          <>
            <Heading level={2} size="lg">Upload the release</Heading>
            <FileUpload multiple={false} title="Drop the tarball or browse" hint="A .tgz archive, 20 MB at most" accept=".tgz" />
            <Field label="Publish as a pre-release" orientation="horizontal">{(ids) => <Switch {...ids} />}</Field>
          </>
        )}
        {current === 2 && (
          <>
            <Heading level={2} size="lg">Check before publishing</Heading>
            <SpecSheet columns={1} specs={[{ label: 'Name', value: name }, { label: 'Licence', value: licence }, { label: 'Keywords', value: keywords.join(', ') || '—' }, { label: 'Visibility', value: 'Public' }]} />
            <Text tone="muted">Publishing runs the measurements once; the first figures appear within a few minutes.</Text>
          </>
        )}
        {done && <Result status="success" title={`${name} is published`} description="The first measurements are running." actions={<Button onClick={() => setCurrent(0)}>Publish another</Button>} />}
      </div>
    </WizardTemplate>
  );
}

const meta = { title: 'Pages/Publish wizard', component: PublishWizard, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof PublishWizard>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
