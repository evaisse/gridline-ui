import type { ReactNode } from 'react';
import { Heading, Label, Tag, Text } from '../atoms';
import type { Tone } from '../tokens/tone';
import { cx } from '../utils/cx';
import './IndexCard.css';

export interface IndexCardProps {
  eyebrow: string;
  tag?: string;
  tagTone?: Tone;
  title: string;
  facts?: Array<{ label: string; value: ReactNode }>;
  description?: string;
  listTitle?: string;
  list?: string[];
  className?: string;
}

/** A catalogue entry built to sit in a Grid cell: ruled header, body, ranked list. */
export function IndexCard({ eyebrow, tag, tagTone = 'neutral', title, facts, description, listTitle, list, className }: IndexCardProps) {
  return (
    <article className={cx('gl-index-card', className)}>
      <header className="gl-index-card__head">
        <Label tone="ink">{eyebrow}</Label>
        {tag && <Tag tone={tagTone} dot>{tag}</Tag>}
      </header>
      <div className="gl-index-card__body">
        <Heading level={3}>{title}</Heading>
        {facts && (
          <dl className="gl-index-card__facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt><Label>{fact.label}:</Label></dt>
                <dd><Label tone="ink">{fact.value}</Label></dd>
              </div>
            ))}
          </dl>
        )}
        {description && <Text variant="lead" className="gl-index-card__desc">{description}</Text>}
      </div>
      {list && (
        <footer className="gl-index-card__foot">
          {listTitle && <Label>{listTitle}</Label>}
          <ol className="gl-index-card__list">
            {list.map((entry, i) => (
              <li key={entry}><Label size="xs">{i + 1}</Label>{entry}</li>
            ))}
          </ol>
        </footer>
      )}
    </article>
  );
}
