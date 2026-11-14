import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './ScrollArea';

const meta = { title: 'Atoms/ScrollArea', component: ScrollArea } satisfies Meta<typeof ScrollArea>;
export default meta;

export const Vertical: StoryObj<typeof meta> = {
  render: () => (
    <ScrollArea type="always" style={{ width: 240, height: 160, border: '1px solid var(--gl-rule-strong)' }}>
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} style={{ padding: '8px 12px', borderBottom: '1px solid var(--gl-rule)' }}>Row {i + 1}</div>
      ))}
    </ScrollArea>
  ),
};
