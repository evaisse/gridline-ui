import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms';
import { Popconfirm } from './Popconfirm';

const meta = {
  title: 'Molecules/Overlays/Popconfirm', tags: ['popup', 'action'],
  component: Popconfirm,
  args: { title: 'Delete quillmark 0.9?', description: 'Dependants will fail to resolve this version.', confirmLabel: 'Delete', children: <Button>Delete version</Button> },
  decorators: [(Story) => <div style={{ padding: '120px 80px' }}><Story /></div>],
} satisfies Meta<typeof Popconfirm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OpenBelow: Story = { args: { defaultOpen: true, side: 'bottom' } };
export const TitleOnly: Story = { args: { defaultOpen: true, description: undefined, title: 'Discard unsaved changes?', confirmLabel: 'Discard' } };

function Demo() {
  const [log, setLog] = useState('Nothing yet');
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Popconfirm title="Yank castor 1.2.0?" onConfirm={() => setLog('Yanked')} onCancel={() => setLog('Cancelled')}><Button variant="solid">Yank</Button></Popconfirm>
      <span>{log}</span>
    </div>
  );
}
export const Interactive: Story = { render: () => <Demo /> };
