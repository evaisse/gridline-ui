import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  args: { children: 'Download', variant: 'ruled', size: 'md' },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {};
export const Solid: Story = { args: { variant: 'solid' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Compare' } };
export const WithIcon: Story = { args: { icon: '↓' } };
export const Small: Story = { args: { size: 'sm' } };
export const Disabled: Story = { args: { disabled: true } };
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button variant="solid">Solid</Button>
      <Button>Ruled</Button>
      <Button variant="ghost">Ghost</Button>
      <Button icon="↗">Open</Button>
      <Button size="sm">Small</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
