import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms';
import { Banner } from './Banner';

const meta = { title: 'Molecules/Feedback/Banner', tags: ['message', 'status'], component: Banner, parameters: { layout: 'fullscreen' }, args: { label: 'Maintenance', children: 'The registry is read-only on Saturday from 02:00 to 04:00 UTC.' } } satisfies Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Dismissible: Story = { args: { tone: 'info', label: 'New', children: 'Charts and the assistant are available in release 0.2.', dismissible: true } };
export const WithAction: Story = { args: { tone: 'warn', label: 'Billing', children: 'Your card expires this month.', action: <Button size="sm">Update card</Button> } };
export const Negative: Story = { args: { tone: 'neg', label: 'Incident', children: 'Publishing is unavailable. We are working on it.' } };
