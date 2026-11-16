import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta = {
  title: 'Organisms/Marketing/Footer', tags: ['shell', 'wayfinding'], component: Footer, parameters: { layout: 'fullscreen' },
  args: {
    brand: '◆ Gridline Registry', note: 'Measured packages for data-dense teams.',
    columns: [
      { title: 'Product', links: [{ label: 'Catalogue', href: '#' }, { label: 'Comparisons', href: '#' }, { label: 'Alerts', href: '#' }, { label: 'Pricing', href: '#' }] },
      { title: 'Developers', links: [{ label: 'Documentation', href: '#' }, { label: 'Command line', href: '#' }, { label: 'API reference', href: '#' }] },
      { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Method', href: '#' }, { label: 'Changelog', href: '#' }] },
    ],
    legal: '© 2026 Gridline · invented company, invented figures',
  },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Minimal: Story = { args: { note: undefined, columns: [{ title: 'Legal', links: [{ label: 'Terms', href: '#' }, { label: 'Privacy', href: '#' }] }] } };
