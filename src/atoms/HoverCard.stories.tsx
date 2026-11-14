import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './HoverCard';

const meta = { title: 'Atoms/HoverCard', component: HoverCard } satisfies Meta<typeof HoverCard>;
export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <HoverCard openDelay={100}>
      <HoverCardTrigger href="#">tessera</HoverCardTrigger>
      <HoverCardContent>An incremental parser toolkit. 4 modules, 1.2M weekly installs.</HoverCardContent>
    </HoverCard>
  ),
};
