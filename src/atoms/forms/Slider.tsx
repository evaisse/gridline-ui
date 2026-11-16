import { Slider as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../../utils/cx';
import './Slider.css';

export interface SliderProps extends ComponentProps<typeof Base.Root> {
  /** Accessible names for each thumb. */
  thumbLabels?: string[];
}

/** A slider on a graduated track. Pass two values for a range. */
export function Slider({ className, thumbLabels = [], ...rest }: SliderProps) {
  const count = (rest.value ?? rest.defaultValue ?? [0]).length;
  return (
    <Base.Root className={cx('gl-slider', className)} {...rest}>
      <Base.Track className="gl-slider__track">
        <Base.Range className="gl-slider__range" />
      </Base.Track>
      {Array.from({ length: count }, (_, i) => (
        <Base.Thumb key={i} className="gl-slider__thumb" aria-label={thumbLabels[i] ?? 'Value'} />
      ))}
    </Base.Root>
  );
}
