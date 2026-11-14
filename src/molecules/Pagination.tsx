import { Label } from '../atoms';
import { ChevronLeftIcon, ChevronRightIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './Pagination.css';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  /** How many page numbers to show around the current one. */
  siblings?: number;
  className?: string;
}

function range(page: number, count: number, siblings: number): Array<number | 'gap'> {
  const pages = new Set([1, count]);
  for (let p = page - siblings; p <= page + siblings; p += 1) if (p >= 1 && p <= count) pages.add(p);
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ['gap' as const, p] : [p]));
}

/** Page cells with shared borders. The current page inverts. */
export function Pagination({ page, pageCount, onPageChange, siblings = 1, className }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cx('gl-pagination', className)}>
      <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}><ChevronLeftIcon /></button>
      {range(page, pageCount, siblings).map((entry, i) =>
        entry === 'gap' ? (
          <span key={`gap-${i}`} className="gl-pagination__gap">…</span>
        ) : (
          <button key={entry} type="button" aria-current={entry === page ? 'page' : undefined} aria-label={`Page ${entry}`} onClick={() => onPageChange?.(entry)}>
            <Label tone="inherit">{entry}</Label>
          </button>
        ),
      )}
      <button type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => onPageChange?.(page + 1)}><ChevronRightIcon /></button>
    </nav>
  );
}
