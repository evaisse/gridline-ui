import { Portal } from 'radix-ui';
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { Button, Popover, PopoverAnchor, PopoverContent } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Tour.css';

export interface TourStep {
  id: string;
  /** A CSS selector or a ref to the element to point at. Omit to centre the card. */
  target?: string | RefObject<HTMLElement | null>;
  title: ReactNode;
  content?: ReactNode;
}

export interface TourProps {
  steps: TourStep[];
  open: boolean;
  /** Called with false when the tour is skipped, finished or dismissed. */
  onOpenChange?: (open: boolean) => void;
  /** The current step index. */
  step?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  /** Called after the last step's finish button. */
  onFinish?: () => void;
  className?: string;
}

interface Box { top: number; left: number; width: number; height: number }

function resolve(target: TourStep['target']): HTMLElement | null {
  if (!target) return null;
  return typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target.current;
}

/** Steps that point at parts of the interface in turn, controlled by `open` and `step`. */
export function Tour({ steps, open, onOpenChange, step, defaultStep = 0, onStepChange, onFinish, className }: TourProps) {
  const [index, setIndex] = useControlled(step, defaultStep, onStepChange);
  const [box, setBox] = useState<Box | null>(null);
  const current = steps[Math.min(index, steps.length - 1)];

  const measure = useCallback(() => {
    const el = resolve(current?.target);
    if (!el) { setBox(null); return; }
    const r = el.getBoundingClientRect();
    setBox({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [current]);

  useEffect(() => {
    if (!open) return undefined;
    resolve(current?.target)?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    const frame = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true); };
  }, [open, current, measure]);

  if (!open || !current) return null;
  const last = index >= steps.length - 1;
  const anchorStyle = box ?? { top: '50%', left: '50%', width: 0, height: 0 };

  return (
    <Portal.Root>
      <Popover open onOpenChange={(next) => { if (!next) onOpenChange?.(false); }}>
        <PopoverAnchor asChild>
          <div className={cx('gl-tour__target', box == null && 'gl-tour__target--none')} style={anchorStyle} aria-hidden="true" />
        </PopoverAnchor>
        <PopoverContent
          side="bottom" role="dialog" aria-label={`Tour step ${index + 1} of ${steps.length}`} className={cx('gl-tour', className)}
          onOpenAutoFocus={(event) => event.preventDefault()} onInteractOutside={(event) => event.preventDefault()}
        >
          <div className="gl-tour__count">Step {index + 1} of {steps.length}</div>
          <p className="gl-tour__title">{current.title}</p>
          {current.content != null && <div className="gl-tour__content">{current.content}</div>}
          <div className="gl-tour__actions">
            <Button size="sm" variant="ghost" onClick={() => onOpenChange?.(false)}>Skip</Button>
            <span className="gl-tour__spacer" />
            {index > 0 && <Button size="sm" onClick={() => setIndex(index - 1)}>Back</Button>}
            <Button size="sm" variant="solid" onClick={() => { if (last) { onFinish?.(); onOpenChange?.(false); } else setIndex(index + 1); }}>{last ? 'Finish' : 'Next'}</Button>
          </div>
        </PopoverContent>
      </Popover>
    </Portal.Root>
  );
}
