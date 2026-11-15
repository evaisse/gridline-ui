import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Heading, InlineCode, Label, Link, Prose, Text } from '../atoms';
import { Alert, CodeBlock, SearchField, Steps } from '../molecules';
import { TopBar, TreeView } from '../organisms';
import { DocsTemplate } from '../templates';
import { FileIcon, FolderIcon } from '../tokens/icons';

const page = (id: string, label: string) => ({ id, label, icon: <FileIcon /> });
const nodes = [
  { id: 'start', label: 'Getting started', icon: <FolderIcon />, children: [page('install', 'Installation'), page('first', 'Your first measurement'), page('ci', 'Running in a pipeline')] },
  { id: 'method', label: 'Method', icon: <FolderIcon />, children: [page('coverage', 'Coverage'), page('size', 'Size'), page('build', 'Build time')] },
  { id: 'api', label: 'Reference', icon: <FolderIcon />, children: [page('cli', 'Command line'), page('http', 'HTTP API')] },
];
const outline = ['Requirements', 'Install the command', 'Measure a package', 'Next steps'];

function Documentation() {
  const [selected, setSelected] = useState('install');
  return (
    <DocsTemplate
      header={<TopBar brand="◆ Gridline Docs" links={[{ id: 'docs', label: 'Guides' }, { id: 'api', label: 'Reference' }, { id: 'log', label: 'Changelog' }]} current="docs" actions={<Button size="sm">Sign in</Button>}><SearchField placeholder="Search the documentation" /></TopBar>}
      nav={<TreeView nodes={nodes} defaultExpanded={['start', 'method']} selectedId={selected} onSelect={setSelected} aria-label="Documents" />}
      toc={
        <div style={{ display: 'grid', gap: 8 }}>
          <Label>On this page</Label>
          {outline.map((item) => <Text key={item} variant="small"><Link variant="plain" href="#">{item}</Link></Text>)}
        </div>
      }
      footer={<><Link variant="plain" href="#">← Introduction</Link><Link variant="plain" href="#">Your first measurement →</Link></>}
    >
      <Label>Getting started</Label>
      <Heading level={1}>Installation</Heading>
      <Text variant="lead">Install the command once, then measure any package from its folder.</Text>
      <Steps current={1} steps={[{ id: 'a', label: 'Install' }, { id: 'b', label: 'Measure' }, { id: 'c', label: 'Compare' }]} />
      <Prose>
        <h2>Requirements</h2>
        <p>Gridline runs on Node 22 or later. It needs no account for public packages.</p>
        <h2>Install the command</h2>
        <p>The command is published as a single package. Install it globally so that <InlineCode>gridline</InlineCode> is on your path.</p>
      </Prose>
      <CodeBlock title="terminal" code="npm install --global gridline" />
      <Alert tone="info" title="Behind a proxy">Set <InlineCode>HTTPS_PROXY</InlineCode> before running the command; measurements are uploaded over HTTPS.</Alert>
      <Prose>
        <h2>Measure a package</h2>
        <p>Run the command from the folder that holds <InlineCode>package.json</InlineCode>. It builds, tests three times and prints the medians.</p>
      </Prose>
      <CodeBlock title="terminal" code={'cd my-package\ngridline measure .'} />
    </DocsTemplate>
  );
}

const meta = { title: 'Pages/Documentation', component: Documentation, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Documentation>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
