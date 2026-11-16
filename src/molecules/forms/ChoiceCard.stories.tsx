import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChoiceCard } from './ChoiceCard';

const plans = [
  { value: 'hobby', title: 'Hobby', description: 'Public packages, community support.', meta: '0 / month' },
  { value: 'team', title: 'Team', description: 'Private packages and audit log.', meta: '12 / seat' },
  { value: 'org', title: 'Organisation', description: 'Single sign-on and a registry mirror.', meta: '40 / seat' },
  { value: 'legacy', title: 'Legacy', description: 'No longer offered.', disabled: true },
];

const meta = { title: 'Molecules/Forms/ChoiceCard', tags: ['input', 'selection'], component: ChoiceCard, args: { options: plans, 'aria-label': 'Plan' } } satisfies Meta<typeof ChoiceCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Radio: Story = { args: { defaultValue: 'team' } };
export const Checkbox: Story = { args: { type: 'checkbox', defaultValue: ['hobby', 'org'], 'aria-label': 'Plans to compare' } };
export const ThreeColumns: Story = { args: { columns: 3, options: plans.slice(0, 3) } };

function ControlledDemo() {
  const [value, setValue] = useState('hobby');
  return (
    <>
      <ChoiceCard options={plans} value={value} onChange={setValue} columns={1} aria-label="Plan" />
      <p style={{ font: '11px monospace' }}>selected: {value}</p>
    </>
  );
}
export const Controlled: Story = { render: () => <ControlledDemo /> };
