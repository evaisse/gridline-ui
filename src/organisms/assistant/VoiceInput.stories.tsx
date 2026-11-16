import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms';
import { VoiceInput } from './VoiceInput';

const meta = { title: 'Organisms/Assistant/VoiceInput', tags: ['ai', 'input', 'media'], component: VoiceInput } satisfies Meta<typeof VoiceInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = { args: { listening: false, supported: true } };
export const Listening: Story = { args: { listening: true, supported: true, interim: 'publish castor two point four' } };
export const Unsupported: Story = { args: { supported: false } };

function Live() {
  const [lines, setLines] = useState<string[]>([]);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <VoiceInput onTranscript={(text) => setLines((prev) => [...prev, text])} />
      {lines.map((line, index) => <Text key={index} variant="small">{line}</Text>)}
    </div>
  );
}
export const Dictation: Story = { render: () => <Live /> };
