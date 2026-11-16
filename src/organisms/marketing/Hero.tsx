import type { ReactNode } from 'react';
import { Heading, Text } from '../../atoms';
import { cx } from '../../utils/cx';
import './Hero.css';

export interface HeroProps {
  /** A tag or label above the title. */
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Buttons under the lead. */
  actions?: ReactNode;
  /** A short line under the buttons. */
  note?: ReactNode;
  /** A figure beside the copy: chart, code, screenshot. */
  media?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

/** The opening block of a marketing page: one claim, one or two actions, an optional figure. */
export function Hero({ eyebrow, title, lead, actions, note, media, align = 'start', className }: HeroProps) {
  return (
    <section className={cx('gl-hero', `gl-hero--${align}`, media != null && 'gl-hero--split', className)}>
      <div className="gl-hero__copy">
        {eyebrow}
        <Heading level={1} size="2xl">{title}</Heading>
        {lead != null && <Text variant="lead">{lead}</Text>}
        {actions != null && <div className="gl-hero__actions">{actions}</div>}
        {note != null && <div className="gl-hero__note">{note}</div>}
      </div>
      {media != null && <div className="gl-hero__media">{media}</div>}
    </section>
  );
}
