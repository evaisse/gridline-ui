import { Tooltip as Base } from 'radix-ui';
import type { ReactElement, ReactNode } from 'react';
import './Tooltip.css';

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

/** An inverted mono caption on hover or focus. */
export function Tooltip({ content, children, side = 'top', delay = 200 }: TooltipProps) {
  return (
    <Base.Provider delayDuration={delay}>
      <Base.Root>
        <Base.Trigger asChild>{children}</Base.Trigger>
        <Base.Portal>
          <Base.Content side={side} sideOffset={6} className="gl-tooltip">{content}</Base.Content>
        </Base.Portal>
      </Base.Root>
    </Base.Provider>
  );
}
