import type { Meta, StoryObj } from '@storybook/react-vite';
import { Portal } from './Portal';

const meta = { title: 'Atoms/Layout/Portal', tags: ['container'], component: Portal } satisfies Meta<typeof Portal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ToBody: Story = {
  render: () => (
    <div style={{ padding: 16, border: '1px solid var(--gl-rule-strong)' }}>
      This box is in the story root.
      <Portal>
        <div style={{ position: 'fixed', right: 16, bottom: 16, padding: '8px 12px', border: '1px solid var(--gl-rule-strong)', background: 'var(--gl-paper)', color: 'var(--gl-ink)' }}>
          Rendered at the end of body
        </div>
      </Portal>
    </div>
  ),
};
export const IntoContainer: Story = {
  render: () => {
    const host = typeof document === 'undefined' ? null : document.getElementById('storybook-root');
    return (
      <div style={{ padding: 16, border: '1px solid var(--gl-rule-strong)' }}>
        Portaled into the storybook root:
        <Portal container={host}>
          <div style={{ padding: 8, border: '1px solid var(--gl-rule-strong)', color: 'var(--gl-ink)' }}>Appended to a chosen container</div>
        </Portal>
      </div>
    );
  },
};
