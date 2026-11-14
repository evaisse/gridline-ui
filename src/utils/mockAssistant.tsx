import { AssistantRuntimeProvider, useLocalRuntime, type ChatModelAdapter, type ThreadMessageLike } from '@assistant-ui/react';
import type { ReactNode } from 'react';

const REPLY = `Here is what the release data shows.

**Coverage rose to 68.5%**, up 2.1 points, driven by the \`parser\` module.

| Module | Coverage | Size |
| --- | --- | --- |
| core | 91.4% | 12.4 kB |
| parser | 73.6% | 41.2 kB |
| cli | 48.9% | 7.9 kB |

Two things to watch:

1. \`parser\` is now the largest module by a wide margin.
2. \`cli\` coverage is below the 50% floor.

\`\`\`bash
npm run coverage -- --module cli
\`\`\`
`;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** A canned model: it "thinks", calls a tool, then streams a Markdown answer. No network. */
const adapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const reasoning = { type: 'reasoning' as const, text: 'The question is about the latest release. I should read the report before answering.' };
    const call = { type: 'tool-call' as const, toolCallId: 'call-1', toolName: 'read_report', args: { release: '4.2.0' }, argsText: '{\n  "release": "4.2.0"\n}' };
    yield { content: [reasoning] };
    await wait(500);
    yield { content: [reasoning, call] };
    await wait(700);
    const done = { ...call, result: { modules: 4, coverage: 68.49 } };
    const words = REPLY.split(/(?<=\s)/);
    let text = '';
    for (const word of words) {
      if (abortSignal.aborted) return;
      text += word;
      yield { content: [reasoning, done, { type: 'text' as const, text }] };
      await wait(18);
    }
  },
};

/** A short finished exchange, for stories that should not start empty. */
export const sampleConversation: ThreadMessageLike[] = [
  { role: 'user', content: 'How did the 4.2.0 release do?' },
  {
    role: 'assistant',
    content: [
      { type: 'reasoning', text: 'The question is about the latest release. I should read the report before answering.' },
      { type: 'tool-call', toolCallId: 'call-0', toolName: 'read_report', args: { release: '4.2.0' }, argsText: '{\n  "release": "4.2.0"\n}', result: { modules: 4, coverage: 68.49 } },
      { type: 'text', text: REPLY },
    ],
  },
];

export interface MockAssistantProps {
  children: ReactNode;
  initialMessages?: ThreadMessageLike[];
}

/** Provides an in-memory assistant-ui runtime so stories work without a backend. */
export function MockAssistant({ children, initialMessages }: MockAssistantProps) {
  const runtime = useLocalRuntime(adapter, { initialMessages });
  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
