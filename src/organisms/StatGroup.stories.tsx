import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ruler } from '../atoms';
import { Stat } from '../molecules';
import { StatGroup } from './StatGroup';

const meta = {
  title: 'Organisms/StatGroup',
  component: StatGroup,
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof StatGroup>;
export default meta;

export const ThreeMetrics: StoryObj<typeof meta> = {
  render: () => (
    <StatGroup>
      <Stat label="Coverage" value="68.49" unit="%" note="±0.99" tone="pos"><Ruler value={68} range={[24, 76]} /></Stat>
      <Stat label="Bundle size" value="41.2" unit="kB" tone="neg"><Ruler value={72} range={[10, 90]} /></Stat>
      <Stat label="Build time" value="21.5" unit="s" tone="warn"><Ruler value={58} range={[6, 80]} /></Stat>
    </StatGroup>
  ),
};
