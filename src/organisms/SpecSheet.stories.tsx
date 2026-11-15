import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpecSheet } from './SpecSheet';

const meta = {
  title: 'Organisms/Data display/SpecSheet', tags: ['data', 'list'],
  component: SpecSheet,
  args: {
    columns: 2,
    specs: [
      { label: 'Maintainer', value: 'Tessera Labs' },
      { label: 'Licence', value: 'MIT' },
      { label: 'Latest', value: '4.2.0' },
      { label: 'Weekly installs', value: '1.2M' },
      { label: 'Runtime', value: 'Node ≥ 22' },
      { label: 'Types', value: 'Bundled' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof SpecSheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const TwoColumns: Story = {};
export const OneColumn: Story = { args: { columns: 1 } };
