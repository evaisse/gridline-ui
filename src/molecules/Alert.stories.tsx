import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms';
import { AlertIcon, InfoIcon } from '../tokens/icons';
import { Alert } from './Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  args: { title: 'Build queued', children: 'Results appear here in about two minutes.', icon: <InfoIcon />, tone: 'info' },
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Destructive: Story = { args: { tone: 'neg', icon: <AlertIcon />, title: 'Coverage below floor', children: 'cli is at 48.9%. The floor is 50%.', action: <Button size="sm">Review</Button> } };
export const TitleOnly: Story = { args: { tone: 'pos', children: undefined, icon: undefined, title: 'All checks passed' } };
