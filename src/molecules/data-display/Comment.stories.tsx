import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms';
import { Comment } from './Comment';

const meta = { title: 'Molecules/Data display/Comment', tags: ['identity', 'text', 'history'], component: Comment, args: { author: 'Ines Varga', time: '2 h ago', children: 'The parser change looks right, but the bundle grew by 6 kB. Can we check tree-shaking before the release?' }, decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>] } satisfies Meta<typeof Comment>;
export default meta;

export const Default: StoryObj<typeof meta> = {};

export const WithActions: StoryObj<typeof meta> = {
  args: { badge: 'maintainer', actions: <><Button size="sm" variant="ghost">Reply</Button><Button size="sm" variant="ghost">Resolve</Button></> },
};

export const WithReplies: StoryObj<typeof meta> = {
  args: {
    replies: (
      <>
        <Comment author="Tomas Brandt" time="1 h ago">Confirmed: the barrel export pulls in the whole locale table.</Comment>
        <Comment author="Ines Varga" time="40 min ago" badge="edited">Thanks, I will split it into per-locale entries.</Comment>
      </>
    ),
  },
};
