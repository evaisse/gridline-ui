import { useState } from 'react';
import { IconButton } from '../../atoms';
import { ChevronLeftIcon, ChevronRightIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './MonthPicker.css';

export type MonthPickerGranularity = 'month' | 'quarter' | 'year';

export interface MonthPickerProps {
  /** The picked period, as the first day of that month, quarter or year. */
  value?: Date;
  defaultValue?: Date;
  onChange?: (value: Date) => void;
  /** What one cell stands for. */
  granularity?: MonthPickerGranularity;
  /** Earliest selectable day; periods that end before it are disabled. */
  minDate?: Date;
  /** Latest selectable day; periods that start after it are disabled. */
  maxDate?: Date;
  /** BCP 47 locale used for month names. */
  locale?: string;
  /** Accessible name of the group. */
  'aria-label'?: string;
  className?: string;
}

const PAGE = 12;

/** An inline grid for picking a month, a quarter or a year, with ruled year or decade navigation. */
export function MonthPicker({ value, defaultValue, onChange, granularity = 'month', minDate, maxDate, locale = 'en', 'aria-label': ariaLabel = 'Period', className }: MonthPickerProps) {
  const [current, setCurrent] = useControlled<Date | undefined>(value, defaultValue, onChange as ((next: Date | undefined) => void) | undefined);
  const [anchor, setAnchor] = useState(() => (current ?? new Date()).getFullYear());
  const isYear = granularity === 'year';
  const pageStart = Math.floor(anchor / PAGE) * PAGE;
  const shift = isYear ? PAGE : 1;
  const names = new Intl.DateTimeFormat(locale, { month: 'short' });

  const cells = isYear
    ? Array.from({ length: PAGE }, (_, i) => ({ label: String(pageStart + i), start: new Date(pageStart + i, 0, 1), end: new Date(pageStart + i + 1, 0, 1) }))
    : granularity === 'quarter'
      ? Array.from({ length: 4 }, (_, q) => ({ label: `Q${q + 1}`, start: new Date(anchor, q * 3, 1), end: new Date(anchor, q * 3 + 3, 1) }))
      : Array.from({ length: 12 }, (_, m) => ({ label: names.format(new Date(anchor, m, 1)), start: new Date(anchor, m, 1), end: new Date(anchor, m + 1, 1) }));

  return (
    <div role="group" aria-label={ariaLabel} className={cx('gl-month-picker', `gl-month-picker--${granularity}`, className)}>
      <div className="gl-month-picker__head">
        <span className="gl-month-picker__title" aria-live="polite">{isYear ? `${pageStart} – ${pageStart + PAGE - 1}` : anchor}</span>
        <IconButton variant="ghost" size="sm" label={isYear ? 'Previous years' : 'Previous year'} icon={<ChevronLeftIcon />} onClick={() => setAnchor(anchor - shift)} />
        <IconButton variant="ghost" size="sm" label={isYear ? 'Next years' : 'Next year'} icon={<ChevronRightIcon />} onClick={() => setAnchor(anchor + shift)} />
      </div>
      <div className="gl-month-picker__grid">
        {cells.map((cell) => {
          const selected = !!current && current >= cell.start && current < cell.end;
          const off = (!!minDate && cell.end <= minDate) || (!!maxDate && cell.start > maxDate);
          return (
            <button key={cell.label} type="button" className="gl-month-picker__cell" aria-pressed={selected} disabled={off} onClick={() => setCurrent(cell.start)}>
              {cell.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
