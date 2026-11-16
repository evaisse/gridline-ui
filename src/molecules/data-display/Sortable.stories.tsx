import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, Tag } from '../../atoms';
import { Sortable } from './Sortable';

const steps = [
  { id: 'lint', content: 'Lint sources' },
  { id: 'test', content: 'Run unit tests' },
  { id: 'build', content: 'Build tessera bundle' },
  { id: 'publish', content: 'Publish to registry' },
];
const meta = { title: 'Molecules/Data display/Sortable', tags: ['list', 'selection'], component: Sortable, args: { label: 'Pipeline steps', defaultItems: steps }, decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>] } satisfies Meta<typeof Sortable>;
export default meta;

export const Default: StoryObj<typeof meta> = {};

export const RichRows: StoryObj<typeof meta> = {
  args: {
    label: 'Package priority',
    defaultItems: [
      { id: 'tessera', content: <><strong>tessera</strong><Label size="xs" style={{ marginLeft: 'auto' }}>4.2.0</Label></> },
      { id: 'quillmark', content: <><strong>quillmark</strong><Tag style={{ marginLeft: 'auto' }}>beta</Tag></> },
      { id: 'castor', content: <><strong>castor</strong><Label size="xs" style={{ marginLeft: 'auto' }}>1.0.3</Label></> },
    ],
  },
};

export const Single: StoryObj<typeof meta> = { args: { label: 'One item', defaultItems: steps.slice(0, 1) } };
