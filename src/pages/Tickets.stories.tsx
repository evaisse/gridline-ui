import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar, Button, Heading, Label, NativeSelect, Numeric, Tag, Text, Textarea } from '../atoms';
import { Breadcrumb, Empty, SearchField, Stat, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs } from '../molecules';
import {
  BarChart, ChartFrame, PieChart, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset, SidebarItem,
  SidebarProvider, SidebarTrigger, SpecSheet, StatGroup, Toolbar, ToolbarCell, Trace,
} from '../organisms';
import { QueueTemplate } from '../templates';
import { AlertIcon, ChatIcon, CheckIcon, FileIcon, PlusIcon, SearchIcon } from '../tokens/icons';
import { ticketActivity, ticketCategories, ticketFlow, ticketFlowSeries, tickets, type Ticket } from './appFixtures';

const statusTone = { Open: 'info', Pending: 'warn', Solved: 'pos' } as const;
const priorityTone = { Urgent: 'neg', High: 'warn', Normal: 'neutral', Low: 'neutral' } as const;
const statusTabs = [{ id: 'all', label: 'All' }, { id: 'Open', label: 'Open' }, { id: 'Pending', label: 'Pending' }, { id: 'Solved', label: 'Solved' }];

/** Time left before the response target, or how long ago it was missed. */
function Sla({ minutes }: { minutes: number }) {
  if (minutes >= 600) return <Label size="xs">Met</Label>;
  const tone = minutes < 0 ? 'neg' : minutes < 60 ? 'warn' : 'neutral';
  const abs = Math.abs(minutes);
  const text = abs >= 60 ? `${Math.floor(abs / 60)}h ${abs % 60}m` : `${abs}m`;
  return <Tag tone={tone}>{minutes < 0 ? `−${text}` : text}</Tag>;
}

function TicketPanel({ ticket }: { ticket: Ticket }) {
  return (
    <>
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Label tone="ink">{ticket.id}</Label>
          <Tag dot tone={statusTone[ticket.status]}>{ticket.status}</Tag>
          <Tag tone={priorityTone[ticket.priority]}>{ticket.priority}</Tag>
        </div>
        <Heading level={2} size="lg">{ticket.subject}</Heading>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Avatar size="sm" fallback={ticket.requester.split(' ').map((part) => part[0]).join('')} />
        <Text variant="small">{ticket.body}</Text>
      </div>
      <SpecSheet
        columns={1}
        specs={[
          { label: 'Requester', value: ticket.requester },
          { label: 'Assignee', value: ticket.assignee },
          { label: 'Category', value: ticket.category },
          { label: 'Response target', value: <Sla minutes={ticket.sla} /> },
        ]}
      />
      <Trace title="Activity" steps={ticketActivity} />
      <div style={{ display: 'grid', gap: 8 }}>
        <Textarea rows={3} placeholder="Write a reply" aria-label="Reply" />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button icon={<CheckIcon />}>Solve</Button>
          <Button variant="solid" icon={<ChatIcon />}>Reply</Button>
        </div>
      </div>
    </>
  );
}

