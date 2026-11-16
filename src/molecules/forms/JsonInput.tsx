import { useId, useState } from 'react';
import { Button, Textarea } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './JsonInput.css';

export interface JsonInputProps {
  /** The JSON text. */
  value?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  /** Called whenever validity changes, with the parser's message when invalid. */
  onValidate?: (valid: boolean, error?: string) => void;
  /** Accessible name of the text area. */
  'aria-label'?: string;
  placeholder?: string;
  /** Spaces used by the Format button. */
  indent?: number;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

function check(text: string): string | undefined {
  if (text.trim() === '') return undefined;
  try {
    JSON.parse(text);
    return undefined;
  } catch (error) {
    return error instanceof Error ? error.message : 'Invalid JSON';
  }
}

/** A text area that validates JSON as you type, reports the parser error, and formats on demand. */
export function JsonInput({ value, defaultValue = '', onChange, onValidate, 'aria-label': ariaLabel = 'JSON', placeholder, indent = 2, rows = 8, disabled, className }: JsonInputProps) {
  const [text, setText] = useControlled(value, defaultValue, onChange);
  const errorId = useId();
  const [touched, setTouched] = useState(text !== '');
  const error = check(text);
  const empty = text.trim() === '';

  const update = (next: string) => {
    setText(next);
    const nextError = check(next);
    if (nextError !== error) onValidate?.(nextError === undefined, nextError);
  };

  return (
    <div className={cx('gl-json-input', touched && error && 'gl-json-input--invalid', className)}>
      <Textarea
        className="gl-json-input__control" aria-label={ariaLabel} aria-invalid={touched && error ? true : undefined} aria-describedby={touched && error ? errorId : undefined}
        rows={rows} spellCheck={false} placeholder={placeholder} disabled={disabled} value={text}
        onChange={(event) => update(event.target.value)} onBlur={() => setTouched(true)}
      />
      <div className="gl-json-input__foot">
        <span id={errorId} role={touched && error ? 'alert' : undefined} className="gl-json-input__status">
          {empty ? 'Empty' : error ? (touched ? error : 'Checking…') : 'Valid JSON'}
        </span>
        <Button size="sm" variant="ghost" className="gl-json-input__format" disabled={disabled || empty || !!error} onClick={() => update(JSON.stringify(JSON.parse(text), null, indent))}>Format</Button>
      </div>
    </div>
  );
}
