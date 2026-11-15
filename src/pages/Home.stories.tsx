import type { Meta, StoryObj } from '@storybook/react-vite';
import { Blockquote, Button, Cell, Grid, Heading, Label, Numeric, Section, Tag, Text } from '../atoms';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, CodeBlock, Stat } from '../molecules';
import { AreaChart, ChartFrame, StatGroup } from '../organisms';
import { HomeTemplate } from '../templates';
import { ArrowRightIcon, CheckIcon } from '../tokens/icons';
import { installs, runtimeSeries } from './fixtures';

const features = [
  { eyebrow: '01 · Measure', title: 'Every release, same machine', text: 'Coverage, size and build time are measured three times on identical hardware. The median is what you see.' },
  { eyebrow: '02 · Compare', title: 'Ranked against its peers', text: 'Each figure is placed among the packages of the same category, so a number always comes with its context.' },
  { eyebrow: '03 · Decide', title: 'One page per package', text: 'Licence, maintainers, runtime support and history on a single sheet you can read in a minute.' },
  { eyebrow: '04 · Follow', title: 'Alerts on regressions', text: 'Get a message when a dependency grows, slows down or loses coverage between two versions.' },
  { eyebrow: '05 · Automate', title: 'A command and an API', text: 'Run the same measurements in your pipeline and fail the build on a threshold you choose.' },
  { eyebrow: '06 · Share', title: 'Reports that export', text: 'Send a comparison as a link, a table or a file. Nothing to install on the reading side.' },
];

const plans = [
  { name: 'Open', price: '0', note: 'For public packages', points: ['Unlimited public packages', 'Weekly measurements', 'Community support'], cta: 'Start free' },
  { name: 'Team', price: '24', note: 'Per seat, per month', points: ['Private packages', 'Measurements on every release', 'Regression alerts', 'Priority support'], cta: 'Try for 14 days', featured: true },
  { name: 'Organisation', price: '—', note: 'Annual contract', points: ['Single sign-on', 'Self-hosted runners', 'Audit log', 'Named contact'], cta: 'Contact us' },
];

const footerColumns = [
  { title: 'Product', links: ['Catalogue', 'Comparisons', 'Alerts', 'Pricing'] },
  { title: 'Developers', links: ['Documentation', 'Command line', 'API reference', 'Status'] },
  { title: 'Company', links: ['About', 'Method', 'Changelog', 'Contact'] },
];

const link = { color: 'inherit', textDecoration: 'none' } as const;

