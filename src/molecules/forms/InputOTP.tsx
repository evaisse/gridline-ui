import { OTPInput } from 'input-otp';
import { Fragment } from 'react';
import { cx } from '../../utils/cx';
import './InputOTP.css';

export interface InputOTPProps {
  maxLength: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  /** A regular expression source restricting input, e.g. "^[0-9]+$". */
  pattern?: string;
  disabled?: boolean;
  /** Insert a dash after this many cells. */
  groupSize?: number;
  'aria-label'?: string;
  className?: string;
}

/** A one-time code entered into shared-border cells. */
export function InputOTP({ groupSize, className, ...rest }: InputOTPProps) {
  return (
    <OTPInput
      containerClassName={cx('gl-otp', className)}
      {...rest}
      render={({ slots }) => (
        <>
          {slots.map((slot, i) => (
            <Fragment key={i}>
              {groupSize && i > 0 && i % groupSize === 0 && <span className="gl-otp__dash" aria-hidden="true" />}
              <span className="gl-otp__cell" data-active={slot.isActive || undefined}>
                {slot.char}
                {slot.hasFakeCaret && <span className="gl-otp__caret" />}
              </span>
            </Fragment>
          ))}
        </>
      )}
    />
  );
}
