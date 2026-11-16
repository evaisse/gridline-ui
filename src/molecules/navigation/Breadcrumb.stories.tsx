import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Molecules/Navigation/Breadcrumb', tags: ['wayfinding'],
  component: Breadcrumb,
  args: { items: [{ label: 'Catalogue', href: '#' }, { label: 'Parsing', href: '#' }, { label: 'tessera' }] },
} satisfies Meta<typeof Breadcrumb>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
