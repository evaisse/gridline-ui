import type { InputHTMLAttributes } from 'react';
import { MinusIcon, PlusIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import { useControlled } from '../utils/useControlled';
import './NumberInput.css';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** A number field with a ruled decrement and increment cell on either side. */
export function NumberInput({ value, defaultValue = 0, onChange, min = -Infinity, max = Infinity, step = 1, className, disabled, ...rest }: NumberInputProps) {
  const [current, setCurrent] = useControlled(value, defaultValue, onChange);
  const set = (next: number) => setCurrent(clamp(next, min, max));

  return (
    <span className={cx('gl-number-input', className)}>
      <button type="button" aria-label="Decrease" disabled={disabled || current <= min} onClick={() => set(current - step)}><MinusIcon /></button>
      <input
        type="number" inputMode="decimal" className="gl-number-input__control" value={Number.isFinite(current) ? current : ''} min={Number.isFinite(min) ? min : undefined}
        max={Number.isFinite(max) ? max : undefined} step={step} disabled={disabled} onChange={(event) => set(event.target.value === '' ? 0 : Number(event.target.value))} {...rest}
      />
      <button type="button" aria-label="Increase" disabled={disabled || current >= max} onClick={() => set(current + step)}><PlusIcon /></button>
    </span>
  );
}
