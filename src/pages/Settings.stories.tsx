import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Input, NativeSelect, Switch, Tag, Textarea } from '../atoms';
import { Banner, Field, FileUpload, NavItem, NumberInput, TagsInput } from '../molecules';
import { PageHeader } from '../organisms';
import { SettingsSection, SettingsTemplate } from '../templates';

const sections = [{ id: 'general', label: 'General' }, { id: 'members', label: 'Members', count: 36 }, { id: 'billing', label: 'Billing' }, { id: 'tokens', label: 'Access tokens', count: 4 }, { id: 'alerts', label: 'Alerts' }];

function Settings() {
  const [section, setSection] = useState('general');
  return (
    <SettingsTemplate
      header={
        <>
          <Banner tone="warn" label="Billing" action={<Button size="sm">Update card</Button>}>The card on file expires this month.</Banner>
          <PageHeader title="Organisation settings" breadcrumb={[{ label: 'Tessera Labs', href: '#' }, { label: 'Settings' }]} meta={<Tag>Team plan</Tag>} description="Changes apply to every member of the organisation." />
        </>
      }
      nav={sections.map((item) => <NavItem key={item.id} count={item.count} selected={item.id === section} onClick={() => setSection(item.id)}>{item.label}</NavItem>)}
      footer={<><Button>Discard</Button><Button variant="solid">Save changes</Button></>}
    >
      <SettingsSection title="Profile" description="Shown on your public page and on every package you publish.">
        <Field label="Organisation name">{(ids) => <Input {...ids} defaultValue="Tessera Labs" />}</Field>
        <Field label="Description">{(ids) => <Textarea {...ids} rows={3} defaultValue="Parsers and formatters, measured." />}</Field>
        <Field label="Keywords" description="Press Enter after each one.">{(ids) => <TagsInput id={ids.id} defaultValue={['parser', 'formatter']} />}</Field>
        <Field label="Logo">{() => <FileUpload multiple={false} title="Drop an image or browse" hint="PNG or SVG, 1 MB at most" accept="image/*" />}</Field>
      </SettingsSection>
      <SettingsSection title="Publishing" description="Rules applied to every release before it is accepted.">
        <Field label="Default licence">{(ids) => <NativeSelect {...ids} defaultValue="MIT"><option>MIT</option><option>Apache-2.0</option><option>ISC</option></NativeSelect>}</Field>
        <Field label="Minimum coverage" description="Releases under this figure are rejected. In percent.">{(ids) => <NumberInput id={ids.id} defaultValue={60} min={0} max={100} step={5} />}</Field>
        <Field label="Require two-factor sign-in to publish" orientation="horizontal">{(ids) => <Switch {...ids} defaultChecked />}</Field>
        <Field label="Allow pre-release versions" orientation="horizontal">{(ids) => <Switch {...ids} />}</Field>
      </SettingsSection>
      <SettingsSection title="Danger zone" description="These actions cannot be undone.">
        <div><Button>Transfer ownership</Button></div>
        <div><Button>Delete organisation</Button></div>
      </SettingsSection>
    </SettingsTemplate>
  );
}

const meta = { title: 'Pages/Settings', component: Settings, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Settings>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
