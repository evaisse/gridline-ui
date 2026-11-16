import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentThread, type ThreadComment } from './CommentThread';

const seed: ThreadComment[] = [
  {
    id: 'c1', author: 'Ines Varga', time: '2 h ago', badge: 'maintainer',
    body: 'The parser change looks right, but the bundle grew by 6 kB. Can we check tree-shaking before the release?',
    replies: [{ id: 'c2', author: 'Tomas Brandt', time: '1 h ago', body: 'Confirmed: the barrel export pulls in the whole locale table.' }],
  },
  { id: 'c3', author: 'Mei Okafor', time: '30 min ago', body: 'Release notes drafted for quillmark 0.9.' },
];
const meta = { title: 'Organisms/Data display/CommentThread', tags: ['history', 'identity', 'input'], component: CommentThread, args: { comments: seed }, decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>] } satisfies Meta<typeof CommentThread>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
export const Empty: StoryObj<typeof meta> = { args: { comments: [], title: 'Review notes' } };

function Live() {
  const [comments, setComments] = useState(seed);
  const counter = useRef(0);
  const add = (list: ThreadComment[], text: string, id: string, parentId?: string): ThreadComment[] =>
    parentId == null
      ? [...list, { id, author: 'You', time: 'just now', body: text }]
      : list.map((c) => (c.id === parentId ? { ...c, replies: [...(c.replies ?? []), { id, author: 'You', time: 'just now', body: text }] } : { ...c, replies: c.replies && add(c.replies, text, id, parentId) }));
  return <CommentThread comments={comments} onSubmit={(text, parentId) => { counter.current += 1; const id = `n${counter.current}`; setComments((list) => add(list, text, id, parentId)); }} />;
}
export const Interactive: StoryObj<typeof meta> = { render: () => <Live /> };
