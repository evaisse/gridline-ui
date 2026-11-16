import { useState, type KeyboardEvent } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '../../atoms';
import { ClockIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './TimePicker.css';

export interface TimePickerProps {
  /** Time of day as `HH:mm` in 24-hour form; an empty string means no time. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Show and pick hours on a 12-hour clock with AM/PM. */
  hour12?: boolean;
  /** Minutes between choices in the minute column. */
  minuteStep?: number;
  placeholder?: string;
  disabled?: boolean;
  /** Accessible name of the trigger. */
  'aria-label'?: string;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

function parse(value: string): { h: number; m: number } | null {
  const match = /^(\d{1,2}):(\d{2})/.exec(value);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  return h < 24 && m < 60 ? { h, m } : null;
}

interface ColumnProps { label: string; items: Array<{ key: string; text: string; selected: boolean; onPick: () => void }> }

function Column({ label, items }: ColumnProps) {
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="option"]'));
    const at = options.indexOf(document.activeElement as HTMLButtonElement);
    options[Math.min(options.length - 1, Math.max(0, at + (event.key === 'ArrowDown' ? 1 : -1)))]?.focus();
  };
  const anySelected = items.some((item) => item.selected);
  return (
    <div className="gl-time-picker__column" role="listbox" aria-label={label} onKeyDown={onKey}>
      {items.map((item, index) => (
        <button
          key={item.key} type="button" role="option" aria-selected={item.selected} tabIndex={item.selected || (!anySelected && index === 0) ? 0 : -1} className="gl-time-picker__option" onClick={item.onPick}
          ref={item.selected ? (el) => el?.scrollIntoView({ block: 'nearest' }) : undefined}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
}

/** A time field that opens hour, minute and optional AM/PM columns. */
export function TimePicker({ value, defaultValue = '', onChange, hour12 = false, minuteStep = 5, placeholder = 'Select time', disabled, 'aria-label': ariaLabel = 'Time', className }: TimePickerProps) {
  const [time, setTime] = useControlled(value, defaultValue, onChange);
  const [open, setOpen] = useState(false);
  const parsed = parse(time);
  const h = parsed?.h ?? 0;
  const m = parsed?.m ?? 0;
  const pm = h >= 12;
  const commit = (nextH: number, nextM: number) => setTime(`${pad(nextH)}:${pad(nextM)}`);
  const display = parsed ? (hour12 ? `${h % 12 || 12}:${pad(m)} ${pm ? 'PM' : 'AM'}` : `${pad(h)}:${pad(m)}`) : placeholder;

  const hours = hour12 ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i);
  const step = Math.max(1, Math.floor(minuteStep));
  const minutes = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
  if (parsed && !minutes.includes(m)) minutes.push(m);
  minutes.sort((a, b) => a - b);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className={cx('gl-time-picker', !parsed && 'gl-time-picker--empty', className)} disabled={disabled} aria-label={`${ariaLabel}: ${parsed ? display : 'none'}`} icon={<ClockIcon />}>{display}</Button>
      </PopoverTrigger>
      <PopoverContent className="gl-time-picker__panel">
        <div className="gl-time-picker__columns">
          <Column
            label="Hour"
            items={hours.map((hour) => ({ key: String(hour), text: pad(hour), selected: !!parsed && (hour12 ? h % 12 || 12 : h) === hour, onPick: () => commit(hour12 ? (hour % 12) + (pm ? 12 : 0) : hour, m) }))}
          />
          <Column label="Minute" items={minutes.map((minute) => ({ key: String(minute), text: pad(minute), selected: !!parsed && m === minute, onPick: () => commit(h, minute) }))} />
          {hour12 && (
            <Column
              label="Period"
              items={[{ key: 'am', text: 'AM', selected: !!parsed && !pm, onPick: () => commit(h % 12, m) }, { key: 'pm', text: 'PM', selected: !!parsed && pm, onPick: () => commit((h % 12) + 12, m) }]}
            />
          )}
        </div>
        <div className="gl-time-picker__footer">
          <Button size="sm" variant="ghost" disabled={!parsed} onClick={() => setTime('')}>Clear</Button>
          <Button size="sm" variant="solid" onClick={() => setOpen(false)}>Done</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
