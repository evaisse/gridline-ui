import {
  AuiIf, ComposerPrimitive, ErrorPrimitive, MessagePrimitive, SelectionToolbarPrimitive, ThreadPrimitive, useAuiState,
  type ReasoningMessagePartProps, type SourceMessagePartProps, type ToolCallMessagePartProps,
} from '@assistant-ui/react';
import type { ReactNode } from 'react';
import { Button, Heading, Label, Text } from '../atoms';
import { AssistantActionBar, BranchPicker, MarkdownText, Reasoning, ToolCall, UserActionBar } from '../molecules';
import { AlertIcon, ArrowDownIcon, GlobeIcon, QuoteIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import { AssistantComposer, type AssistantComposerProps } from './AssistantComposer';
import './AssistantThread.css';

function ToolPart(part: ToolCallMessagePartProps) {
  const status = part.status.type === 'running' ? 'running' : part.status.type === 'requires-action' ? 'requires-action' : part.isError ? 'error' : 'complete';
  return <ToolCall toolName={part.toolName} argsText={part.argsText} result={part.result} status={status} />;
}

function ReasoningPart(part: ReasoningMessagePartProps) {
  return <Reasoning running={part.status.type === 'running'}>{part.text}</Reasoning>;
}

function SourcePart(part: SourceMessagePartProps) {
  return (
    <a className="gl-thread__source" href={part.url} target="_blank" rel="noreferrer">
      <GlobeIcon width={12} height={12} />
      <Label tone="inherit" size="xs">{part.title ?? part.url}</Label>
    </a>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="gl-thread__message" data-role="assistant">
      <Label size="xs">Assistant</Label>
      <div className="gl-thread__parts">
        <MessagePrimitive.Parts components={{ Text: MarkdownText, Reasoning: ReasoningPart, Source: SourcePart, tools: { Fallback: ToolPart } }} />
        <MessagePrimitive.Error>
          <ErrorPrimitive.Root className="gl-thread__error">
            <AlertIcon />
            <ErrorPrimitive.Message />
          </ErrorPrimitive.Root>
        </MessagePrimitive.Error>
      </div>
      <div className="gl-thread__meta">
        <BranchPicker />
        <AssistantActionBar />
      </div>
    </MessagePrimitive.Root>
  );
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="gl-thread__message" data-role="user">
      <div className="gl-thread__user-row">
        <UserActionBar />
        <div className="gl-thread__user-bubble"><MessagePrimitive.Parts /></div>
      </div>
      <BranchPicker />
    </MessagePrimitive.Root>
  );
}

function EditComposer() {
  return (
    <MessagePrimitive.Root className="gl-thread__message" data-role="user">
      <ComposerPrimitive.Root className="gl-thread__edit">
        <ComposerPrimitive.Input className="gl-thread__edit-input" autoFocus aria-label="Edit message" />
        <div className="gl-thread__edit-bar">
          <ComposerPrimitive.Cancel asChild><Button size="sm">Cancel</Button></ComposerPrimitive.Cancel>
          <ComposerPrimitive.Send asChild><Button size="sm" variant="solid">Update</Button></ComposerPrimitive.Send>
        </div>
      </ComposerPrimitive.Root>
    </MessagePrimitive.Root>
  );
}

function ThreadMessage() {
  const role = useAuiState((s) => s.message.role);
  const editing = useAuiState((s) => s.message.composer.isEditing);
  if (editing) return <EditComposer />;
  return role === 'user' ? <UserMessage /> : <AssistantMessage />;
}

export interface ThreadSuggestion {
  title: string;
  /** The message sent when the suggestion is chosen. */
  prompt: string;
}

export interface AssistantThreadProps {
  /** Shown while the thread is empty. */
  welcome?: { title: ReactNode; description?: ReactNode };
  suggestions?: ThreadSuggestion[];
  composer?: AssistantComposerProps;
  className?: string;
}

/**
 * A full conversation: messages, a welcome state with suggestions, and the composer.
 * Render it under an assistant-ui runtime provider.
 */
export function AssistantThread({ welcome = { title: 'How can I help?' }, suggestions = [], composer, className }: AssistantThreadProps) {
  return (
    <ThreadPrimitive.Root className={cx('gl-thread', className)}>
      <ThreadPrimitive.Viewport className="gl-thread__viewport">
        <div className="gl-thread__column">
          <AuiIf condition={(s) => s.thread.isEmpty}>
            <div className="gl-thread__welcome">
              <Heading level={2}>{welcome.title}</Heading>
              {welcome.description != null && <Text variant="lead" tone="muted">{welcome.description}</Text>}
            </div>
          </AuiIf>
          <ThreadPrimitive.Messages>{() => <ThreadMessage />}</ThreadPrimitive.Messages>
          <ThreadPrimitive.ViewportFooter className="gl-thread__footer">
            <ThreadPrimitive.ScrollToBottom asChild>
              <Button size="sm" className="gl-thread__jump" icon={<ArrowDownIcon />}>Latest</Button>
            </ThreadPrimitive.ScrollToBottom>
            <AuiIf condition={(s) => s.thread.isEmpty}>
              {suggestions.length > 0 && (
                <div className="gl-thread__suggestions">
                  {suggestions.map((suggestion) => (
                    <ThreadPrimitive.Suggestion key={suggestion.prompt} prompt={suggestion.prompt} send className="gl-thread__suggestion">
                      <Label tone="inherit" size="xs">&gt;</Label>
                      <span>{suggestion.title}</span>
                    </ThreadPrimitive.Suggestion>
                  ))}
                </div>
              )}
            </AuiIf>
            <AssistantComposer {...composer} />
          </ThreadPrimitive.ViewportFooter>
        </div>
      </ThreadPrimitive.Viewport>
      <SelectionToolbarPrimitive.Root className="gl-thread__selection">
        <SelectionToolbarPrimitive.Quote asChild><Button size="sm" variant="solid" icon={<QuoteIcon />}>Quote</Button></SelectionToolbarPrimitive.Quote>
      </SelectionToolbarPrimitive.Root>
    </ThreadPrimitive.Root>
  );
}
