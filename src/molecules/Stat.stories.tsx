import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ruler } from '../atoms';
import { Stat } from './Stat';

const meta = {
  title: 'Molecules/Stat',
  component: Stat,
  args: { label: 'Coverage', value: '68.49', unit: '%', note: '±0.99', tone: 'pos' },
  decorators: [(Story) => <div style={{ maxWidth: 280 }}><Story /></div>],
} satisfies Meta<typeof Stat>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithRuler: Story = { args: { children: <Ruler value={68} range={[24, 76]} /> } };
export const Negative: Story = { args: { label: 'Bundle size', value: '41.2', unit: 'kB', note: undefined, tone: 'neg', children: <Ruler value={72} range={[10, 90]} /> } };
