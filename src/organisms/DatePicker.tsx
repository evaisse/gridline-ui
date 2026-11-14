import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../atoms';
import { Calendar } from '../molecules';
import { CalendarIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './Combobox.css';
import './DatePicker.css';

export interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** Formats the chosen date for the trigger. */
  format?: (date: Date) => string;
  'aria-label'?: string;
  className?: string;
}

const defaultFormat = (date: Date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

/** A date field that opens a Calendar. */
export function DatePicker({ value, onValueChange, placeholder = 'Pick a date', format = defaultFormat, className, ...rest }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger aria-label={rest['aria-label']} className={cx('gl-combobox gl-date-picker', !value && 'gl-combobox--empty', className)}>
        <span>{value ? format(value) : placeholder}</span>
        <CalendarIcon />
      </PopoverTrigger>
      <PopoverContent className="gl-date-picker__pop">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          onSelect={(date) => {
            onValueChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
