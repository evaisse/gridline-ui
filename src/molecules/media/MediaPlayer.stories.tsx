import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaPlayer } from './MediaPlayer';

/** Builds a silent 8-bit mono WAV of the given length as a data URI, entirely in code. */
function silentWav(seconds: number): string {
  const rate = 8000;
  const length = seconds * rate;
  const bytes = new Uint8Array(44 + length);
  const view = new DataView(bytes.buffer);
  const text = (offset: number, value: string) => [...value].forEach((c, i) => bytes.set([c.charCodeAt(0)], offset + i));
  text(0, 'RIFF'); view.setUint32(4, 36 + length, true); text(8, 'WAVE'); text(12, 'fmt ');
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, rate, true); view.setUint32(28, rate, true); view.setUint16(32, 1, true); view.setUint16(34, 8, true);
  text(36, 'data'); view.setUint32(40, length, true);
  bytes.fill(128, 44);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return `data:audio/wav;base64,${btoa(binary)}`;
}

const meta = { title: 'Molecules/Media/MediaPlayer', tags: ['media'], component: MediaPlayer, args: { title: 'Release call, tessera 2.4' }, decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>] } satisfies Meta<typeof MediaPlayer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NoSource: Story = {};
export const SilentAudio: Story = { args: { src: silentWav(30), title: 'Silent sample, 30 seconds' } };
export const VideoEmpty: Story = { args: { kind: 'video', title: 'Walkthrough, quillmark editor' } };
