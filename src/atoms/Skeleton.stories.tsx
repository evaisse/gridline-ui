import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = { title: 'Atoms/Feedback/Skeleton', tags: ['loading'], component: Skeleton } satisfies Meta<typeof Skeleton>;
export default meta;

export const Lines: StoryObj<typeof meta> = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <Skeleton style={{ height: 24, width: '60%' }} />
      <Skeleton />
      <Skeleton />
      <Skeleton style={{ width: '80%' }} />
    </div>
  ),
};
