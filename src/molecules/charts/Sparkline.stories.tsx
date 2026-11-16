import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, Numeric } from '../../atoms';
import { Sparkline } from './Sparkline';

const downloads = [12, 14, 13, 18, 22, 20, 26, 24, 31, 29, 35, 38, 36, 42];
const meta = { title: 'Molecules/Charts/Sparkline', tags: ['data', 'kpi'], component: Sparkline, args: { data: downloads, label: 'Downloads, last 14 days' } } satisfies Meta<typeof Sparkline>;
export default meta;

export const Line: StoryObj<typeof meta> = {};
export const Area: StoryObj<typeof meta> = { args: { variant: 'area', color: 2 } };
export const Bars: StoryObj<typeof meta> = { args: { variant: 'bars', color: 3, data: [3, 5, 2, 8, 6, -2, 4, 7, 5] } };

export const InAStat: StoryObj<typeof meta> = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 320 }}>
      <div style={{ flex: 1 }}><Label>Weekly downloads</Label><div><Numeric>42.1k</Numeric></div></div>
      <Sparkline {...args} variant="area" width={120} height={32} />
    </div>
  ),
};
