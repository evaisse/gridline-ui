import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Heading, Label, Ruler, NativeSelect, Text } from '../atoms';
import { Stat } from '../molecules';
import { MasterList, ScoreBoard, SpecSheet, StatGroup, Toolbar, ToolbarCell } from '../organisms';
import { MasterDetailTemplate } from '../templates';
import { packages, scoreViews, specs } from './fixtures';

function PackageDetail() {
  const [selected, setSelected] = useState('tessera');
  const current = packages.find((item) => item.id === selected) ?? packages[0];

  return (
    <MasterDetailTemplate
      master={
        <MasterList
          items={packages}
          selectedId={selected}
          onSelect={setSelected}
          metaHeader="Released ↓"
          titleHeader="Package"
          filters={
            <Toolbar>
              <ToolbarCell flush grow>
                <NativeSelect variant="cell" aria-label="Category"><option>All packages</option><option>Parsing</option></NativeSelect>
              </ToolbarCell>
              <ToolbarCell flush grow>
                <NativeSelect variant="cell" aria-label="Status"><option>Any status</option><option>Stable</option></NativeSelect>
              </ToolbarCell>
            </Toolbar>
          }
        />
      }
      toolbar={
        <Toolbar>
          <ToolbarCell grow />
          <ToolbarCell>
            <Button variant="ghost" size="sm" icon="↓">Download</Button>
            <Button variant="ghost" size="sm" icon="⇄">Compare</Button>
          </ToolbarCell>
        </Toolbar>
      }
    >
      <header style={{ display: 'grid', gap: 12 }}>
        <Label>Parsing · {current.meta}</Label>
        <Heading level={1}>{current.title}</Heading>
        <Text>
          An incremental parser toolkit. It ranks 6th of 37 packages for overall quality; its best result is 1st of 42
          for command-line build time.
        </Text>
      </header>
      <SpecSheet specs={specs} />
      <StatGroup>
        <Stat label="Coverage" value="68.49" unit="%" note="±0.99" tone="pos"><Ruler value={68} range={[24, 76]} /></Stat>
        <Stat label="Bundle size" value="41.2" unit="kB" tone="neg"><Ruler value={72} range={[10, 90]} /></Stat>
        <Stat label="Build time" value="21.5" unit="s" tone="warn"><Ruler value={58} range={[6, 80]} /></Stat>
      </StatGroup>
      <ScoreBoard views={scoreViews} subject="Module" />
    </MasterDetailTemplate>
  );
}

const meta = {
  title: 'Pages/Package detail',
  component: PackageDetail,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PackageDetail>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
