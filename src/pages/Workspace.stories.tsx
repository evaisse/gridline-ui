import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar, Button, Label } from '../atoms';
import { NavItem, SearchField, Stat, Timeline } from '../molecules';
import { ActivityFeed, NotificationCenter, PageHeader, StatGroup, TopBar } from '../organisms';
import { AppShellTemplate } from '../templates';
import { PlusIcon } from '../tokens/icons';

const sections = [{ id: 'overview', label: 'Overview' }, { id: 'packages', label: 'Packages', count: 42 }, { id: 'builds', label: 'Builds', count: 7 }, { id: 'members', label: 'Members', count: 36 }, { id: 'tokens', label: 'Access tokens' }, { id: 'settings', label: 'Settings' }];
const now = new Date(2026, 10, 16, 15, 0);
const activity = [
  { id: 'a', actor: 'Ines Carvalho', action: 'published', target: 'tessera@4.2.0', at: new Date(2026, 10, 16, 14, 20), detail: 'Coverage up 2.1 points, build time unchanged.' },
  { id: 'b', actor: 'Tomas Reyes', action: 'opened', target: '#312 parser size', at: new Date(2026, 10, 16, 11, 5) },
  { id: 'c', actor: 'Hana Sato', action: 'deprecated', target: 'castor@0.8.x', at: new Date(2026, 10, 15, 17, 45) },
  { id: 'd', actor: 'Jonas Whit', action: 'rotated a token for', target: 'release automation', at: new Date(2026, 10, 15, 9, 30) },
  { id: 'e', actor: 'Amara Diallo', action: 'joined', target: 'Tessera Labs', at: new Date(2026, 10, 13, 16, 10) },
];
const notifications = [
  { id: '1', title: 'Size regression on quillmark', body: 'The parser module grew by 6 kB.', time: '12 min', read: false, tone: 'warn' as const },
  { id: '2', title: 'tessera 4.2.0 passed all checks', time: '40 min', read: false, tone: 'pos' as const },
  { id: '3', title: 'Invoice for November is ready', time: 'Yesterday', read: true },
];
const upcoming = [
  { id: 'a', title: 'Release freeze', time: 'Nov 18', tone: 'warn' as const, children: 'No publishing between 02:00 and 04:00 UTC.' },
  { id: 'b', title: 'castor 3.0 planned', time: 'Nov 24' },
  { id: 'c', title: 'Token for CI expires', time: 'Nov 30', tone: 'neg' as const },
];

function Workspace() {
  const [section, setSection] = useState('overview');
  return (
    <AppShellTemplate
      header={<TopBar brand="◆ Gridline Registry" actions={<><NotificationCenter defaultItems={notifications} /><Avatar fallback="ic" /></>}><SearchField placeholder="Search packages, builds, people" /></TopBar>}
      nav={sections.map((item) => <NavItem key={item.id} count={item.count} selected={item.id === section} onClick={() => setSection(item.id)}>{item.label}</NavItem>)}
      aside={<div style={{ display: 'grid', gap: 12, padding: 16 }}><Label tone="ink">Coming up</Label><Timeline events={upcoming} /></div>}
      footer={<Label size="xs">Tessera Labs · Team plan · 36 seats</Label>}
    >
      <PageHeader title="Overview" breadcrumb={[{ label: 'Tessera Labs', href: '#' }, { label: 'Overview' }]} description="What changed in your organisation this week." actions={<Button variant="solid" icon={<PlusIcon />}>New package</Button>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 16, padding: 16 }}>
        <StatGroup>
          <Stat label="Packages" value="42" note="+2" />
          <Stat label="Weekly installs" value="728" unit="k" note="+11%" tone="pos" />
          <Stat label="Failing builds" value="1" tone="neg" />
          <Stat label="Median score" value="62.5" unit="%" />
        </StatGroup>
        <ActivityFeed entries={activity} now={now} />
      </div>
    </AppShellTemplate>
  );
}

const meta = { title: 'Pages/Workspace', component: Workspace, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Workspace>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
