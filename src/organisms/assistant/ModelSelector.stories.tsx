import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModelSelector, type ModelOption, type ModelSelection } from './ModelSelector';

const models: ModelOption[] = [
  { id: 'a', name: 'Model A – fast', description: 'Quick answers for everyday questions.', context: '128K', price: '$0.30 / $1.20', reasoning: false },
  { id: 'b', name: 'Model B – balanced', description: 'Good default for drafting and analysis.', context: '200K', price: '$3 / $15' },
  { id: 'c', name: 'Model C – deep', description: 'Slower, for hard multi-step problems.', context: '1M', price: '$15 / $75' },
  { id: 'd', name: 'Model D – preview', description: 'Not available on this plan.', disabled: true },
];

const meta = { title: 'Organisms/Assistant/ModelSelector', tags: ['ai', 'selection'], component: ModelSelector, args: { models } } satisfies Meta<typeof ModelSelector>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DeepHigh: Story = { args: { defaultValue: { model: 'c', effort: 'high' } } };
export const NoReasoning: Story = { args: { defaultValue: { model: 'a', effort: 'medium' } } };

function Controlled() {
  const [value, setValue] = useState<ModelSelection>({ model: 'b', effort: 'low' });
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <ModelSelector models={models} value={value} onChange={setValue} />
      <code>{JSON.stringify(value)}</code>
    </div>
  );
}
export const ControlledState: Story = { render: () => <Controlled /> };
