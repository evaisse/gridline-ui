import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Heading, Label, Meter, Numeric, Switch, Tag, Text } from '../atoms';
import { Alert, Breadcrumb, Stat, ToggleGroup, ToggleGroupItem } from '../molecules';
import {
  AreaChart, BarChart, ChartFrame, DataTable, LineChart, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset,
  SidebarItem, SidebarProvider, SidebarTrigger, StatGroup, Trace, type Column,
} from '../organisms';
import { MonitoringTemplate } from '../templates';
import { AlertIcon, CalendarIcon, GlobeIcon, RefreshIcon, TerminalIcon } from '../tokens/icons';
import {
  capacity, errors, errorSeries, incidents, latency, latencySeries, regionSeries, requests, services, serviceTone, type Service,
} from './appFixtures';

const loadTone = (value: number) => (value >= 80 ? 'neg' : value >= 65 ? 'warn' : 'pos');

const columns: Column<Service>[] = [
  { key: 'name', header: 'Service', render: (row) => row.name, sortValue: (row) => row.name },
  { key: 'region', header: 'Region', width: '110px', render: (row) => <Label>{row.region}</Label>, sortValue: (row) => row.region },
  { key: 'status', header: 'Status', width: '140px', render: (row) => <Tag dot tone={serviceTone[row.status]}>{row.status}</Tag>, sortValue: (row) => row.status },
  { key: 'latency', header: 'p95', numeric: true, width: '100px', render: (row) => (row.status === 'Down' ? '—' : <Numeric unit="ms">{row.latency}</Numeric>), sortValue: (row) => row.latency },
  { key: 'errors', header: 'Errors', numeric: true, width: '100px', render: (row) => <Numeric unit="%">{row.errors.toFixed(2)}</Numeric>, sortValue: (row) => row.errors },
  { key: 'cpu', header: 'CPU', width: '160px', render: (row) => <Meter value={row.cpu} tone={loadTone(row.cpu)} label={`${row.cpu}% CPU`} />, sortValue: (row) => row.cpu },
  { key: 'uptime', header: 'Uptime 30d', numeric: true, width: '120px', render: (row) => <Numeric unit="%">{row.uptime.toFixed(2)}</Numeric>, sortValue: (row) => row.uptime },
];

function Monitoring() {
  return (
    <SidebarProvider style={{ minHeight: '100dvh' }}>
      <Sidebar>
        <SidebarHeader><SidebarTrigger /><Label tone="ink">Operations</Label></SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Supervision">
            <SidebarItem icon={<GlobeIcon />} active>Overview</SidebarItem>
            <SidebarItem icon={<TerminalIcon />} badge={8}>Services</SidebarItem>
            <SidebarItem icon={<AlertIcon />} badge={3}>Incidents</SidebarItem>
            <SidebarItem icon={<CalendarIcon />}>Maintenance</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter><Label size="xs">On call · R. Imai</Label></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <MonitoringTemplate
          header={
            <>
              <div style={{ display: 'grid', gap: 4 }}>
                <Breadcrumb items={[{ label: 'Operations', href: '#' }, { label: 'Overview' }]} />
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Heading level={1} size="xl">Platform status</Heading>
                  <Tag dot tone="warn">2 degraded · 1 down</Tag>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Switch defaultChecked aria-label="Refresh automatically" /><Label>Live</Label></label>
                <ToggleGroup type="single" defaultValue="2h" aria-label="Time range">
                  <ToggleGroupItem value="2h">2H</ToggleGroupItem><ToggleGroupItem value="24h">24H</ToggleGroupItem><ToggleGroupItem value="7d">7D</ToggleGroupItem>
                </ToggleGroup>
                <Button icon={<RefreshIcon />}>Refresh</Button>
              </div>
            </>
          }
          banner={
            <Alert tone="neg" icon={<AlertIcon />} title="billing eu-west is not answering health checks" action={<Button size="sm">Acknowledge</Button>}>
              Started at 09:41. Invoices and seat changes are queued and will be applied once the service is back.
            </Alert>
          }
          stats={
            <StatGroup>
              <Stat label="Availability, 30 days" value="99.93" unit="%" note="target 99.95" tone="warn" />
              <Stat label="p95 latency" value="264" unit="ms" note="target 250" tone="neg" />
              <Stat label="Error rate" value="0.42" unit="%" tone="warn" />
              <Stat label="Requests" value="18.4" unit="k/min" note="+6%" />
            </StatGroup>
          }
          panels={
            <>
              <ChartFrame className="gl-chart--wide" title="Response time" description="registry-api, all regions, milliseconds" meta="Last two hours" legend={latencySeries} height={240}>
                <LineChart data={latency} xKey="time" series={latencySeries} />
              </ChartFrame>
              <ChartFrame title="Requests per minute" description="Thousands, by region" legend={regionSeries} height={220}>
                <AreaChart data={requests} xKey="time" series={regionSeries} stacked yFormat={(value) => `${value}k`} />
              </ChartFrame>
              <ChartFrame title="Errors per minute" description="By status class" legend={errorSeries} height={220}>
                <BarChart data={errors} xKey="time" series={errorSeries} stacked />
              </ChartFrame>
            </>
          }
          aside={
            <>
              <Trace title="Incidents and events" steps={incidents} />
              <div style={{ display: 'grid', gap: 8 }}>
                <Label>Node load</Label>
                {capacity.map((node) => (
                  <div key={node.name} style={{ display: 'grid', gridTemplateColumns: '96px minmax(0, 1fr) 40px', gap: 12, alignItems: 'center' }}>
                    <Text variant="small">{node.name}</Text>
                    <Meter value={node.value} tone={loadTone(node.value)} label={`${node.name} load`} />
                    <span style={{ justifySelf: 'end' }}><Numeric unit="%">{node.value}</Numeric></span>
                  </div>
                ))}
              </div>
            </>
          }
        >
          <DataTable columns={columns} rows={services} rowKey={(row) => `${row.name}-${row.region}`} defaultSort={{ key: 'errors', direction: 'desc' }} caption="Services · click a column to sort" />
        </MonitoringTemplate>
      </SidebarInset>
    </SidebarProvider>
  );
}

const meta = { title: 'Pages/Monitoring', component: Monitoring, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Monitoring>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
