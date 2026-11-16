import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mentions, type MentionOption } from './Mentions';

const people: MentionOption[] = [
  { value: 'ada', label: 'Ada Reyes', description: 'tessera' },
  { value: 'bram', label: 'Bram Okafor', description: 'quillmark' },
  { value: 'castor-bot', label: 'Castor Bot', description: 'automation' },
  { value: 'dana', label: 'Dana Whitlock', description: 'maintainer' },
];
const packages: MentionOption[] = [
  { value: 'tessera-core', label: 'tessera-core' },
  { value: 'quillmark-parser', label: 'quillmark-parser' },
];

const meta = { title: 'Molecules/Forms/Mentions', tags: ['input', 'text', 'selection'], component: Mentions, args: { options: people, 'aria-label': 'Comment', placeholder: 'Write a comment, type @ to mention someone' }, decorators: [(Story) => <div style={{ maxWidth: 420, minHeight: 260 }}><Story /></div>] } satisfies Meta<typeof Mentions>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'Thanks @ada, can @bram take another look? ' } };
export const TwoTriggers: Story = { args: { options: [...people, ...packages], triggers: ['@', '#'], placeholder: 'Type @ or #' } };

function ControlledDemo() {
  const [text, setText] = useState('Ping @');
  return (
    <>
      <Mentions options={people} value={text} onChange={setText} aria-label="Comment" />
      <p style={{ font: '11px monospace' }}>{text.length} characters</p>
    </>
  );
}
export const Controlled: Story = { render: () => <ControlledDemo /> };
