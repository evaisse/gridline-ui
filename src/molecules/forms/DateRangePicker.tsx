import { useState } from 'react';
import type { DateRange, Matcher } from 'react-day-picker';
import { Button, Popover, PopoverContent, PopoverTrigger } from '../../atoms';
import { CalendarIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import { Calendar } from './Calendar';
import './DateRangePicker.css';

export type DateRangeValue = DateRange;

export interface DateRangePickerProps {
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
  /** Earliest selectable day. */
  minDate?: Date;
  /** Latest selectable day. */
  maxDate?: Date;
  /** Months shown side by side in the panel. */
  numberOfMonths?: number;
  placeholder?: string;
  /** BCP 47 locale used to format the dates. */
  locale?: string;
  disabled?: boolean;
  /** Accessible name of the trigger. */
  'aria-label'?: string;
  className?: string;
}

const EMPTY: DateRangeValue = { from: undefined, to: undefined };

/** A field that opens a calendar to pick a start and an end date. */
export function DateRangePicker({ value, defaultValue = EMPTY, onChange, minDate, maxDate, numberOfMonths = 1, placeholder = 'Select dates', locale = 'en', disabled, 'aria-label': ariaLabel = 'Date range', className }: DateRangePickerProps) {
  const [range, setRange] = useControlled<DateRangeValue>(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const format = (date: Date) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
  const text = range.from ? `${format(range.from)} – ${range.to ? format(range.to) : '…'}` : placeholder;
  const blocked: Matcher[] = [];
  if (minDate) blocked.push({ before: minDate });
  if (maxDate) blocked.push({ after: maxDate });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className={cx('gl-date-range-picker', !range.from && 'gl-date-range-picker--empty', className)} disabled={disabled} aria-label={`${ariaLabel}: ${range.from ? text : 'none'}`} icon={<CalendarIcon />}>{text}</Button>
      </PopoverTrigger>
      <PopoverContent className="gl-date-range-picker__panel">
        <Calendar
          mode="range" selected={range} defaultMonth={range.from} numberOfMonths={numberOfMonths} disabled={blocked.length ? blocked : undefined}
          onSelect={(next) => { setRange(next ?? EMPTY); if (next?.from && next.to) setOpen(false); }}
        />
        <div className="gl-date-range-picker__footer">
          <Button size="sm" variant="ghost" disabled={!range.from} onClick={() => setRange(EMPTY)}>Clear</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
