import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartFrame } from './Chart';
import { Treemap, type TreemapNode } from './Treemap';

const meta = { title: 'Organisms/Charts/Treemap', tags: ['data', 'tree'], component: ChartFrame, decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>] } satisfies Meta<typeof ChartFrame>;
export default meta;
type Story = StoryObj<typeof meta>;

const bundle: TreemapNode[] = [
  { name: 'parser', children: [{ name: 'lexer', value: 18.4 }, { name: 'grammar', value: 14.1 }, { name: 'recovery', value: 8.7 }] },
  { name: 'printer', children: [{ name: 'layout', value: 12.2 }, { name: 'styles', value: 6.5 }] },
  { name: 'core', children: [{ name: 'store', value: 9.8 }, { name: 'events', value: 5.2 }, { name: 'utils', value: 3.1 }] },
  { name: 'cli', children: [{ name: 'args', value: 4.4 }, { name: 'colors', value: 2.5 }] },
];
const kb = (v: number) => `${v.toFixed(1)} kB`;

export const Default: Story = { render: () => <ChartFrame title="Bundle size by module" meta="castor 3.2" height={320} dots={false}><Treemap data={bundle} valueFormat={kb} /></ChartFrame> };
export const Flat: Story = { render: () => <ChartFrame title="Downloads by package" height={260} dots={false}><Treemap valueFormat={(v) => `${v}k`} data={[{ name: 'tessera', value: 344 }, { name: 'quillmark', value: 220 }, { name: 'castor', value: 118 }, { name: 'harrow', value: 74 }, { name: 'sable', value: 31 }]} /></ChartFrame> };
