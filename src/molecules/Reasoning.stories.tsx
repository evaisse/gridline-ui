import type { Meta, StoryObj } from '@storybook/react-vite';
import { Reasoning } from './Reasoning';

const meta = {
  title: 'Molecules/Assistant/Reasoning', tags: ['ai', 'disclosure'],
  component: Reasoning,
  args: { duration: 4, defaultOpen: true, children: 'The question is about the latest release. I should read the report before answering.' },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Reasoning>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Finished: Story = {};
export const Running: Story = { args: { running: true, duration: undefined } };
