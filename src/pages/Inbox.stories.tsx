import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar, Button, Heading, Label, Prose, Tag, Textarea } from '../atoms';
import { ListRow, NavItem, SearchField } from '../molecules';
import { TopBar } from '../organisms';
import { InboxTemplate } from '../templates';
import { PencilIcon, SendIcon, TrashIcon } from '../tokens/icons';
import { tickets } from './appFixtures';

const folders = [{ id: 'inbox', label: 'Inbox', count: 8 }, { id: 'mine', label: 'Assigned to me', count: 3 }, { id: 'sent', label: 'Sent' }, { id: 'drafts', label: 'Drafts', count: 1 }, { id: 'archive', label: 'Archive' }];
const mail = tickets.slice(0, 8);

function Inbox() {
  const [folder, setFolder] = useState('inbox');
  const [selectedId, setSelectedId] = useState(mail[0].id);
  const message = mail.find((item) => item.id === selectedId) ?? mail[0];
  const initials = message.requester.split(' ').map((part) => part[0]).join('');

  return (
    <InboxTemplate
      header={<TopBar brand="◆ Helpdesk mail" actions={<Button size="sm" variant="solid" icon={<PencilIcon />}>Compose</Button>}><SearchField placeholder="Search messages" /></TopBar>}
      folders={folders.map((item) => <NavItem key={item.id} count={item.count} selected={item.id === folder} onClick={() => setFolder(item.id)}>{item.label}</NavItem>)}
      list={mail.map((item) => (
        <ListRow key={item.id} meta={item.updated} selected={item.id === selectedId} trailing={item.priority === 'Urgent' ? '!' : undefined} onClick={() => setSelectedId(item.id)}>
          {item.subject}
        </ListRow>
      ))}
    >
      <article style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 16, padding: 24, maxWidth: 760 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Label tone="ink">{message.id}</Label>
          <Tag>{message.category}</Tag>
          <Tag tone={message.priority === 'Urgent' ? 'neg' : 'neutral'}>{message.priority}</Tag>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}><Button size="sm" icon={<TrashIcon />}>Archive</Button></span>
        </div>
        <Heading level={1} size="xl">{message.subject}</Heading>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar fallback={initials} />
          <div style={{ display: 'grid', gap: 2 }}><span>{message.requester}</span><Label size="xs">to support · {message.updated}</Label></div>
        </div>
        <Prose><p>{message.body}</p><p>Could you tell us what to check on our side? We can share the pipeline log if that helps.</p></Prose>
        <div style={{ display: 'grid', gap: 8, paddingTop: 16, borderTop: '1px solid var(--gl-rule)' }}>
          <Textarea rows={4} placeholder={`Reply to ${message.requester}`} aria-label="Reply" />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="solid" icon={<SendIcon />}>Send</Button></div>
        </div>
      </article>
    </InboxTemplate>
  );
}

const meta = { title: 'Pages/Inbox', component: Inbox, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Inbox>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
