import type { ChangeEvent } from 'react';
import { Input, type InputProps } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './MaskedInput.css';

export interface MaskedInputProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'type'> {
  /** The pattern: `9` is a digit, `a` a letter, `*` a letter or digit, anything else is fixed text. */
  mask: string;
  /** The masked text, fixed characters included. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called once every slot of the mask is filled. */
  onComplete?: (value: string) => void;
}

const SLOTS: Record<string, RegExp> = { 9: /\d/, a: /[a-z]/i, '*': /[a-z0-9]/i };

/** Applies a mask to free text: invalid characters are dropped and fixed characters are inserted. */
export function applyMask(text: string, mask: string): string {
  let out = '';
  let at = 0;
  for (const ch of text) {
    while (at < mask.length) {
      const slot = SLOTS[mask[at]];
      if (slot) {
        if (slot.test(ch)) { out += ch; at += 1; }
        break;
      }
      out += mask[at];
      at += 1;
      if (ch === mask[at - 1]) break;
    }
    if (at >= mask.length) break;
  }
  return out;
}

const isComplete = (text: string, mask: string) => text.length === mask.length;

/** A text field that constrains typing and pasting to a pattern such as a phone number, a date or a card number. */
export function MaskedInput({ mask, value, defaultValue = '', onChange, onComplete, placeholder, className, inputMode, ...rest }: MaskedInputProps) {
  const [text, setText] = useControlled(value === undefined ? undefined : applyMask(value, mask), applyMask(defaultValue, mask), onChange);
  const hasDigitsOnly = [...mask].every((c) => c === '9' || !SLOTS[c]);

  const handle = (event: ChangeEvent<HTMLInputElement>) => {
    const next = applyMask(event.target.value, mask);
    setText(next);
    if (isComplete(next, mask)) onComplete?.(next);
  };

  return (
    <Input
      {...rest} className={cx('gl-masked-input', className)} value={text} onChange={handle} inputMode={inputMode ?? (hasDigitsOnly ? 'numeric' : 'text')} maxLength={mask.length}
      placeholder={placeholder ?? [...mask].map((c) => (SLOTS[c] ? '_' : c)).join('')} autoComplete="off" spellCheck={false}
    />
  );
}
