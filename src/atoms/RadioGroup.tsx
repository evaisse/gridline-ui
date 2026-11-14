import { RadioGroup as Base } from 'radix-ui';
import type { ComponentProps } from 'react';
import { cx } from '../utils/cx';
import './RadioGroup.css';

export function RadioGroup({ className, ...rest }: ComponentProps<typeof Base.Root>) {
  return <Base.Root className={cx('gl-radio-group', className)} {...rest} />;
}

export function Radio({ className, ...rest }: ComponentProps<typeof Base.Item>) {
  return (
    <Base.Item className={cx('gl-radio', className)} {...rest}>
      <Base.Indicator className="gl-radio__mark" />
    </Base.Item>
  );
}
