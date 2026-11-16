import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar, Button, Cell, Grid, Heading, Tag, Text } from '../atoms';
import { Item, ItemGroup, Tabs } from '../molecules';
import { ActivityFeed, IndexCard, SpecSheet } from '../organisms';
import { ProfileTemplate } from '../templates';
import { cards } from './fixtures';

const tabs = [{ id: 'activity', label: 'Activity' }, { id: 'packages', label: 'Packages' }, { id: 'members', label: 'Members' }];
const now = new Date(2026, 10, 16, 15, 0);
const activity = [
  { id: 'a', actor: 'Ines Carvalho', action: 'published', target: 'tessera@4.2.0', at: new Date(2026, 10, 16, 14, 20) },
  { id: 'b', actor: 'Tomas Reyes', action: 'commented on', target: '#312 parser size', at: new Date(2026, 10, 16, 11, 5), detail: 'The barrel export pulls in the whole locale table.' },
  { id: 'c', actor: 'Hana Sato', action: 'deprecated', target: 'castor@0.8.x', at: new Date(2026, 10, 15, 17, 45) },
  { id: 'd', actor: 'Ines Carvalho', action: 'added a maintainer to', target: 'quillmark', at: new Date(2026, 10, 14, 9, 30) },
];
const members = [['Ines Carvalho', 'Platform lead', 'Owner'], ['Tomas Reyes', 'Parser maintainer', 'Maintainer'], ['Hana Sato', 'Release engineer', 'Maintainer'], ['Jonas Whit', 'Automation', 'Member']];
const initials = (name: string) => name.split(' ').map((part) => part[0]).join('');

function Profile() {
  const [tab, setTab] = useState('activity');
  return (
    <ProfileTemplate
      header={
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Avatar size="lg" fallback="tl" />
            <div style={{ display: 'grid', gap: 4 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}><Heading level={1} size="xl">Tessera Labs</Heading><Tag dot tone="pos">Verified</Tag></div>
              <Text tone="muted">Parsers and formatters, measured on every release.</Text>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}><Button>Follow</Button><Button variant="solid">Contact</Button></div>
        </div>
      }
      facts={<SpecSheet columns={1} specs={[{ label: 'Packages', value: 42 }, { label: 'Members', value: 36 }, { label: 'Weekly installs', value: '1.2M' }, { label: 'Median score', value: '62.5%' }, { label: 'Since', value: '2021' }, { label: 'Licence', value: 'MIT' }]} />}
      tabs={<Tabs items={tabs} value={tab} onChange={setTab} fill={false} style={{ border: 0 }} />}
    >
      {tab === 'activity' && <ActivityFeed entries={activity} now={now} />}
      {tab === 'packages' && <Grid columns="repeat(auto-fill, minmax(260px, 1fr))">{cards.map((card) => <Cell key={card.title} pad="none"><IndexCard {...card} /></Cell>)}</Grid>}
      {tab === 'members' && <ItemGroup>{members.map(([name, role, access]) => <Item key={name} media={<Avatar fallback={initials(name)} />} title={name} description={role} actions={<Tag>{access}</Tag>} />)}</ItemGroup>}
    </ProfileTemplate>
  );
}

const meta = { title: 'Pages/Profile', component: Profile, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Profile>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
