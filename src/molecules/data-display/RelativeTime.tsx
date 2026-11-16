import { useEffect, useState, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './RelativeTime.css';

export interface RelativeTimeProps extends Omit<HTMLAttributes<HTMLTimeElement>, 'children'> {
  /** The moment to describe. */
  value: Date | string | number;
  /** The reference moment. Fixing it makes the output deterministic and stops the interval. */
  now?: Date | string | number;
  /** Milliseconds between refreshes when `now` is not given. */
  refreshMs?: number;
  /** Locale for the wording, default `en`. */
  locale?: string;
}

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];

/** Formats the distance between two moments as words, such as "3 hours ago". */
export function formatRelative(value: Date | string | number, now: Date | string | number, locale = 'en'): string {
  const seconds = Math.round((new Date(value).getTime() - new Date(now).getTime()) / 1000);
  const format = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  if (Math.abs(seconds) < 5) return format.format(0, 'second');
  const [unit, size] = UNITS.find(([, s]) => Math.abs(seconds) >= s) ?? UNITS[UNITS.length - 1];
  return format.format(Math.trunc(seconds / size), unit);
}

/** A date written as "3 hours ago", refreshed as time passes. The full date is in the tooltip. */
export function RelativeTime({ value, now, refreshMs = 30000, locale = 'en', className, title, ...rest }: RelativeTimeProps) {
  const [tick, setTick] = useState(() => Date.now());
  useEffect(() => {
    if (now !== undefined) return undefined;
    const id = window.setInterval(() => setTick(Date.now()), refreshMs);
    return () => window.clearInterval(id);
  }, [now, refreshMs]);

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return <span className={cx('gl-relative-time', className)}>Invalid date</span>;
  return (
    <time dateTime={date.toISOString()} title={title ?? date.toLocaleString(locale)} className={cx('gl-relative-time', className)} {...rest}>
      {formatRelative(date, now ?? tick, locale)}
    </time>
  );
}
