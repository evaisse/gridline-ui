import type { HTMLAttributes, ReactNode } from 'react';
import { Heading, Text } from '../../atoms';
import { AlertIcon, CheckIcon, InfoIcon, LockIcon, SearchIcon, XIcon } from '../../tokens/icons';
import type { Tone } from '../../tokens/tone';
import { cx } from '../../utils/cx';
import './Result.css';

export type ResultStatus = 'success' | 'error' | 'warning' | 'info' | 'forbidden' | 'not-found';

export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: ResultStatus;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons shown under the message. */
  actions?: ReactNode;
  /** Extra content, such as a list of errors, shown in a ruled box. */
  children?: ReactNode;
}

const preset: Record<ResultStatus, { tone: Tone; icon: ReactNode; role: 'status' | 'alert' }> = {
  success: { tone: 'pos', icon: <CheckIcon width={20} height={20} />, role: 'status' },
  error: { tone: 'neg', icon: <XIcon width={20} height={20} />, role: 'alert' },
  warning: { tone: 'warn', icon: <AlertIcon width={20} height={20} />, role: 'alert' },
  info: { tone: 'info', icon: <InfoIcon width={20} height={20} />, role: 'status' },
  forbidden: { tone: 'neg', icon: <LockIcon width={20} height={20} />, role: 'alert' },
  'not-found': { tone: 'neutral', icon: <SearchIcon width={20} height={20} />, role: 'status' },
};

/** The outcome of an operation: success, failure, forbidden and so on. */
export function Result({ status = 'info', title, description, actions, children, className, ...rest }: ResultProps) {
  const { tone, icon, role } = preset[status];
  return (
    <div role={role} className={cx('gl-result', `gl-result--${status}`, `gl-tone--${tone}`, className)} {...rest}>
      <span className="gl-result__icon">{icon}</span>
      <Heading level={2} size="lg">{title}</Heading>
      {description != null && <Text variant="small" tone="muted" className="gl-result__description">{description}</Text>}
      {children != null && <div className="gl-result__extra">{children}</div>}
      {actions != null && <div className="gl-result__actions">{actions}</div>}
    </div>
  );
}
