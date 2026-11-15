import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Atoms/Overlays/Tooltip', tags: ['popup', 'text'],
  component: Tooltip,
  args: { content: 'Copy to clipboard', side: 'top', children: <button type="button">Hover or focus me</button> },
  decorators: [(Story) => <div style={{ padding: 40 }}><Story /></div>],
} satisfies Meta<typeof Tooltip>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
