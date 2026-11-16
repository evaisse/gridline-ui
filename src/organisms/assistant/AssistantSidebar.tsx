import type { ReactNode } from 'react';
import { ResizableGroup, ResizableHandle, ResizablePanel } from '../../molecules';
import { AssistantThread, type AssistantThreadProps } from './AssistantThread';
import './AssistantSidebar.css';

export interface AssistantSidebarProps {
  /** The application the assistant sits beside. */
  children: ReactNode;
  thread?: AssistantThreadProps;
}

/** Your content on the left, a thread on the right, a draggable hairline between. */
export function AssistantSidebar({ children, thread }: AssistantSidebarProps) {
  return (
    <ResizableGroup orientation="horizontal" className="gl-assistant-sidebar">
      <ResizablePanel defaultSize="62%" minSize="30%">{children}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize="280px"><AssistantThread {...thread} /></ResizablePanel>
    </ResizableGroup>
  );
}
