import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Button, Marker } from '../atoms';
import { Attachment, Bubble } from '../molecules';
import { CopyIcon, RefreshIcon } from '../tokens/icons';
import { Message } from './Message';
import { MessageScroller } from './MessageScroller';

const meta = { title: 'Organisms/Assistant/Message', tags: ['ai', 'chat'], component: Message, decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>] } satisfies Meta<typeof Message>;
export default meta;
type Story = StoryObj<typeof meta>;

const actions = <><Button variant="ghost" size="sm" icon={<CopyIcon />} aria-label="Copy" /><Button variant="ghost" size="sm" icon={<RefreshIcon />} aria-label="Retry" /></>;

export const Assistant: Story = {
  args: { avatar: <Avatar fallback="ai" />, author: 'Assistant', meta: '14:02', footer: actions, children: <Bubble variant="plain">Coverage rose to 68.5%, up 2.1 points, driven by the parser module.</Bubble> },
};
export const Person: Story = {
  args: { align: 'end', author: 'You', meta: '14:01', children: <><Attachment name="coverage-report.pdf" meta="PDF · 240 kB" /><Bubble align="end">How did the 4.2.0 release do?</Bubble></> },
};

/** Messages, markers and bubbles inside a MessageScroller. Scroll up to release the pin. */
export const Conversation: Story = {
  render: () => (
    <MessageScroller style={{ height: 360, border: '1px solid var(--gl-rule-strong)' }}>
      <Marker>Today</Marker>
      <Message align="end" author="You" meta="14:01"><Bubble align="end">How did the 4.2.0 release do?</Bubble></Message>
      <Message avatar={<Avatar fallback="ai" />} author="Assistant" meta="14:02" footer={actions}>
        <Bubble variant="plain">Coverage rose to 68.5%, up 2.1 points, driven by the parser module.</Bubble>
      </Message>
      <Marker variant="row">Report attached to the thread</Marker>
      <Message align="end" author="You" meta="14:04"><Bubble align="end">And bundle size?</Bubble></Message>
      <Message avatar={<Avatar fallback="ai" />} author="Assistant" meta="14:04" footer={actions}>
        <Bubble variant="plain">41.2 kB for parser, which is now the largest module by a wide margin. core is 12.4 kB and cli 7.9 kB.</Bubble>
      </Message>
    </MessageScroller>
  ),
};
