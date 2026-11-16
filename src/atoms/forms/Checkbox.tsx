import { Checkbox as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { CheckIcon, MinusIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './Checkbox.css';

export type CheckboxProps = ComponentProps<typeof Base.Root>;

export function Checkbox({ className, ...rest }: CheckboxProps) {
  return (
    <Base.Root className={cx('gl-checkbox', className)} {...rest}>
      <Base.Indicator className="gl-checkbox__mark">
        {rest.checked === 'indeterminate' ? <MinusIcon width={12} height={12} /> : <CheckIcon width={12} height={12} />}
      </Base.Indicator>
    </Base.Root>
  );
}
