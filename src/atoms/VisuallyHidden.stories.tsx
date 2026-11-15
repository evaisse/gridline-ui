import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisuallyHidden } from './VisuallyHidden';

const meta = { title: 'Atoms/Layout/VisuallyHidden', tags: ['a11y'], component: VisuallyHidden } satisfies Meta<typeof VisuallyHidden>;
export default meta;

/** The button shows a glyph only; the hidden text gives it a name for screen readers. */
export const Default: StoryObj<typeof meta> = {
  render: () => <button type="button">✕<VisuallyHidden> Close the panel</VisuallyHidden></button>,
};
