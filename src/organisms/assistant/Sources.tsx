import type { ReactNode } from 'react';
import { Label } from '../../atoms';
import { FileIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './Sources.css';

export interface Source {
  id: string;
  title: ReactNode;
  /** Where it lives: a path, domain or collection. */
  origin?: ReactNode;
  /** The retrieved passage. */
  excerpt?: ReactNode;
  href?: string;
}

export interface SourcesProps {
  sources: Source[];
  /** Heading above the list. */
  title?: ReactNode;
  /** Citation numbers (1-based) to emphasise, e.g. the ones the visible answer uses. */
  active?: number[];
  className?: string;
}

export interface CitationProps {
  /** 1-based number of the source. */
  index: number;
  /** Id of the list item it points to; defaults to the `Sources` item id pattern. */
  href?: string;
  className?: string;
}

/** A small numbered chip to place inline in an answer, linking to the matching source. */
export function Citation({ index, href, className }: CitationProps) {
  return <a className={cx('gl-citation', className)} href={href ?? `#gl-source-${index}`} aria-label={`Source ${index}`}>{index}</a>;
}

/** The documents an answer drew on: numbered rows that match the inline citation chips. */
export function Sources({ sources, title = 'Sources', active, className }: SourcesProps) {
  if (sources.length === 0) return null;
  return (
    <section className={cx('gl-sources', className)} aria-label="Sources">
      <header className="gl-sources__head"><Label tone="ink">{title}</Label><Label>{sources.length}</Label></header>
      <ol className="gl-sources__list">
        {sources.map((source, i) => {
          const number = i + 1;
          const body = (
            <>
              <span className="gl-citation gl-sources__num" data-active={active?.includes(number) || undefined} aria-hidden="true">{number}</span>
              <span className="gl-sources__text">
                <span className="gl-sources__title"><FileIcon width={12} height={12} aria-hidden="true" />{source.title}</span>
                {source.origin != null && <Label size="xs">{source.origin}</Label>}
                {source.excerpt != null && <span className="gl-sources__excerpt">{source.excerpt}</span>}
              </span>
            </>
          );
          return (
            <li key={source.id} id={`gl-source-${number}`} className="gl-sources__item">
              {source.href ? <a className="gl-sources__link" href={source.href}>{body}</a> : <div className="gl-sources__link">{body}</div>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
