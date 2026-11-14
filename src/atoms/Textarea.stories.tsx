import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  args: { placeholder: 'Describe the change', 'aria-label': 'Description' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Textarea>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
