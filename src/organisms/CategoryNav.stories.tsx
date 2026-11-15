import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CategoryNav } from './CategoryNav';

const meta = {
  title: 'Organisms/Navigation/CategoryNav', tags: ['wayfinding', 'list'],
  component: CategoryNav,
  args: {
    value: 'parsing',
    categories: [
      { id: 'all', label: 'All packages', icon: '▦', count: 42 },
      { id: 'parsing', label: 'Parsing', icon: '▤', count: 12 },
      { id: 'formatting', label: 'Formatting', icon: '≡', count: 8 },
      { id: 'testing', label: 'Testing', icon: '✓', count: 7 },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <CategoryNav {...args} value={value} onChange={setValue} />;
  },
  decorators: [(Story) => <div style={{ maxWidth: 240, border: '1px solid var(--gl-rule-strong)', borderBottom: 0 }}><Story /></div>],
} satisfies Meta<typeof CategoryNav>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
