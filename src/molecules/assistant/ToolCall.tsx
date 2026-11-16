import type { ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Label, Spinner } from '../../atoms';
import { AlertIcon, CheckIcon, ChevronRightIcon, TerminalIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { CodeBlock } from '../data-display/CodeBlock';
import './ToolCall.css';

export interface ToolCallProps {
  toolName: string;
  /** The arguments, as JSON text. */
  argsText?: string;
  result?: unknown;
  status?: 'running' | 'complete' | 'error' | 'requires-action';
  /** Replaces the default arguments and result view. */
  children?: ReactNode;
  className?: string;
}

const stringify = (value: unknown) => (typeof value === 'string' ? value : JSON.stringify(value, null, 2));

/** One tool call: a ruled line that opens to show arguments and result. */
export function ToolCall({ toolName, argsText, result, status = 'complete', children, className }: ToolCallProps) {
  return (
    <Collapsible className={cx('gl-tool-call', className)} data-status={status}>
      <CollapsibleTrigger className="gl-tool-call__trigger">
        <span className="gl-tool-call__icon">
          {status === 'running' ? <Spinner label="Running" /> : status === 'error' ? <AlertIcon /> : <TerminalIcon />}
        </span>
        <Label tone="ink">{toolName}</Label>
        <Label size="xs" className="gl-tool-call__status">
          {status === 'complete' && <CheckIcon width={10} height={10} />}
          {status.replace('-', ' ')}
        </Label>
        <ChevronRightIcon width={12} height={12} className="gl-tool-call__chevron" />
      </CollapsibleTrigger>
      <CollapsibleContent className="gl-tool-call__content">
        {children ?? (
          <>
            {argsText && <CodeBlock title="Arguments" code={argsText} copyable={false} />}
            {result !== undefined && <CodeBlock title="Result" code={stringify(result)} copyable={false} />}
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
