import { useState, type FormEvent, type ReactNode } from 'react';
import { Button, Input, NativeSelect, Switch, Textarea } from '../../atoms';
import { Field, NumberInput } from '../../molecules';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './DataForm.css';

export type DataFormValue = string | number | boolean;
export type DataFormValues = Record<string, DataFormValue>;

export interface DataFormField {
  /** Key of the value in the record. */
  name: string;
  label: ReactNode;
  type: 'text' | 'number' | 'select' | 'switch' | 'date' | 'textarea';
  description?: ReactNode;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Choices for `select`. */
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  /** Number of grid columns the field spans, 1 or 2. */
  span?: 1 | 2;
}

export interface DataFormProps {
  /** Describes the fields; the form renders one control per entry, in order. */
  fields: DataFormField[];
  value?: DataFormValues;
  defaultValue?: DataFormValues;
  onChange?: (values: DataFormValues) => void;
  /** Receives the values once every required field is filled. */
  onSubmit?: (values: DataFormValues) => void;
  submitLabel?: ReactNode;
  /** Shows a reset button that restores the initial values. */
  resettable?: boolean;
  /** Grid columns on wide screens. */
  columns?: 1 | 2;
  className?: string;
}

const isEmpty = (field: DataFormField, value: DataFormValue | undefined) => field.type !== 'switch' && (value === undefined || value === '');

/** A form generated from a list of field descriptions; it returns the record on submit. */
export function DataForm({ fields, value, defaultValue = {}, onChange, onSubmit, submitLabel = 'Save', resettable = false, columns = 1, className }: DataFormProps) {
  const [values, setValues] = useControlled<DataFormValues>(value, defaultValue, onChange);
  const [initial] = useState(defaultValue);
  const [attempted, setAttempted] = useState(false);
  const set = (name: string, next: DataFormValue) => setValues({ ...values, [name]: next });
  const missing = (field: DataFormField) => attempted && field.required && isEmpty(field, values[field.name]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    if (fields.some((field) => field.required && isEmpty(field, values[field.name]))) return;
    onSubmit?.(values);
  };

  const control = (field: DataFormField, ids: Record<string, unknown>) => {
    const current = values[field.name];
    const common = { ...ids, name: field.name, disabled: field.disabled, required: field.required };
    switch (field.type) {
      case 'number':
        return <NumberInput {...common} min={field.min} max={field.max} step={field.step} value={typeof current === 'number' ? current : undefined} defaultValue={0} onChange={(next) => set(field.name, next)} />;
      case 'select':
        return (
          <NativeSelect {...common} value={String(current ?? '')} onChange={(event) => set(field.name, event.target.value)}>
            <option value="">{field.placeholder ?? 'Select'}</option>
            {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </NativeSelect>
        );
      case 'switch':
        return <Switch id={ids.id as string} name={field.name} disabled={field.disabled} checked={current === true} onCheckedChange={(next) => set(field.name, next)} aria-describedby={ids['aria-describedby'] as string | undefined} />;
      case 'textarea':
        return <Textarea {...common} rows={4} placeholder={field.placeholder} value={String(current ?? '')} onChange={(event) => set(field.name, event.target.value)} />;
      default:
        return <Input {...common} type={field.type} placeholder={field.placeholder} value={String(current ?? '')} onChange={(event) => set(field.name, event.target.value)} />;
    }
  };

  return (
    <form className={cx('gl-data-form', `gl-data-form--cols-${columns}`, className)} onSubmit={submit} noValidate>
      <div className="gl-data-form__fields">
        {fields.map((field) => (
          <Field
            key={field.name}
            className={cx('gl-data-form__field', field.span === 2 && 'gl-data-form__field--wide')}
            label={field.label}
            description={field.description}
            error={missing(field) ? 'This field is required' : undefined}
            orientation={field.type === 'switch' ? 'horizontal' : 'vertical'}
          >
            {(ids) => control(field, ids)}
          </Field>
        ))}
      </div>
      <div className="gl-data-form__actions">
        {resettable && <Button type="button" onClick={() => { setValues(initial); setAttempted(false); }}>Reset</Button>}
        <Button type="submit" variant="solid">{submitLabel}</Button>
      </div>
    </form>
  );
}
