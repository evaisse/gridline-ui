import type { Meta, StoryObj } from '@storybook/react-vite';
import { Diff } from './Diff';

const before = `{
  "name": "tessera",
  "version": "4.1.0",
  "main": "dist/index.js",
  "license": "MIT"
}`;
const after = `{
  "name": "tessera",
  "version": "4.2.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "license": "MIT"
}`;
const meta = { title: 'Molecules/Data display/Diff', tags: ['code'], component: Diff, args: { before, after, title: 'package.json' }, decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>] } satisfies Meta<typeof Diff>;
export default meta;

export const Unified: StoryObj<typeof meta> = {};
export const Split: StoryObj<typeof meta> = { args: { view: 'split' } };
export const NewFile: StoryObj<typeof meta> = { args: { before: '', after: 'export const answer = 42;\nexport default answer;', title: 'answer.ts' } };
export const Identical: StoryObj<typeof meta> = { args: { before: 'same\ntext', after: 'same\ntext', title: 'notes.txt' } };
