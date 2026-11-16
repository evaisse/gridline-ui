import type { Meta, StoryObj } from '@storybook/react-vite';
import { Steps } from './Steps';

const steps = [
  { id: 'a', label: 'Details', description: 'Name and licence' },
  { id: 'b', label: 'Files', description: 'Upload the tarball' },
  { id: 'c', label: 'Review', description: 'Check the measurements' },
  { id: 'd', label: 'Publish' },
];
const meta = { title: 'Molecules/Navigation/Steps', tags: ['steps', 'status'], component: Steps, args: { steps, current: 1 } } satisfies Meta<typeof Steps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical', current: 2 }, decorators: [(Story) => <div style={{ maxWidth: 280 }}><Story /></div>] };
export const Finished: Story = { args: { current: 4 } };
