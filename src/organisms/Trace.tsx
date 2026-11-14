import type { ReactNode } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Label, Spinner } from '../atoms';
import { ChevronRightIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './Trace.css';

export interface TraceStep {
  id: string;
  icon?: ReactNode;
  title: ReactNode;
  /** Short metadata on the right: a duration, a count. */
  meta?: ReactNode;
  status?: 'done' | 'running' | 'error';
  /** Expandable detail: arguments, output, sources. */
  detail?: ReactNode;
}

export interface TraceProps {
  steps: TraceStep[];
  /** Heading above the steps, e.g. "Worked for 12s". */
  title?: ReactNode;
  className?: string;
}

/** The record of what an agent did: reasoning, tool calls, sources. One ruled line per step. */
export function Trace({ steps, title, className }: TraceProps) {
  return (
    <div className={cx('gl-trace', className)}>
      {title != null && <div className="gl-trace__title"><Label>{title}</Label></div>}
      <ol className="gl-trace__list">
        {steps.map((step) => {
          const line = (
            <>
              <span className="gl-trace__icon">{step.status === 'running' ? <Spinner label="Running" /> : step.icon}</span>
              <span className="gl-trace__step-title">{step.title}</span>
              {step.meta != null && <Label size="xs">{step.meta}</Label>}
            </>
          );
          return (
            <li key={step.id} className="gl-trace__step" data-status={step.status ?? 'done'}>
              {step.detail != null ? (
                <Collapsible>
                  <CollapsibleTrigger className="gl-trace__line gl-trace__line--button">
                    {line}
                    <ChevronRightIcon width={12} height={12} className="gl-trace__chevron" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="gl-trace__detail">{step.detail}</CollapsibleContent>
                </Collapsible>
              ) : (
                <div className="gl-trace__line">{line}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
