import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToolCall } from './ToolCall';

const meta = {
  title: 'Molecules/ToolCall',
  component: ToolCall,
  args: { toolName: 'read_report', argsText: '{\n  "release": "4.2.0"\n}', result: { modules: 4, coverage: 68.49 } },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof ToolCall>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Complete: Story = {};
export const Running: Story = { args: { status: 'running', result: undefined } };
export const Failed: Story = { args: { status: 'error', result: 'Report not found' } };
