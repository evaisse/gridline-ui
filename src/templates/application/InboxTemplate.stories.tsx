import type { Meta, StoryObj } from '@storybook/react-vite';
import { InboxTemplate } from './InboxTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Inbox', tags: ['page', 'list', 'message'],
  component: InboxTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 48), folders: slot('folders', '100%'), list: slot('list', '100%'), children: slot('reading pane', 360) },
} satisfies Meta<typeof InboxTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Inbox for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
