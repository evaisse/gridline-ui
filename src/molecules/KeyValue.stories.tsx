import type { Meta, StoryObj } from '@storybook/react-vite';
import { KeyValue } from './KeyValue';

const meta = {
  title: 'Molecules/Data display/KeyValue', tags: ['data', 'list'],
  component: KeyValue,
  args: { label: 'Licence', children: 'MIT' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof KeyValue>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
