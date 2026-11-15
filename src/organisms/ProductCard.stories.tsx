import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms';
import { PlusIcon } from '../tokens/icons';
import { ProductCard } from './ProductCard';

const meta = {
  title: 'Organisms/Commerce/ProductCard', tags: ['container', 'media'], component: ProductCard,
  args: { name: 'Meridian 75', kind: 'Keyboard', description: 'Aluminium 75% board, hot-swap sockets, gasket mount.', price: 189, rating: 4.5, reviews: 312, tag: { label: 'New', tone: 'info' }, action: <Button size="sm" icon={<PlusIcon />}>Add</Button> },
  decorators: [(Story) => <div style={{ maxWidth: 280, border: '1px solid var(--gl-rule-strong)' }}><Story /></div>],
} satisfies Meta<typeof ProductCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Discounted: Story = { args: { price: 149, previousPrice: 189, tag: { label: 'Sale', tone: 'pos' } } };
export const Horizontal: Story = { args: { layout: 'horizontal' }, decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>] };
