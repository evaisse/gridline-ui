import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Label } from '../../atoms';
import { BoldIcon, CopyIcon, DownloadIcon, FileIcon, ItalicIcon, LinkIcon, ListIcon, PlusIcon, RedoIcon, SearchIcon, UnderlineIcon, UndoIcon, UploadIcon } from '../../tokens/icons';
import { Ribbon, type RibbonTab } from './Ribbon';

const tabs: RibbonTab[] = [
  {
    id: 'home', label: 'Home', groups: [
      { id: 'file', label: 'Package', commands: [
        { id: 'new', label: 'New', icon: <PlusIcon />, size: 'large' },
        { id: 'open', label: 'Import', icon: <UploadIcon />, size: 'large' },
        { id: 'export', label: 'Export', icon: <DownloadIcon /> },
        { id: 'copy', label: 'Duplicate', icon: <CopyIcon /> },
        { id: 'pin', label: 'Pin', icon: <FileIcon />, disabled: true },
      ] },
      { id: 'text', label: 'Notes', commands: [
        { id: 'bold', label: 'Bold', icon: <BoldIcon /> },
        { id: 'italic', label: 'Italic', icon: <ItalicIcon /> },
        { id: 'underline', label: 'Underline', icon: <UnderlineIcon /> },
      ] },
      { id: 'history', label: 'History', commands: [
        { id: 'undo', label: 'Undo', icon: <UndoIcon /> },
        { id: 'redo', label: 'Redo', icon: <RedoIcon /> },
      ] },
    ],
  },
  {
    id: 'insert', label: 'Insert', groups: [
      { id: 'links', label: 'Links', commands: [{ id: 'link', label: 'Link', icon: <LinkIcon />, size: 'large' }, { id: 'list', label: 'Changelog', icon: <ListIcon />, size: 'large' }] },
    ],
  },
  { id: 'review', label: 'Review', groups: [{ id: 'find', label: 'Find', commands: [{ id: 'search', label: 'Search', icon: <SearchIcon />, size: 'large' }] }] },
];

function Demo({ collapsed }: { collapsed?: boolean }) {
  const [last, setLast] = useState('none');
  const [bold, setBold] = useState(false);
  const shown = tabs.map((tab) => ({ ...tab, groups: tab.groups.map((g) => ({ ...g, commands: g.commands.map((c) => (c.id === 'bold' ? { ...c, pressed: bold } : c)) })) }));
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Ribbon tabs={shown} defaultCollapsed={collapsed} onCommand={(id) => { setLast(id); if (id === 'bold') setBold(!bold); }} aria-label="Package commands" />
      <Label>Last command: {last}</Label>
    </div>
  );
}

const meta = { title: 'Organisms/Actions/Ribbon', tags: ['action', 'shell', 'menu'], component: Demo, parameters: { layout: 'fullscreen' }, decorators: [(Story) => <div style={{ padding: 16 }}><Story /></div>] } satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Arrow keys move between tabs. Bold is a toggle. */
export const Default: Story = {};
/** Tabs only: choosing a tab opens its commands until one is used. */
export const Collapsed: Story = { args: { collapsed: true } };
