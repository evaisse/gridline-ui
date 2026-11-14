import { AssistantModalPrimitive } from '@assistant-ui/react';
import { Button } from '../atoms';
import { ChatIcon } from '../tokens/icons';
import { AssistantThread, type AssistantThreadProps } from './AssistantThread';
import '../tokens/overlay.css';
import './AssistantModal.css';

export interface AssistantModalProps {
  /** Label of the launcher button. */
  label?: string;
  thread?: AssistantThreadProps;
}

/** A launcher pinned to the corner of the page that opens a thread in a floating panel. */
export function AssistantModal({ label = 'Ask', thread }: AssistantModalProps) {
  return (
    <AssistantModalPrimitive.Root>
      <AssistantModalPrimitive.Anchor className="gl-assistant-modal__anchor">
        <AssistantModalPrimitive.Trigger asChild>
          <Button variant="solid" icon={<ChatIcon />}>{label}</Button>
        </AssistantModalPrimitive.Trigger>
      </AssistantModalPrimitive.Anchor>
      <AssistantModalPrimitive.Content sideOffset={12} className="gl-pop gl-assistant-modal">
        <AssistantThread {...thread} />
      </AssistantModalPrimitive.Content>
    </AssistantModalPrimitive.Root>
  );
}
