import type { HTMLAttributes, ReactNode } from 'react';
import { Heading, Text } from '../atoms';
import { cx } from '../utils/cx';
import './Empty.css';

export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** One or two buttons. */
  action?: ReactNode;
}

/** An empty state on a hatched field. */
export function Empty({ icon, title, description, action, className, ...rest }: EmptyProps) {
  return (
    <div className={cx('gl-empty gl-hatch', className)} {...rest}>
      <div className="gl-empty__box">
        {icon != null && <span className="gl-empty__icon">{icon}</span>}
        <Heading level={3} size="md">{title}</Heading>
        {description != null && <Text variant="small" tone="muted">{description}</Text>}
        {action != null && <div className="gl-empty__action">{action}</div>}
      </div>
    </div>
  );
}
