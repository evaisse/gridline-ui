import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { QueryBuilder, type QueryGroup } from './QueryBuilder';

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'licence', label: 'Licence' },
  { name: 'downloads', label: 'Downloads', type: 'number' as const },
  { name: 'score', label: 'Score', type: 'number' as const },
];

const meta = { title: 'Organisms/Forms/QueryBuilder', tags: ['search', 'form'], component: QueryBuilder, args: { fields } } satisfies Meta<typeof QueryBuilder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const SingleGroup: Story = {
  args: { defaultValue: { combinator: 'and', rules: [{ field: 'licence', operator: 'eq', value: 'MIT' }, { field: 'downloads', operator: 'gt', value: '10000' }] } },
};
export const Nested: Story = {
  args: {
    defaultValue: {
      combinator: 'and',
      rules: [
        { field: 'licence', operator: 'eq', value: 'MIT' },
        { combinator: 'or', rules: [{ field: 'name', operator: 'starts', value: 'tess' }, { field: 'name', operator: 'contains', value: 'quill' }, { field: 'score', operator: 'gte', value: '70' }] },
      ],
    },
  },
};

function Live() {
  const [query, setQuery] = useState<QueryGroup>({ combinator: 'or', rules: [{ field: 'name', operator: 'contains', value: 'castor' }] });
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <QueryBuilder fields={fields} value={query} onChange={setQuery} />
      <pre style={{ margin: 0, fontFamily: 'var(--gl-font-mono)', fontSize: 11, whiteSpace: 'pre-wrap', color: 'var(--gl-ink-2)' }}>{JSON.stringify(query, null, 2)}</pre>
    </div>
  );
}
export const WithOutput: Story = { render: () => <Live /> };
