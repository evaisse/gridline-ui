import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileIcon, FolderIcon } from '../../tokens/icons';
import { TreeView } from './TreeView';

const file = (id: string, meta: string) => ({ id, label: id.split('/').pop(), icon: <FileIcon />, meta });
const nodes = [
  { id: 'src', label: 'src', icon: <FolderIcon />, meta: '3', children: [
    { id: 'src/parser', label: 'parser', icon: <FolderIcon />, meta: '2', children: [file('src/parser/lexer.ts', '4 kB'), file('src/parser/parse.ts', '12 kB')] },
    file('src/index.ts', '1 kB'),
    file('src/printer.ts', '6 kB'),
  ] },
  { id: 'test', label: 'test', icon: <FolderIcon />, meta: '1', children: [file('test/parse.test.ts', '9 kB')] },
  file('package.json', '1 kB'),
];
const meta = { title: 'Organisms/Data display/TreeView', tags: ['tree', 'selection'], component: TreeView, args: { nodes, defaultExpanded: ['src', 'src/parser'], selectedId: 'src/parser/parse.ts', 'aria-label': 'Files' }, decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>] } satisfies Meta<typeof TreeView>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsed: Story = { args: { defaultExpanded: [], selectedId: undefined } };
