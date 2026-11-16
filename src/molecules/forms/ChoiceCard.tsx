import { useId, type ReactNode } from 'react';
import { Checkbox, Radio, RadioGroup } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './ChoiceCard.css';

export interface ChoiceCardOption {
  value: string;
  title: ReactNode;
  description?: ReactNode;
  /** Small trailing text such as a price or a size. */
  meta?: ReactNode;
  disabled?: boolean;
}

interface ChoiceCardBase {
  options: ChoiceCardOption[];
  /** Accessible name of the group. */
  'aria-label': string;
  /** Cards per row at the widest; the grid collapses to one column on narrow screens. */
  columns?: 1 | 2 | 3;
  disabled?: boolean;
  className?: string;
}

export interface ChoiceCardSingleProps extends ChoiceCardBase {
  type?: 'radio';
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export interface ChoiceCardMultipleProps extends ChoiceCardBase {
  type: 'checkbox';
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export type ChoiceCardProps = ChoiceCardSingleProps | ChoiceCardMultipleProps;

function Body({ option }: { option: ChoiceCardOption }) {
  return (
    <span className="gl-choice-card__body">
      <span className="gl-choice-card__title">{option.title}</span>
      {option.description && <span className="gl-choice-card__description">{option.description}</span>}
      {option.meta && <span className="gl-choice-card__meta">{option.meta}</span>}
    </span>
  );
}

function Single({ options, value, defaultValue = '', onChange, columns = 2, disabled, className, 'aria-label': ariaLabel }: ChoiceCardSingleProps) {
  const [current, setCurrent] = useControlled(value, defaultValue, onChange);
  const base = useId();
  return (
    <RadioGroup value={current} onValueChange={setCurrent} disabled={disabled} aria-label={ariaLabel} className={cx('gl-choice-card', `gl-choice-card--cols-${columns}`, className)}>
      {options.map((option) => (
        <label key={option.value} htmlFor={`${base}-${option.value}`} className={cx('gl-choice-card__card', current === option.value && 'gl-choice-card__card--checked', (disabled || option.disabled) && 'gl-choice-card__card--disabled')}>
          <Radio id={`${base}-${option.value}`} value={option.value} disabled={disabled || option.disabled} />
          <Body option={option} />
        </label>
      ))}
    </RadioGroup>
  );
}

function Multiple({ options, value, defaultValue = [], onChange, columns = 2, disabled, className, 'aria-label': ariaLabel }: ChoiceCardMultipleProps) {
  const [current, setCurrent] = useControlled(value, defaultValue, onChange);
  const base = useId();
  return (
    <div role="group" aria-label={ariaLabel} className={cx('gl-choice-card', `gl-choice-card--cols-${columns}`, className)}>
      {options.map((option) => {
        const on = current.includes(option.value);
        return (
          <label key={option.value} htmlFor={`${base}-${option.value}`} className={cx('gl-choice-card__card', on && 'gl-choice-card__card--checked', (disabled || option.disabled) && 'gl-choice-card__card--disabled')}>
            <Checkbox id={`${base}-${option.value}`} checked={on} disabled={disabled || option.disabled} onCheckedChange={(state) => setCurrent(state === true ? [...current, option.value] : current.filter((entry) => entry !== option.value))} />
            <Body option={option} />
          </label>
        );
      })}
    </div>
  );
}

/** A checkbox (`type="checkbox"`, several values) or a radio (default, one value) drawn as a whole card. The chosen card inverts. */
export function ChoiceCard(props: ChoiceCardProps) {
  return props.type === 'checkbox' ? <Multiple {...props} /> : <Single {...props} />;
}
