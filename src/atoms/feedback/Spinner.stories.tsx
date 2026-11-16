import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = { title: 'Atoms/Feedback/Spinner', tags: ['loading'], component: Spinner } satisfies Meta<typeof Spinner>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
