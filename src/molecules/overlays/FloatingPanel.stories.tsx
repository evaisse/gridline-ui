import type { Meta, StoryObj } from '@storybook/react-vite';
import { FloatingPanel } from './FloatingPanel';

const meta = {
  title: 'Molecules/Overlays/FloatingPanel', tags: ['container'],
  component: FloatingPanel,
  args: { title: 'Build log', contained: true, children: 'castor 1.2.0 compiled in 4.1 s. 212 modules, 0 warnings.' },
  decorators: [(Story) => <div style={{ position: 'relative', height: 420, border: '1px solid var(--gl-rule-strong)' }}><Story /></div>],
} satisfies Meta<typeof FloatingPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultPosition: { x: 24, y: 24 } } };
export const Closable: Story = { args: { onClose: () => {}, defaultPosition: { x: 80, y: 60 }, defaultSize: { width: 280, height: 180 }, title: 'Dependants' } };
export const Small: Story = { args: { defaultSize: { width: 200, height: 120 }, minSize: { width: 160, height: 96 }, title: 'Notes', children: 'Drag the header; pull the corner.' } };
