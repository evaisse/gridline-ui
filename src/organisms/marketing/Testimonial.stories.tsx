import type { Meta, StoryObj } from '@storybook/react-vite';
import { Testimonial } from './Testimonial';

const meta = {
  title: 'Organisms/Marketing/Testimonial', tags: ['text', 'identity'], component: Testimonial, parameters: { layout: 'fullscreen' },
  args: { quote: 'We replaced three dependencies in a week. For the first time the discussion was about numbers everyone could see.', author: 'Ines Carvalho', role: 'Platform lead, Tessera Labs' },
} satisfies Meta<typeof Testimonial>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Stacked: Story = {};
export const Split: Story = { args: { layout: 'split' } };
export const NoRole: Story = { args: { quote: 'Measurements, not stars.', author: 'Tomas Reyes' } };
