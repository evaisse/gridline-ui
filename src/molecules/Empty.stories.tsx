import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms';
import { SearchIcon } from '../tokens/icons';
import { Empty } from './Empty';

const meta = {
  title: 'Molecules/Feedback/Empty', tags: ['status', 'message'],
  component: Empty,
  args: { icon: <SearchIcon />, title: 'No packages match', description: 'Try a broader category or clear the status filter.', action: <Button>Clear filters</Button> },
} satisfies Meta<typeof Empty>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
