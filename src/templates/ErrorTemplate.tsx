import type { ReactNode } from 'react';
import { Heading, Label, Text } from '../atoms';
import { cx } from '../utils/cx';
import './ErrorTemplate.css';

export interface ErrorTemplateProps {
  /** The status code or a short mark, set large. */
  code: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Ways out: back home, retry, contact. */
  actions?: ReactNode;
  /** Technical detail under the actions: a request id, a timestamp. */
  detail?: ReactNode;
  className?: string;
}

/** A full-page status: not found, forbidden, server error, maintenance. */
export function ErrorTemplate({ code, title, description, actions, detail, className }: ErrorTemplateProps) {
  return (
    <main className={cx('gl-error gl-hatch', className)}>
      <div className="gl-error__box">
        <div className="gl-error__code">{code}</div>
        <div className="gl-error__text">
          <Heading level={1} size="xl">{title}</Heading>
          {description != null && <Text tone="muted">{description}</Text>}
        </div>
        {actions != null && <div className="gl-error__actions">{actions}</div>}
        {detail != null && <div className="gl-error__detail"><Label size="xs">{detail}</Label></div>}
      </div>
    </main>
  );
}
