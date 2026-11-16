import { useState, type MouseEvent } from 'react';
import { ArrowUpIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './VirtualKeyboard.css';

export interface VirtualKeyboardProps {
  /** The text typed so far. */
  value?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  /** Called for the Enter key. */
  onEnter?: (text: string) => void;
  /** `numeric` is a phone-style number pad. */
  layout?: 'qwerty' | 'numeric';
  /** Accessible name of the keyboard. */
  'aria-label'?: string;
  /** Show the typed text above the keys. */
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

const QWERTY = ['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm,.'];
const NUMERIC = ['123', '456', '789', '.0-'];

/** An on-screen keyboard for kiosks and touch screens. It edits a string; it does not type into other fields. */
export function VirtualKeyboard({ value, defaultValue = '', onChange, onEnter, layout = 'qwerty', 'aria-label': ariaLabel = 'On-screen keyboard', showValue = true, disabled, className }: VirtualKeyboardProps) {
  const [text, setText] = useControlled(value, defaultValue, onChange);
  const [shift, setShift] = useState(false);
  const rows = layout === 'numeric' ? NUMERIC : QWERTY;
  // Keep focus where it was; the keys only edit the value.
  const keep = (event: MouseEvent) => event.preventDefault();
  const type = (char: string) => {
    setText(text + (shift ? char.toUpperCase() : char));
    if (shift) setShift(false);
  };

  return (
    <div className={cx('gl-virtual-keyboard', `gl-virtual-keyboard--${layout}`, className)}>
      {showValue && <output className="gl-virtual-keyboard__value" aria-label="Typed text">{text}<span className="gl-virtual-keyboard__caret" aria-hidden="true" /></output>}
      <div role="group" aria-label={ariaLabel} className="gl-virtual-keyboard__keys">
        {rows.map((row, index) => (
          <div key={row} className="gl-virtual-keyboard__row">
            {layout === 'qwerty' && index === 3 && (
              <button type="button" className="gl-virtual-keyboard__key gl-virtual-keyboard__key--wide" aria-label="Shift" aria-pressed={shift} disabled={disabled} onMouseDown={keep} onClick={() => setShift(!shift)}><ArrowUpIcon /></button>
            )}
            {row.split('').map((char) => (
              <button key={char} type="button" className="gl-virtual-keyboard__key" disabled={disabled} onMouseDown={keep} onClick={() => type(char)}>{shift ? char.toUpperCase() : char}</button>
            ))}
            {index === 3 && (
              <button type="button" className="gl-virtual-keyboard__key gl-virtual-keyboard__key--wide" aria-label="Backspace" disabled={disabled || text === ''} onMouseDown={keep} onClick={() => setText(Array.from(text).slice(0, -1).join(''))}>⌫</button>
            )}
          </div>
        ))}
        <div className="gl-virtual-keyboard__row">
          {layout === 'qwerty' && <button type="button" className="gl-virtual-keyboard__key gl-virtual-keyboard__key--space" disabled={disabled} onMouseDown={keep} onClick={() => setText(text + ' ')}>Space</button>}
          <button type="button" className="gl-virtual-keyboard__key gl-virtual-keyboard__key--enter" disabled={disabled} onMouseDown={keep} onClick={() => onEnter?.(text)}>Enter</button>
        </div>
      </div>
    </div>
  );
}
