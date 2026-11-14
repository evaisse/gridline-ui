import type { HTMLAttributes, ReactNode } from 'react';
import { Label } from '../atoms';
import type { Tone } from '../tokens/tone';
import { cx } from '../utils/cx';
import './Alert.css';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  /** Buttons shown on the right. */
  action?: ReactNode;
}

/** A callout. The tone shows as a left rule and a faint wash, never a filled box. */
export function Alert({ title, tone = 'neutral', icon, action, className, children, ...rest }: AlertProps) {
  return (
    <div role="alert" className={cx('gl-alert', `gl-tone--${tone}`, className)} {...rest}>
      {icon != null && <span className="gl-alert__icon">{icon}</span>}
      <div className="gl-alert__body">
        <Label tone="ink">{title}</Label>
        {children != null && <div className="gl-alert__text">{children}</div>}
      </div>
      {action != null && <div className="gl-alert__action">{action}</div>}
    </div>
  );
}
