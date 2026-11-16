import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms';
import { DataForm, type DataFormField, type DataFormValues } from './DataForm';

const fields: DataFormField[] = [
  { name: 'name', label: 'Package name', type: 'text', required: true, placeholder: 'tessera' },
  { name: 'licence', label: 'Licence', type: 'select', required: true, options: [{ value: 'mit', label: 'MIT' }, { value: 'apache', label: 'Apache-2.0' }, { value: 'isc', label: 'ISC' }] },
  { name: 'maxSize', label: 'Max tarball size (MB)', type: 'number', min: 1, max: 200, step: 5 },
  { name: 'release', label: 'First release', type: 'date' },
  { name: 'public', label: 'Public registry', type: 'switch', description: 'Anyone can install this package.' },
  { name: 'summary', label: 'Summary', type: 'textarea', span: 2, placeholder: 'One paragraph for the registry page' },
];

const meta = { title: 'Organisms/Forms/DataForm', tags: ['form'], component: DataForm, args: { fields } } satisfies Meta<typeof DataForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = {
  args: { columns: 2, resettable: true, defaultValue: { name: 'quillmark', licence: 'mit', maxSize: 25, release: '2026-03-14', public: true, summary: 'Markdown renderer with a small footprint.' } },
};

function Result() {
  const [result, setResult] = useState<DataFormValues | null>(null);
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <DataForm fields={fields.slice(0, 4)} columns={2} submitLabel="Publish" onSubmit={setResult} />
      <Text variant="small" tone="muted">{result ? JSON.stringify(result) : 'Submit with an empty name to see the required message.'}</Text>
    </div>
  );
}
export const SubmitResult: Story = { render: () => <Result /> };
