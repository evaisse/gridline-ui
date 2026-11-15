import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlobeIcon, SearchIcon, SparkIcon, TerminalIcon } from '../tokens/icons';
import { Trace } from './Trace';

const meta = {
  title: 'Organisms/Data display/Trace', tags: ['history', 'ai', 'status'],
  component: Trace,
  args: {
    title: 'Worked for 12s',
    steps: [
      { id: '1', icon: <SparkIcon />, title: 'Planned the comparison', meta: '2s', detail: 'Read both reports, then compare module by module.' },
      { id: '2', icon: <SearchIcon />, title: 'Searched for "tessera 4.2.0 report"', meta: '3 results' },
      { id: '3', icon: <GlobeIcon />, title: 'Read registry.example/tessera', meta: '1.1s' },
      { id: '4', icon: <TerminalIcon />, title: 'Ran coverage --module cli', meta: 'exit 1', status: 'error', detail: 'cli: 48.9% is below the 50% floor' },
      { id: '5', title: 'Writing the summary', status: 'running' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Trace>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
