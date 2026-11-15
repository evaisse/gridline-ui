import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Button } from '../atoms';
import { SearchField } from '../molecules';
import { TopBar } from './TopBar';

const links = [{ id: 'catalogue', label: 'Catalogue' }, { id: 'method', label: 'Method' }, { id: 'pricing', label: 'Pricing' }, { id: 'docs', label: 'Docs' }];
const meta = { title: 'Organisms/Navigation/TopBar', tags: ['shell', 'wayfinding'], component: TopBar, parameters: { layout: 'fullscreen' }, args: { brand: '◆ Gridline Registry', links, current: 'catalogue' } } satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Marketing: Story = { args: { actions: <><Button size="sm">Sign in</Button><Button size="sm" variant="solid">Get started</Button></> } };
export const Application: Story = { args: { children: <SearchField placeholder="Search packages" />, actions: <Avatar fallback="ic" /> } };
export const BrandOnly: Story = { args: { links: [] } };
