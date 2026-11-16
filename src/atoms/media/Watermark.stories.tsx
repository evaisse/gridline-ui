import type { Meta, StoryObj } from '@storybook/react-vite';
import { Watermark } from './Watermark';

const body = (
  <div style={{ padding: 24, minHeight: 240 }}>
    <h3 style={{ margin: 0 }}>Release notes: castor 3.1</h3>
    <p>Adds incremental index refresh, drops the legacy mirror protocol and fixes checksum drift on partial uploads.</p>
  </div>
);
const meta = { title: 'Atoms/Media/Watermark', tags: ['media'], component: Watermark, args: { text: 'DRAFT', children: body, style: { border: '1px solid var(--gl-rule-strong)' } } } satisfies Meta<typeof Watermark>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const MultiLine: Story = { args: { text: ['CONFIDENTIAL', 'quillmark internal'], tileWidth: 240, tileHeight: 140 } };
export const Steep: Story = { args: { text: 'copy', rotate: -45, fontSize: 16, tileWidth: 120, tileHeight: 80 } };
