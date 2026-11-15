import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta = {
  title: 'Molecules/Forms/SearchField', tags: ['input', 'search'],
  component: SearchField,
  decorators: [(Story) => <div style={{ maxWidth: 360, border: '1px solid var(--gl-rule-strong)' }}><Story /></div>],
} satisfies Meta<typeof SearchField>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
