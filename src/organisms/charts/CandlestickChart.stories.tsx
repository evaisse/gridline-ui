import type { Meta, StoryObj } from '@storybook/react-vite';
import { CandlestickChart, type Candle } from './CandlestickChart';
import { ChartFrame } from './Chart';

const meta = { title: 'Organisms/Charts/CandlestickChart', tags: ['data'], component: ChartFrame, decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>] } satisfies Meta<typeof ChartFrame>;
export default meta;
type Story = StoryObj<typeof meta>;

const weeks: Candle[] = [
  { x: 'W40', open: 42, high: 47, low: 40, close: 46 }, { x: 'W41', open: 46, high: 51, low: 44, close: 49 },
  { x: 'W42', open: 49, high: 50, low: 43, close: 44 }, { x: 'W43', open: 44, high: 48, low: 41, close: 47 },
  { x: 'W44', open: 47, high: 55, low: 46, close: 54 }, { x: 'W45', open: 54, high: 58, low: 50, close: 51 },
  { x: 'W46', open: 51, high: 56, low: 49, close: 55 }, { x: 'W47', open: 55, high: 57, low: 52, close: 53 },
];

export const Default: Story = { render: () => <ChartFrame title="Weekly download price index" description="Open, high, low, close" meta="tessera" height={300}><CandlestickChart data={weeks} /></ChartFrame> };
export const Formatted: Story = { render: () => <ChartFrame title="Build time per week" meta="seconds" height={300}><CandlestickChart data={weeks} yFormat={(v) => `${v}s`} xFormat={(v) => v.replace('W', 'Wk ')} /></ChartFrame> };
export const Short: Story = { render: () => <ChartFrame title="Last three periods" height={240}><CandlestickChart data={weeks.slice(-3)} showGrid={false} /></ChartFrame> };
