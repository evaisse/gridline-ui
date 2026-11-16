import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';

const meta = { title: 'Molecules/Forms/RichTextEditor', tags: ['input', 'text'], component: RichTextEditor, args: { 'aria-label': 'Release notes' } } satisfies Meta<typeof RichTextEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { placeholder: 'Describe what changed in this release' } };
export const Filled: Story = { args: { defaultValue: '<p><b>tessera 2.4</b> adds streaming parsing.</p><ul><li>Faster <i>cold start</i></li><li>New <a href="https://example.com/tessera">migration guide</a></li></ul>' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: '<p>Locked while the release is published.</p>' } };

function Mirror() {
  const [html, setHtml] = useState('<p>Edit me and watch the HTML.</p>');
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <RichTextEditor aria-label="Changelog entry" value={html} onChange={setHtml} />
      <pre style={{ margin: 0, fontFamily: 'var(--gl-font-mono)', fontSize: 11, whiteSpace: 'pre-wrap', color: 'var(--gl-ink-2)' }}>{html}</pre>
    </div>
  );
}
export const Controlled: Story = { render: () => <Mirror /> };
