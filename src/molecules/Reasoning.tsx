import type { ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Label, Spinner } from '../atoms';
import { ChevronRightIcon, SparkIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './Reasoning.css';

export interface ReasoningProps {
  /** The reasoning text, or grouped reasoning parts. */
  children: ReactNode;
  /** True while the model is still thinking. */
  running?: boolean;
  /** Seconds spent, shown once finished. */
  duration?: number;
  defaultOpen?: boolean;
  className?: string;
}

/** A collapsed record of the model's reasoning. */
export function Reasoning({ children, running = false, duration, defaultOpen = false, className }: ReasoningProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className={cx('gl-reasoning', className)}>
      <CollapsibleTrigger className="gl-reasoning__trigger">
        {running ? <Spinner label="Thinking" /> : <SparkIcon width={12} height={12} />}
        <Label tone="inherit">{running ? 'Thinking' : duration != null ? `Thought for ${duration}s` : 'Reasoning'}</Label>
        <ChevronRightIcon width={12} height={12} className="gl-reasoning__chevron" />
      </CollapsibleTrigger>
      <CollapsibleContent className="gl-reasoning__content">{children}</CollapsibleContent>
    </Collapsible>
  );
}
