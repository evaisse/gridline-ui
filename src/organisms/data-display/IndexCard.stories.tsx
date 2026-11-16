import type { Meta, StoryObj } from '@storybook/react-vite';
import { IndexCard } from './IndexCard';

const meta = {
  title: 'Organisms/Data display/IndexCard', tags: ['container', 'list'],
  component: IndexCard,
  args: {
    eyebrow: 'Parsing',
    tag: 'Stable',
    tagTone: 'pos',
    title: 'tessera',
    facts: [{ label: 'Updated', value: '11/12/2026' }, { label: 'Modules', value: 4 }],
    description: 'An incremental parser toolkit with error recovery and a compact syntax tree.',
    listTitle: 'Top modules',
    list: ['core', 'parser', 'printer'],
  },
  decorators: [(Story) => <div style={{ maxWidth: 360, border: '1px solid var(--gl-rule-strong)' }}><Story /></div>],
} satisfies Meta<typeof IndexCard>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
