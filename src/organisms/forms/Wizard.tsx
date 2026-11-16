import type { ReactNode } from 'react';
import { Button } from '../../atoms';
import { Steps, type Step } from '../../molecules';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Wizard.css';

export interface WizardStep extends Step {
  /** The content shown while this step is current. */
  content: ReactNode;
  /** When `false`, Next (or Finish) stays disabled. */
  valid?: boolean;
}

export interface WizardProps {
  steps: WizardStep[];
  /** Index of the current step. */
  current?: number;
  defaultCurrent?: number;
  onCurrentChange?: (index: number) => void;
  /** Called when Finish is pressed on the last step. */
  onFinish?: () => void;
  finishLabel?: ReactNode;
  className?: string;
}

/** A form split into steps: a step header, the current step's content, and Back / Next / Finish. */
export function Wizard({ steps, current, defaultCurrent = 0, onCurrentChange, onFinish, finishLabel = 'Finish', className }: WizardProps) {
  const [index, setIndex] = useControlled(current, defaultCurrent, onCurrentChange);
  const active = Math.min(Math.max(index, 0), steps.length - 1);
  const step = steps[active];
  const last = active === steps.length - 1;
  if (!step) return null;

  return (
    <section className={cx('gl-wizard', className)} aria-label="Wizard">
      <div className="gl-wizard__head">
        <Steps steps={steps.map(({ id, label, description }) => ({ id, label, description }))} current={active} onStepClick={setIndex} />
      </div>
      <div className="gl-wizard__body" role="group" aria-live="polite" aria-label={`Step ${active + 1} of ${steps.length}`}>{step.content}</div>
      <div className="gl-wizard__foot">
        <Button disabled={active === 0} onClick={() => setIndex(active - 1)}>Back</Button>
        <span className="gl-wizard__count">{active + 1} / {steps.length}</span>
        {last
          ? <Button variant="solid" disabled={step.valid === false} onClick={onFinish}>{finishLabel}</Button>
          : <Button variant="solid" disabled={step.valid === false} onClick={() => setIndex(active + 1)}>Next</Button>}
      </div>
    </section>
  );
}
