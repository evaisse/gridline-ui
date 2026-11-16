import { useState, type InputHTMLAttributes } from 'react';
import { EyeIcon, EyeOffIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './PasswordInput.css';

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

/** A password field with a cell that reveals what was typed. */
export function PasswordInput({ className, ...rest }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <span className={cx('gl-password-input', className)}>
      <input type={visible ? 'text' : 'password'} className="gl-password-input__control" autoComplete="current-password" {...rest} />
      <button type="button" aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} onClick={() => setVisible(!visible)}>
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </span>
  );
}
