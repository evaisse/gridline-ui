import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Heading, Label, Numeric, Ruler, Tag } from '../atoms';
import { Breadcrumb, Stat, ToggleGroup, ToggleGroupItem } from '../molecules';
import {
  AreaChart, BarChart, ChartFrame, ColumnChart, DataTable, PieChart, ScatterPlot, Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarHeader, SidebarInset, SidebarItem, SidebarProvider, SidebarTrigger, StatGroup, type Column,
} from '../organisms';
import { DashboardTemplate } from '../templates';
import { ArrowDownIcon, CalendarIcon, FileIcon, GlobeIcon, TerminalIcon } from '../tokens/icons';
import { installs, leaderboard, runtimeSeries, runtimeShare, scatterField, type LeaderboardRow } from './fixtures';

const k = (value: number) => `${value}k`;
const toneOf = { Stable: 'pos', Beta: 'info', Deprecated: 'warn' } as const;

const columns: Column<LeaderboardRow>[] = [
  { key: 'name', header: 'Package', render: (row) => row.name, sortValue: (row) => row.name },
  { key: 'status', header: 'Status', width: '130px', render: (row) => <Tag dot tone={toneOf[row.status]}>{row.status}</Tag> },
  { key: 'score', header: 'Score', numeric: true, width: '110px', render: (row) => <Numeric unit="%">{row.score.toFixed(2)}</Numeric>, sortValue: (row) => row.score },
  { key: 'cost', header: 'Cost / run', numeric: true, width: '110px', render: (row) => <Numeric prefix="$">{row.cost.toFixed(2)}</Numeric>, sortValue: (row) => row.cost },
  { key: 'build', header: 'Build', numeric: true, width: '100px', render: (row) => <Numeric unit="s">{row.build.toFixed(1)}</Numeric>, sortValue: (row) => row.build },
];

function Dashboard() {
  return (
    <SidebarProvider style={{ minHeight: '100dvh' }}>
      <Sidebar>
        <SidebarHeader><SidebarTrigger /><Label tone="ink">Gridline</Label></SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Workspace">
            <SidebarItem icon={<GlobeIcon />} active>Overview</SidebarItem>
            <SidebarItem icon={<FileIcon />} badge={42}>Packages</SidebarItem>
            <SidebarItem icon={<TerminalIcon />}>Builds</SidebarItem>
            <SidebarItem icon={<CalendarIcon />}>Releases</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter><Label size="xs">v0.2</Label></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardTemplate
          header={
            <>
              <div style={{ display: 'grid', gap: 4 }}>
                <Breadcrumb items={[{ label: 'Workspace', href: '#' }, { label: 'Overview' }]} />
                <Heading level={1} size="xl">Quality overview</Heading>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <ToggleGroup type="single" defaultValue="6m" aria-label="Period"><ToggleGroupItem value="1m">1M</ToggleGroupItem><ToggleGroupItem value="6m">6M</ToggleGroupItem><ToggleGroupItem value="1y">1Y</ToggleGroupItem></ToggleGroup>
                <Button icon={<ArrowDownIcon />}>Export</Button>
              </div>
            </>
          }
          stats={
            <StatGroup>
              <Stat label="Median score" value="62.5" unit="%" note="+2.1" tone="pos"><Ruler value={62.5} range={[29, 72]} /></Stat>
              <Stat label="Median cost / run" value="8.52" prefix="$" tone="neg"><Ruler value={34} range={[2, 90]} /></Stat>
              <Stat label="Median build" value="9.8" unit="s" tone="warn"><Ruler value={40} range={[6, 80]} /></Stat>
              <Stat label="Weekly installs" value="728" unit="k" note="+11%"><Ruler value={72} range={[10, 80]} /></Stat>
            </StatGroup>
          }
          charts={
            <>
              <ChartFrame className="gl-chart--wide" title="Quality index" description="Best release from each maintainer" meta="Nov 11, 2026" height={280}>
                <ColumnChart max={100} format={(v) => `${v.toFixed(2)}%`} columns={leaderboard.map((row) => ({ key: row.name, label: row.name, value: row.score }))} />
              </ChartFrame>
              <ChartFrame title="Weekly installs" description="By runtime" legend={runtimeSeries}><AreaChart data={installs} xKey="month" series={runtimeSeries} stacked yFormat={k} /></ChartFrame>
              <ChartFrame title="Score against cost" legend={scatterField} height={260}>
                <ScatterPlot series={scatterField} labels={false} xFormat={(v) => `$${v}`} yFormat={(v) => `${v}%`} xDomain={[0, 25]} yDomain={[40, 80]} quadrants={{ x: 12.5, y: 60, good: 'Efficient', bad: 'Inefficient' }} />
              </ChartFrame>
              <ChartFrame title="Installs by month" legend={runtimeSeries.slice(0, 2)}><BarChart data={installs} xKey="month" series={runtimeSeries.slice(0, 2)} yFormat={k} /></ChartFrame>
              <ChartFrame title="Share by runtime" legend={runtimeShare} dots={false}>
                <PieChart data={runtimeShare} donut valueFormat={k} center={<><Numeric variant="display" unit="k">728</Numeric><Label size="xs">Per week</Label></>} />
              </ChartFrame>
            </>
          }
        >
          <DataTable columns={columns} rows={leaderboard} rowKey={(row) => row.name} ranked highlightTop={3} defaultSort={{ key: 'score', direction: 'desc' }} pageSize={6} caption="Leaderboard · click a column to sort" />
        </DashboardTemplate>
      </SidebarInset>
    </SidebarProvider>
  );
}

const meta = { title: 'Pages/Dashboard', component: Dashboard, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Dashboard>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
