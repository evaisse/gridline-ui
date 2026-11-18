import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Heading, Label, Numeric, Prose, Tag, Text } from '../atoms';
import { Stat } from '../molecules';
import { AreaChart, ChartFrame, DataTable, Gauge, StatGroup, type Column } from '../organisms';
import { ReportTemplate } from '../templates';
import { DownloadIcon } from '../tokens/icons';
import { installs, leaderboard, runtimeSeries, type LeaderboardRow } from './fixtures';

const toneOf = { Stable: 'pos', Beta: 'info', Deprecated: 'warn' } as const;
const columns: Column<LeaderboardRow>[] = [
  { key: 'name', header: 'Package', render: (row) => row.name },
  { key: 'status', header: 'Status', width: '130px', render: (row) => <Tag dot tone={toneOf[row.status]}>{row.status}</Tag> },
  { key: 'score', header: 'Score', numeric: true, width: '110px', render: (row) => <Numeric unit="%">{row.score.toFixed(2)}</Numeric>, sortValue: (row) => row.score },
  { key: 'build', header: 'Build', numeric: true, width: '100px', render: (row) => <Numeric unit="s">{row.build.toFixed(1)}</Numeric> },
];
const bands = [{ to: 50, tone: 'neg' as const }, { to: 65, tone: 'warn' as const }, { to: 100, tone: 'pos' as const }];

function Report() {
  return (
    <ReportTemplate
      header={
        <div style={{ display: 'grid', gap: 8 }}>
          <Label>Quality report · November 2026</Label>
          <Heading level={1}>Tessera Labs, monthly review</Heading>
          <Text tone="muted">Prepared on Nov 16, 2026 for the platform group. Figures cover Oct 16 to Nov 15.</Text>
        </div>
      }
      actions={<><Button icon={<DownloadIcon />}>Export</Button><Button variant="solid" onClick={() => window.print()}>Print</Button></>}
      summary={
        <StatGroup>
          <Stat label="Median score" value="62.5" unit="%" note="+2.1" tone="pos" />
          <Stat label="Weekly installs" value="728" unit="k" note="+11%" tone="pos" />
          <Stat label="Median build" value="9.8" unit="s" tone="warn" />
          <Stat label="Regressions" value="3" tone="neg" />
        </StatGroup>
      }
      footer={<Label size="xs" style={{ whiteSpace: 'normal' }}>Gridline Registry · invented figures · page generated Nov 16, 2026</Label>}
    >
      <>
        <Prose>
          <h2>Summary</h2>
          <p>Quality improved for the third month in a row. The median score rose by 2.1 points, mostly because tessera and castor raised their coverage. Build time did not move and remains the weakest figure.</p>
        </Prose>
        <ChartFrame title="Coverage against the target" description="Median across all packages" height={120}>
          <Gauge variant="linear" value={62.5} target={70} bands={bands} label="Median coverage" format={(value) => `${value}%`} />
        </ChartFrame>
      </>
      <>
        <Prose>
          <h2>Installs</h2>
          <p>Edge runtimes grew fastest, from 90k to 118k installs a week. Node remains two thirds of the total.</p>
        </Prose>
        <ChartFrame title="Weekly installs" description="Thousands, by runtime" legend={runtimeSeries} height={240}>
          <AreaChart data={installs} xKey="month" series={runtimeSeries} stacked yFormat={(value) => `${value}k`} />
        </ChartFrame>
      </>
      <>
        <Prose>
          <h2>Packages</h2>
          <p>Three packages are below the 50% floor and need a plan before the next review.</p>
        </Prose>
        <DataTable columns={columns} rows={leaderboard} rowKey={(row) => row.name} ranked defaultSort={{ key: 'score', direction: 'desc' }} />
      </>
    </ReportTemplate>
  );
}

const meta = { title: 'Pages/Report', component: Report, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Report>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
