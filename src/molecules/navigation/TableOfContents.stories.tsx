import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableOfContents } from './TableOfContents';

const items = [
  { id: 'overview', label: 'Overview', level: 1 },
  { id: 'install', label: 'Installation', level: 1 },
  { id: 'install-registry', label: 'From the registry', level: 2 },
  { id: 'install-source', label: 'From source', level: 2 },
  { id: 'usage', label: 'Usage', level: 1 },
  { id: 'usage-config', label: 'Configuration', level: 2 },
  { id: 'usage-flags', label: 'Flags', level: 3 },
  { id: 'changelog', label: 'Changelog', level: 1 },
];
const meta = { title: 'Molecules/Navigation/TableOfContents', tags: ['wayfinding'], component: TableOfContents, args: { items, activeId: 'install' }, decorators: [(Story) => <div style={{ maxWidth: 260 }}><Story /></div>] } satisfies Meta<typeof TableOfContents>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NestedActive: Story = { args: { activeId: 'usage-flags' } };
export const Short: Story = { args: { items: items.slice(0, 3), activeId: 'overview', label: 'Contents' } };

function Live() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, height: 260 }}>
      <TableOfContents items={items.slice(0, 4)} />
      <div style={{ overflow: 'auto', border: '1px solid var(--gl-rule-strong)', padding: 16 }}>
        {items.slice(0, 4).map((item) => <section key={item.id} id={item.id} style={{ minHeight: 200 }}><h3>{item.label}</h3><p>Notes on {item.label.toLowerCase()} for castor.</p></section>)}
      </div>
    </div>
  );
}
export const ScrollTracking: Story = { render: () => <Live />, decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>] };