function Home() {
  return (
    <HomeTemplate
      nav={
        <>
          <Label tone="ink">◆ Gridline Registry</Label>
          <nav aria-label="Main" style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Button variant="ghost" size="sm">Catalogue</Button>
            <Button variant="ghost" size="sm">Method</Button>
            <Button variant="ghost" size="sm">Pricing</Button>
            <Button variant="ghost" size="sm">Docs</Button>
          </nav>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="sm">Sign in</Button>
            <Button size="sm" variant="solid">Get started</Button>
          </div>
        </>
      }
      hero={
        <>
          <Tag dot tone="info">Release 0.2 · charts and assistant</Tag>
          <Heading level={1} size="2xl">Choose your dependencies on measurements, not on stars</Heading>
          <Text variant="lead">A registry that tests every package the same way and ranks it against its peers.</Text>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button variant="solid" icon={<ArrowRightIcon />}>Browse the catalogue</Button>
            <Button>Read the method</Button>
          </div>
          <Label size="xs">Free for public packages · no card required</Label>
        </>
      }
      heroAside={
        <div style={{ display: 'grid', gap: 16 }}>
          <CodeBlock title="terminal" code={'npm install --global gridline\ngridline measure ./my-package\ngridline compare tessera castor'} />
          <ChartFrame title="Weekly installs" description="Thousands, by runtime" legend={runtimeSeries} height={180}>
            <AreaChart data={installs} xKey="month" series={runtimeSeries} stacked showYAxis={false} />
          </ChartFrame>
        </div>
      }
      footer={
        <div style={{ display: 'grid', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24 }}>
            <div style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
              <Label tone="ink">◆ Gridline Registry</Label>
              <Text variant="small" tone="muted">Measured packages for data-dense teams.</Text>
            </div>
            {footerColumns.map((column) => (
              <div key={column.title} style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
                <Label>{column.title}</Label>
                {column.links.map((item) => <Text key={item} variant="small"><a href="#" style={link}>{item}</a></Text>)}
              </div>
            ))}
          </div>
          <Label size="xs">© 2026 Gridline · invented company, invented figures</Label>
        </div>
      }
    >
      <Section pad="md" tone="surface-1">
        <StatGroup>
          <Stat label="Packages measured" value="4,218" />
          <Stat label="Releases tested" value="61.4" unit="k" />
          <Stat label="Median build" value="9.8" unit="s" />
          <Stat label="Teams" value="1,930" note="+11%" tone="pos" />
        </StatGroup>
      </Section>

      <Section pad="none" tone="invert" style={{ display: 'flex', alignItems: 'center', height: 40, padding: '0 12px' }}>
        <Label tone="inherit">What you get</Label>
      </Section>
      <Section pad="none">
        <Grid columns="repeat(auto-fit, minmax(340px, 1fr))" framed={false}>
          {features.map((feature) => (
            <Cell key={feature.title} pad="lg" style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
              <Label>{feature.eyebrow}</Label>
              <Heading level={3} size="lg">{feature.title}</Heading>
              <Text tone="muted">{feature.text}</Text>
            </Cell>
          ))}
        </Grid>
      </Section>

      <Section pad="lg" tone="surface-1">
        <div style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
          <Blockquote>We replaced three dependencies in a week. For the first time the discussion was about numbers everyone could see.</Blockquote>
          <Label>Ines Carvalho · Platform lead, Tessera Labs</Label>
        </div>
      </Section>

      <Section pad="none" tone="invert" style={{ display: 'flex', alignItems: 'center', height: 40, padding: '0 12px' }}>
        <Label tone="inherit">Pricing</Label>
      </Section>
      <Section pad="none">
        <Grid columns="repeat(auto-fit, minmax(260px, 1fr))" framed={false}>
          {plans.map((plan) => (
            <Cell key={plan.name} pad="lg" tone={plan.featured ? 'surface-2' : 'paper'} style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading level={3} size="lg">{plan.name}</Heading>
                {plan.featured && <Tag tone="info">Most chosen</Tag>}
              </div>
              <div style={{ display: 'grid', gap: 4 }}>
                <Numeric variant="display" prefix={plan.price === '—' ? undefined : '$'}>{plan.price}</Numeric>
                <Label>{plan.note}</Label>
              </div>
              <ul style={{ display: 'grid', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
                {plan.points.map((point) => (
                  <li key={point} style={{ display: 'flex', gap: 8, alignItems: 'center' }}><CheckIcon width={14} height={14} /><Text variant="small">{point}</Text></li>
                ))}
              </ul>
              <Button variant={plan.featured ? 'solid' : 'ruled'}>{plan.cta}</Button>
            </Cell>
          ))}
        </Grid>
      </Section>

      <Section pad="md">
        <div style={{ display: 'grid', gap: 16, maxWidth: 720 }}>
          <Heading level={2} size="xl">Questions</Heading>
          <Accordion type="single" collapsible defaultValue="a">
            <AccordionItem value="a"><AccordionTrigger>How is coverage measured?</AccordionTrigger><AccordionContent>Every release runs the full suite on the same machine, three times. The median is reported.</AccordionContent></AccordionItem>
            <AccordionItem value="b"><AccordionTrigger>Can I measure private packages?</AccordionTrigger><AccordionContent>Yes, on the Team plan and above. Sources never leave the runner.</AccordionContent></AccordionItem>
            <AccordionItem value="c"><AccordionTrigger>What counts toward size?</AccordionTrigger><AccordionContent>The minified, compressed entry point and everything it imports.</AccordionContent></AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Section pad="lg" tone="invert">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <Heading level={2} size="xl" style={{ color: 'inherit' }}>Measure your first package in two minutes</Heading>
            <Label tone="inherit">One command, no account needed for public code</Label>
          </div>
          <Button icon={<ArrowRightIcon />} style={{ background: 'var(--gl-paper)', color: 'var(--gl-ink)' }}>Get started</Button>
        </div>
      </Section>
    </HomeTemplate>
  );
}

const meta = { title: 'Pages/Home', component: Home, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Home>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
