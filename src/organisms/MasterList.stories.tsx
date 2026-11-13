import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MasterList, type MasterListItem } from './MasterList';

const items: MasterListItem[] = [
  { id: 'tessera', title: 'tessera', meta: 'Nov 12, 2026', icon: '◆', trailing: '4.2.0' },
  { id: 'quillmark', title: 'quillmark', meta: 'Nov 09, 2026', icon: '◇', trailing: '1.9.3' },
  { id: 'harrow', title: 'harrow', meta: 'Nov 05, 2026', icon: '▲', trailing: '0.14.0' },
  { id: 'lumen-fmt', title: 'lumen-fmt', meta: 'Oct 29, 2026', icon: '●', trailing: '3.0.1' },
  { id: 'castor', title: 'castor', meta: 'Oct 28, 2026', icon: '■', trailing: '2.7.0' },
];

const meta = {
  title: 'Organisms/MasterList',
  component: MasterList,
  args: { items, selectedId: 'tessera', metaHeader: 'Released ↓', titleHeader: 'Package', searchable: true },
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selectedId);
    return <MasterList {...args} selectedId={selected} onSelect={setSelected} />;
  },
  decorators: [(Story) => <div style={{ maxWidth: 440, border: '1px solid var(--gl-rule-strong)' }}><Story /></div>],
} satisfies Meta<typeof MasterList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutSearch: Story = { args: { searchable: false } };
