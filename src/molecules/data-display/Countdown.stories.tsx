import type { Meta, StoryObj } from '@storybook/react-vite';
import { Countdown } from './Countdown';

const NOW = '2026-11-16T12:00:00Z';

const meta = { title: 'Molecules/Data display/Countdown', tags: ['date', 'number'], component: Countdown, args: { now: NOW, target: '2026-11-19T15:42:09Z', 'aria-label': undefined } } satisfies Meta<typeof Countdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LastMinute: Story = { args: { target: '2026-11-16T12:00:42Z' } };
export const Ended: Story = { args: { target: '2026-11-15T12:00:00Z', doneLabel: 'Release window closed' } };
export const Live: Story = { args: { now: undefined, target: new Date(Date.now() + 2 * 3600e3 + 5 * 60e3).toISOString() } };
