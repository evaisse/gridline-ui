import type { Meta, StoryObj } from '@storybook/react-vite';
import { Blockquote, InlineCode, Prose } from './Prose';

const meta = { title: 'Atoms/Typography/Prose', tags: ['text'], component: Prose } satisfies Meta<typeof Prose>;
export default meta;

export const Article: StoryObj<typeof meta> = {
  render: () => (
    <Prose>
      <h1>Release notes</h1>
      <p>Version 4.2 makes the <code>parser</code> incremental. Read the <a href="#">migration guide</a> first.</p>
      <h2>Changes</h2>
      <ul><li>Error recovery in nested blocks</li><li>Smaller syntax tree</li></ul>
      <blockquote>Structure comes from thin rules, not from floating cards.</blockquote>
      <pre>npm install tessera@4.2.0</pre>
      <table><thead><tr><th>Module</th><th>Size</th></tr></thead><tbody><tr><td>core</td><td>12.4 kB</td></tr><tr><td>parser</td><td>41.2 kB</td></tr></tbody></table>
    </Prose>
  ),
};
export const Pieces: StoryObj<typeof meta> = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
      <Blockquote>One ink, one tint, one hairline.</Blockquote>
      <p>Run <InlineCode>npm run check</InlineCode> before pushing.</p>
    </div>
  ),
};
