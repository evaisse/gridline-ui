import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, Tag } from '../atoms';
import { AssistantThread, AssistantThreadList } from '../organisms';
import { ChatTemplate } from '../templates';
import { MockAssistant, sampleConversation } from '../utils/mockAssistant';

function AssistantPage({ empty = false }: { empty?: boolean }) {
  return (
    <MockAssistant initialMessages={empty ? undefined : sampleConversation}>
      <ChatTemplate
        sidebar={<AssistantThreadList />}
        header={<><Label tone="ink">Release analyst</Label><Tag dot tone="pos">Local demo model</Tag></>}
      >
        <AssistantThread
          welcome={{ title: 'Ask about a release', description: 'Coverage, size and build time, straight from the reports.' }}
          suggestions={[
            { title: 'Summarise the 4.2.0 release', prompt: 'How did the 4.2.0 release do?' },
            { title: 'Which module grew the most?', prompt: 'Which module grew the most in size?' },
          ]}
        />
      </ChatTemplate>
    </MockAssistant>
  );
}

const meta = { title: 'Pages/Assistant', component: AssistantPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof AssistantPage>;
export default meta;
type Story = StoryObj<typeof meta>;

/** A chat application on a canned local model. Send a message to watch it think, call a tool and stream. */
export const Conversation: Story = {};
export const NewChat: Story = { args: { empty: true } };
