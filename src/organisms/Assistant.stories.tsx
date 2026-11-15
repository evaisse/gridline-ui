import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text } from '../atoms';
import { MockAssistant, sampleConversation } from '../utils/mockAssistant';
import { AssistantComposer } from './AssistantComposer';
import { AssistantModal } from './AssistantModal';
import { AssistantSidebar } from './AssistantSidebar';
import { AssistantThread } from './AssistantThread';
import { AssistantThreadList } from './AssistantThreadList';

const meta = { title: 'Organisms/Assistant/Assistant', tags: ['ai', 'chat', 'input', 'list', 'popup', 'shell'], component: AssistantThread, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof AssistantThread>;
export default meta;
type Story = StoryObj<typeof meta>;

const suggestions = [
  { title: 'Summarise the 4.2.0 release', prompt: 'How did the 4.2.0 release do?' },
  { title: 'Which module grew the most?', prompt: 'Which module grew the most in size?' },
];

/** An empty thread. The stories run on a canned local model: send anything to see it think, call a tool and stream. */
export const Welcome: Story = {
  render: () => <MockAssistant><div style={{ height: 520 }}><AssistantThread welcome={{ title: 'Ask about a release', description: 'Coverage, size and build time, straight from the reports.' }} suggestions={suggestions} /></div></MockAssistant>,
};

/** A finished exchange: reasoning, a tool call, Markdown, then the action bar. */
export const Conversation: Story = {
  render: () => <MockAssistant initialMessages={sampleConversation}><div style={{ height: 640 }}><AssistantThread /></div></MockAssistant>,
};

export const Composer: Story = {
  render: () => <MockAssistant><div style={{ maxWidth: 560, padding: 16 }}><AssistantComposer attachments /></div></MockAssistant>,
};

export const ThreadList: Story = {
  render: () => (
    <MockAssistant initialMessages={sampleConversation}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', height: 520, borderBottom: '1px solid var(--gl-rule-strong)' }}>
        <div style={{ borderRight: '1px solid var(--gl-rule-strong)' }}><AssistantThreadList /></div>
        <AssistantThread />
      </div>
    </MockAssistant>
  ),
};

/** The launcher sits in the bottom-right corner of the page. */
export const Modal: Story = {
  render: () => (
    <MockAssistant>
      <div style={{ height: 640, padding: 24 }}><Heading level={2}>Your page</Heading><Text tone="muted">Open the assistant from the corner.</Text></div>
      <AssistantModal thread={{ suggestions }} />
    </MockAssistant>
  ),
};

/** The assistant docked beside the application, with a draggable divider. */
export const SidebarLayout: Story = {
  render: () => (
    <MockAssistant initialMessages={sampleConversation}>
      <div style={{ height: 560, borderBottom: '1px solid var(--gl-rule-strong)' }}>
        <AssistantSidebar><div className="gl-dots" style={{ height: '100%', padding: 24 }}><Heading level={2}>Your application</Heading></div></AssistantSidebar>
      </div>
    </MockAssistant>
  ),
};
