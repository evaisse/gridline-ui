import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms';
import { PricingTable } from './PricingTable';

const plans = [
  { id: 'open', name: 'Open', price: '0', period: 'For public packages', features: ['Unlimited public packages', 'Weekly measurements', 'Community support'], action: <Button>Start free</Button> },
  { id: 'team', name: 'Team', price: '24', period: 'Per seat, per month', features: ['Private packages', 'Measurements on every release', 'Regression alerts', 'Priority support'], action: <Button variant="solid">Try for 14 days</Button>, featured: true },
  { id: 'org', name: 'Organisation', price: '—', period: 'Annual contract', features: ['Single sign-on', 'Self-hosted runners', 'Audit log', 'Named contact'], action: <Button>Contact us</Button> },
];
const meta = { title: 'Organisms/Marketing/PricingTable', tags: ['data', 'list'], component: PricingTable, args: { plans } } satisfies Meta<typeof PricingTable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ThreePlans: Story = {};
export const TwoPlans: Story = { args: { plans: plans.slice(0, 2) } };
