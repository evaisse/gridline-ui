import { useId, type ReactNode } from 'react';
import { Checkbox, Label } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './CheckboxGroup.css';

export interface CheckboxGroupOption {
  value: string;
  label: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options: CheckboxGroupOption[];
  /** The checked option values. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** The group's visible name, rendered as a fieldset legend. */
  legend: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  disabled?: boolean;
  /** Shown under the options, for example a validation message. */
  hint?: ReactNode;
  name?: string;
  className?: string;
}

/** Several checkboxes under one legend, with a shared list of checked values. */
export function CheckboxGroup({ options, value, defaultValue = [], onChange, legend, orientation = 'vertical', disabled, hint, name, className }: CheckboxGroupProps) {
  const [checked, setChecked] = useControlled(value, defaultValue, onChange);
  const base = useId();
  const toggle = (optionValue: string, on: boolean) => setChecked(on ? [...checked, optionValue] : checked.filter((entry) => entry !== optionValue));

  return (
    <fieldset className={cx('gl-checkbox-group', className)} disabled={disabled}>
      <legend className="gl-checkbox-group__legend"><Label tone="ink">{legend}</Label></legend>
      <div className={cx('gl-checkbox-group__items', `gl-checkbox-group__items--${orientation}`)}>
        {options.map((option) => {
          const id = `${base}-${option.value}`;
          return (
            <div key={option.value} className="gl-checkbox-group__item">
              <Checkbox id={id} name={name} value={option.value} checked={checked.includes(option.value)} disabled={disabled || option.disabled} aria-describedby={option.description ? `${id}-d` : undefined} onCheckedChange={(state) => toggle(option.value, state === true)} />
              <div className="gl-checkbox-group__text">
                <label htmlFor={id} className="gl-checkbox-group__label">{option.label}</label>
                {option.description && <span id={`${id}-d`} className="gl-checkbox-group__description">{option.description}</span>}
              </div>
            </div>
          );
        })}
      </div>
      {hint && <p className="gl-checkbox-group__hint">{hint}</p>}
    </fieldset>
  );
}
