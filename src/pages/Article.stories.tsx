import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Blockquote, Button, Heading, InlineCode, Label, Link, Prose, Tag, Text } from '../atoms';
import { CodeBlock, TableOfContents } from '../molecules';
import { Footer, TopBar } from '../organisms';
import { ArticleTemplate } from '../templates';

const outline = [{ id: 'why', label: 'Why the median', level: 1 }, { id: 'how', label: 'How a run works', level: 1 }, { id: 'machine', label: 'The machine', level: 2 }, { id: 'noise', label: 'Dealing with noise', level: 2 }, { id: 'try', label: 'Try it', level: 1 }];
const columns = [{ title: 'Journal', links: [{ label: 'All articles', href: '#' }, { label: 'Method', href: '#' }] }, { title: 'Product', links: [{ label: 'Catalogue', href: '#' }, { label: 'Pricing', href: '#' }] }];

function Article() {
  return (
    <ArticleTemplate
      nav={<TopBar brand="◆ Gridline Journal" links={[{ id: 'articles', label: 'Articles' }, { id: 'method', label: 'Method' }, { id: 'log', label: 'Changelog' }]} current="articles" actions={<Button size="sm">Subscribe</Button>} />}
      header={
        <>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Label>Method</Label><Tag>8 min read</Tag></div>
          <Heading level={1} size="2xl">Why we report the median of three runs</Heading>
          <Text variant="lead">One run tells you about the machine that morning. Three runs tell you about the package.</Text>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar fallback="ic" />
            <div style={{ display: 'grid', gap: 2 }}><span>Ines Carvalho</span><Label size="xs">Nov 12, 2026</Label></div>
          </div>
        </>
      }
      aside={<TableOfContents items={outline} activeId="how" label="On this page" />}
      footer={<Footer brand="◆ Gridline Journal" note="Notes on measuring software." columns={columns} legal="© 2026 Gridline · invented company" />}
    >
      <Prose>
        <h2 id="why">Why the median</h2>
        <p>A build that takes nine seconds on Monday can take eleven on Tuesday with no change to the code. If we published a single figure, every release would look like a regression or an improvement at random.</p>
        <p>The mean does not help: one slow run drags it up. The median ignores the outlier and stays close to what you will see yourself.</p>
        <h2 id="how">How a run works</h2>
        <p>Each release is installed from a clean cache, built, and tested. We do that three times in a row and keep the middle value of every measure.</p>
      </Prose>
      <CodeBlock title="terminal" code={'gridline measure . --runs 3\n# build   9.6 s   9.8 s   11.2 s   → 9.8 s\n# size    12.4 kB (identical)'} />
      <Prose>
        <h3 id="machine">The machine</h3>
        <p>All runs happen on the same hardware profile, with nothing else scheduled on it. The profile is recorded with the figures, so a change of machine shows up as a break in the series, not as a trend.</p>
        <h3 id="noise">Dealing with noise</h3>
        <p>When the three runs differ by more than fifteen percent we run two more and say so on the package page.</p>
      </Prose>
      <Blockquote>A figure you cannot reproduce is an anecdote. We would rather publish fewer numbers and stand behind each one.</Blockquote>
      <Prose>
        <h2 id="try">Try it</h2>
        <p>The same command runs on your machine. Pass <InlineCode>--runs 5</InlineCode> if your laptop is busy, and compare the result with the <Link href="#">published figures</Link>.</p>
      </Prose>
    </ArticleTemplate>
  );
}

const meta = { title: 'Pages/Article', component: Article, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Article>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
