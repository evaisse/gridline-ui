import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { Label } from '../../atoms';
import { cx } from '../../utils/cx';
import './Field.css';

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  /** `horizontal` puts a checkbox or switch before its label. */
  orientation?: 'vertical' | 'horizontal';
  /** Receives the ids to wire onto the control. */
  children: (ids: { id: string; 'aria-describedby'?: string; 'aria-invalid'?: true }) => ReactNode;
}

/** Label, control, help text and error, wired for assistive technology. */
export function Field({ label, description, error, orientation = 'vertical', className, children, ...rest }: FieldProps) {
  const id = useId();
  const describedBy = [description && `${id}-desc`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx('gl-field', `gl-field--${orientation}`, className)} {...rest}>
      <label htmlFor={id} className="gl-field__label"><Label tone="ink">{label}</Label></label>
      <div className="gl-field__control">{children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}</div>
      {description != null && <p id={`${id}-desc`} className="gl-field__desc">{description}</p>}
      {error != null && <p id={`${id}-err`} role="alert" className="gl-field__error">{error}</p>}
    </div>
  );
}

export interface FieldSetProps extends HTMLAttributes<HTMLFieldSetElement> {
  legend: ReactNode;
}

/** Groups related fields under a ruled legend. */
export function FieldSet({ legend, className, children, ...rest }: FieldSetProps) {
  return (
    <fieldset className={cx('gl-fieldset', className)} {...rest}>
      <legend><Label>{legend}</Label></legend>
      {children}
    </fieldset>
  );
}
