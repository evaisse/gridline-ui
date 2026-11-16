import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms';
import { Citation, Sources, type Source } from './Sources';

const sources: Source[] = [
  { id: 'a', title: 'tessera: release policy', origin: 'docs/tessera/releases.md', excerpt: 'Minor versions ship every four weeks; patches ship as needed.' },
  { id: 'b', title: 'quillmark changelog', origin: 'registry.example/quillmark', excerpt: 'Version 2.0 drops support for the legacy parser.', href: '#' },
  { id: 'c', title: 'castor migration guide', origin: 'docs/castor/migrate.md' },
];

const meta = { title: 'Organisms/Assistant/Sources', tags: ['ai', 'list'], component: Sources, args: { sources } } satisfies Meta<typeof Sources>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ActiveCitations: Story = { args: { active: [1, 3] } };
export const WithInlineCitations: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
      <Text>Tessera ships a minor version every four weeks <Citation index={1} />, while quillmark 2.0 removed the legacy parser <Citation index={2} />.</Text>
      <Sources {...args} />
    </div>
  ),
};
export const Single: Story = { args: { sources: sources.slice(0, 1), title: 'Used 1 document' } };
