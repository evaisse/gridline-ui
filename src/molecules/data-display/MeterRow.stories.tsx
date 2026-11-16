import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeterRow } from './MeterRow';

const meta = {
  title: 'Molecules/Data display/MeterRow', tags: ['data', 'list'],
  component: MeterRow,
  args: { name: 'parser', value: 73.6, unit: '%', rank: 9, of: 38, tone: 'pos' },
  decorators: [(Story) => <div style={{ maxWidth: 640, border: '1px solid var(--gl-rule-strong)', borderBottom: 0 }}><Story /></div>],
} satisfies Meta<typeof MeterRow>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
