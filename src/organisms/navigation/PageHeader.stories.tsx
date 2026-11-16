import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Tag } from '../../atoms';
import { Tabs } from '../../molecules';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Organisms/Navigation/PageHeader', tags: ['wayfinding', 'shell'], component: PageHeader, parameters: { layout: 'fullscreen' },
  args: { title: 'tessera', breadcrumb: [{ label: 'Packages', href: '#' }, { label: 'Parsing', href: '#' }, { label: 'tessera' }], description: 'An incremental parser toolkit with error recovery and a compact syntax tree.', meta: <Tag dot tone="pos">Stable</Tag>, actions: <><Button>Compare</Button><Button variant="solid">Install</Button></> },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithTabs: Story = { args: { children: <Tabs fill={false} value="overview" items={[{ id: 'overview', label: 'Overview' }, { id: 'versions', label: 'Versions' }, { id: 'dependents', label: 'Dependents' }]} /> } };
export const TitleOnly: Story = { args: { breadcrumb: undefined, description: undefined, meta: undefined, actions: undefined, title: 'Settings' } };
