import type { ReactNode } from 'react';
import { Label } from '../atoms';
import { CheckIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './Steps.css';

export interface Step {
  id: string;
  label: ReactNode;
  description?: ReactNode;
}

export interface StepsProps {
  steps: Step[];
  /** Index of the step in progress. Earlier steps are done, later ones are pending. */
  current: number;
  /** Lets the user jump back to a finished step. */
  onStepClick?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/** Progress through a sequence. The current step inverts; finished steps show a check. */
export function Steps({ steps, current, onStepClick, orientation = 'horizontal', className }: StepsProps) {
  return (
    <ol className={cx('gl-steps', `gl-steps--${orientation}`, className)}>
      {steps.map((step, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'pending';
        const clickable = onStepClick != null && state === 'done';
        const body = (
          <>
            <span className="gl-steps__index">{state === 'done' ? <CheckIcon width={12} height={12} /> : index + 1}</span>
            <span className="gl-steps__text">
              <Label tone="inherit">{step.label}</Label>
              {step.description != null && <span className="gl-steps__desc">{step.description}</span>}
            </span>
          </>
        );
        return (
          <li key={step.id} className="gl-steps__step" data-state={state} aria-current={state === 'current' ? 'step' : undefined}>
            {clickable ? <button type="button" className="gl-steps__body" onClick={() => onStepClick(index)}>{body}</button> : <span className="gl-steps__body">{body}</span>}
          </li>
        );
      })}
    </ol>
  );
}
