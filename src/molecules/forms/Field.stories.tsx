import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Input, Switch, Textarea } from '../../atoms';
import { Field, FieldSet } from './Field';

const meta = { title: 'Molecules/Forms/Field', tags: ['form', 'text'], component: Field, decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>] } satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithDescription: Story = { args: { label: 'Package name', description: 'Lowercase letters, digits and dashes.', children: (ids) => <Input {...ids} placeholder="tessera" /> } };
export const WithError: Story = { args: { label: 'Package name', error: 'That name is already taken.', children: (ids) => <Input {...ids} defaultValue="tessera" /> } };
export const Horizontal: Story = { args: { label: 'Publish as public', description: 'Anyone can install it.', orientation: 'horizontal', children: (ids) => <Switch {...ids} defaultChecked /> } };
export const Group: Story = {
  args: { label: '', children: () => null },
  render: () => (
    <FieldSet legend="New package">
      <Field label="Name">{(ids) => <Input {...ids} />}</Field>
      <Field label="Description">{(ids) => <Textarea {...ids} />}</Field>
      <Field label="Include type definitions" orientation="horizontal">{(ids) => <Checkbox {...ids} defaultChecked />}</Field>
    </FieldSet>
  ),
};
