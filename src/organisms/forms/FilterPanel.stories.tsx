import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from '../../atoms';
import { FilterPanel, FilterSection, type FilterState } from './FilterPanel';

const groups = [
  { id: 'category', title: 'Category', options: [{ value: 'parsing', label: 'Parsing', count: 12 }, { value: 'formatting', label: 'Formatting', count: 8 }, { value: 'testing', label: 'Testing', count: 7 }] },
  { id: 'licence', title: 'Licence', options: [{ value: 'mit', label: 'MIT', count: 21 }, { value: 'apache', label: 'Apache-2.0', count: 9 }, { value: 'isc', label: 'ISC', count: 4 }] },
];

function Demo({ initial = {} as FilterState, extra = false }) {
  const [value, setValue] = useState(initial);
  return (
    <div style={{ maxWidth: 264, border: '1px solid var(--gl-rule-strong)' }}>
      <FilterPanel groups={groups} value={value} onChange={setValue}>
        {extra && <FilterSection title="Minimum score"><Slider defaultValue={[40]} max={80} step={5} thumbLabels={['Minimum score']} /></FilterSection>}
      </FilterPanel>
    </div>
  );
}

const meta = { title: 'Organisms/Forms/FilterPanel', tags: ['search', 'selection'], component: Demo } satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Preselected: Story = { args: { initial: { category: ['parsing'], licence: ['mit', 'isc'] } } };
export const WithExtraFacet: Story = { args: { extra: true } };