function Tickets() {
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('any');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(tickets[0].id);

  const visible = tickets.filter((ticket) =>
    (status === 'all' || ticket.status === status)
    && (priority === 'any' || ticket.priority === priority)
    && `${ticket.id} ${ticket.subject} ${ticket.requester}`.toLowerCase().includes(query.toLowerCase()));
  const selected = visible.find((ticket) => ticket.id === selectedId) ?? visible[0];

  return (
    <SidebarProvider style={{ minHeight: '100dvh' }}>
      <Sidebar>
        <SidebarHeader><SidebarTrigger /><Label tone="ink">Helpdesk</Label></SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Queues">
            <SidebarItem icon={<ChatIcon />} badge={128} active>All tickets</SidebarItem>
            <SidebarItem icon={<FileIcon />} badge={23}>Assigned to me</SidebarItem>
            <SidebarItem icon={<SearchIcon />} badge={14}>Unassigned</SidebarItem>
            <SidebarItem icon={<AlertIcon />} badge={3}>Target missed</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter><Label size="xs">4 agents online</Label></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <QueueTemplate
          header={
            <>
              <div style={{ display: 'grid', gap: 4 }}>
                <Breadcrumb items={[{ label: 'Helpdesk', href: '#' }, { label: 'All tickets' }]} />
                <Heading level={1} size="xl">Support queue</Heading>
              </div>
              <Button variant="solid" icon={<PlusIcon />}>New ticket</Button>
            </>
          }
          stats={
            <StatGroup>
              <Stat label="Open tickets" value="128" note="+9 today" />
              <Stat label="Unassigned" value="14" tone="warn" />
              <Stat label="Median first reply" value="42" unit="min" note="target 60" tone="pos" />
              <Stat label="Response target missed" value="3" tone="neg" />
            </StatGroup>
          }
          charts={
            <>
              <ChartFrame title="Opened and solved" description="Last seven days" legend={ticketFlowSeries} height={200}>
                <BarChart data={ticketFlow} xKey="day" series={ticketFlowSeries} />
              </ChartFrame>
              <ChartFrame title="Open tickets by category" legend={ticketCategories} dots={false} height={200}>
                <PieChart data={ticketCategories} donut center={<><Numeric variant="display">128</Numeric><Label size="xs">Open</Label></>} />
              </ChartFrame>
            </>
          }
          toolbar={
            <>
              <Tabs items={statusTabs} value={status} onChange={setStatus} style={{ border: 0, borderBottom: '1px solid var(--gl-rule-strong)' }} />
              <Toolbar style={{ flexWrap: 'wrap' }}>
                <ToolbarCell flush grow style={{ minWidth: 200 }}><SearchField placeholder="Search tickets" value={query} onChange={(event) => setQuery(event.target.value)} /></ToolbarCell>
                <ToolbarCell flush style={{ width: 180 }}>
                  <NativeSelect variant="cell" aria-label="Priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                    <option value="any">Any priority</option><option>Urgent</option><option>High</option><option>Normal</option><option>Low</option>
                  </NativeSelect>
                </ToolbarCell>
                <ToolbarCell><Label>{visible.length} of {tickets.length}</Label></ToolbarCell>
              </Toolbar>
            </>
          }
          aside={selected != null ? <TicketPanel ticket={selected} /> : undefined}
        >
          {visible.length === 0 ? (
            <Empty style={{ border: 0 }} icon={<SearchIcon />} title="No ticket matches" description="Change the status, the priority or the search." />
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <Table style={{ border: 0 }}>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ width: 84 }}>Ticket</TableHead><TableHead>Subject</TableHead><TableHead>Assignee</TableHead>
                    <TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Target</TableHead><TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visible.map((ticket) => (
                    <TableRow key={ticket.id} aria-selected={ticket.id === selected?.id} onClick={() => setSelectedId(ticket.id)} style={{ cursor: 'pointer' }}>
                      <TableCell><Label tone="ink">{ticket.id}</Label></TableCell>
                      <TableCell>
                        <button type="button" onClick={() => setSelectedId(ticket.id)} style={{ all: 'unset', cursor: 'pointer' }}>{ticket.subject}</button>
                        <Text variant="small" tone="muted">{ticket.requester} · {ticket.category}</Text>
                      </TableCell>
                      <TableCell style={{ whiteSpace: 'nowrap' }}>{ticket.assignee}</TableCell>
                      <TableCell><Tag tone={priorityTone[ticket.priority]}>{ticket.priority}</Tag></TableCell>
                      <TableCell><Tag dot tone={statusTone[ticket.status]}>{ticket.status}</Tag></TableCell>
                      <TableCell><Sla minutes={ticket.sla} /></TableCell>
                      <TableCell style={{ whiteSpace: 'nowrap' }}><Label>{ticket.updated}</Label></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </QueueTemplate>
      </SidebarInset>
    </SidebarProvider>
  );
}

const meta = { title: 'Pages/Tickets', component: Tickets, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Tickets>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
