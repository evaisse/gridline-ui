import { useMemo, type CSSProperties } from 'react';
import { Button, IconButton, Label } from '../../atoms';
import { ToggleGroup, ToggleGroupItem } from '../../molecules';
import { ChevronLeftIcon, ChevronRightIcon } from '../../tokens/icons';
import type { Tone } from '../../tokens/tone';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Scheduler.css';

export interface SchedulerEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  tone?: Tone;
}

export type SchedulerView = 'day' | 'week' | 'month';

export interface SchedulerProps {
  events: SchedulerEvent[];
  /** The focused date. Controlled when given. */
  date?: Date;
  defaultDate?: Date;
  onDateChange?: (date: Date) => void;
  view?: SchedulerView;
  defaultView?: SchedulerView;
  onViewChange?: (view: SchedulerView) => void;
  onEventClick?: (event: SchedulerEvent) => void;
  /** The date the "Today" button and the today highlight use. Defaults to the system date. */
  today?: Date;
  /** First and last hour shown on the day and week grids. */
  startHour?: number;
  endHour?: number;
  'aria-label'?: string;
  className?: string;
}

const HOUR_H = 40;
const MS_DAY = 86_400_000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const startOfWeek = (d: Date) => addDays(startOfDay(d), -((d.getDay() + 6) % 7));
const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();
const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => d.toLocaleDateString('en-US', o);
const time = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
const overlapsDay = (e: SchedulerEvent, day: Date) => e.start.getTime() < day.getTime() + MS_DAY && e.end.getTime() > day.getTime();

function shift(date: Date, view: SchedulerView, dir: 1 | -1): Date {
  if (view === 'month') return new Date(date.getFullYear(), date.getMonth() + dir, 1);
  return addDays(date, dir * (view === 'week' ? 7 : 1));
}

function heading(date: Date, view: SchedulerView): string {
  if (view === 'month') return fmt(date, { month: 'long', year: 'numeric' });
  if (view === 'day') return fmt(date, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  const first = startOfWeek(date);
  return `${fmt(first, { month: 'short', day: 'numeric' })} – ${fmt(addDays(first, 6), { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

/** Day, week and month views of dated events. Day and week place events on an hour grid; month lists them in day cells. */
export function Scheduler({ events, date, defaultDate, onDateChange, view, defaultView = 'week', onViewChange, onEventClick, today, startHour = 8, endHour = 18, className, ...rest }: SchedulerProps) {
  const now = today ?? new Date();
  const [current, setDate] = useControlled(date, defaultDate ?? now, onDateChange);
  const [mode, setMode] = useControlled(view, defaultView, onViewChange);

  const days = useMemo(() => {
    if (mode === 'day') return [startOfDay(current)];
    if (mode === 'week') return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(current), i));
    const first = startOfWeek(new Date(current.getFullYear(), current.getMonth(), 1));
    return Array.from({ length: 42 }, (_, i) => addDays(first, i));
  }, [current, mode]);

  const hours = Array.from({ length: Math.max(1, endHour - startHour) }, (_, i) => startHour + i);
  const eventButton = (e: SchedulerEvent, style?: CSSProperties) => (
    <button key={e.id} type="button" className={cx('gl-scheduler__event', `gl-tone--${e.tone ?? 'neutral'}`)} style={style} onClick={() => onEventClick?.(e)} title={`${e.title}, ${time(e.start)} to ${time(e.end)}`}>
      <span className="gl-scheduler__event-time">{time(e.start)}</span> {e.title}
    </button>
  );

  /** Greedy lane assignment so overlapping events sit side by side. */
  const laid = (day: Date) => {
    const list = events.filter((e) => overlapsDay(e, day)).sort((a, b) => a.start.getTime() - b.start.getTime());
    const ends: number[] = [];
    const placed = list.map((e) => {
      let lane = ends.findIndex((end) => end <= e.start.getTime());
      if (lane < 0) lane = ends.length;
      ends[lane] = e.end.getTime();
      return { e, lane };
    });
    return placed.map((p) => ({ ...p, lanes: Math.max(1, ...placed.filter((q) => q.e.start < p.e.end && q.e.end > p.e.start).map((q) => q.lane + 1)) }));
  };

  const top = (d: Date, day: Date) => Math.min(Math.max(((d.getTime() - day.getTime()) / 3_600_000 - startHour) * HOUR_H, 0), hours.length * HOUR_H);

  return (
    <div className={cx('gl-scheduler', className)} style={{ '--gl-sched-hour': `${HOUR_H}px` } as CSSProperties} {...rest}>
      <div className="gl-scheduler__bar">
        <IconButton label="Previous" size="sm" icon={<ChevronLeftIcon width={14} height={14} />} onClick={() => setDate(shift(current, mode, -1))} />
        <IconButton label="Next" size="sm" icon={<ChevronRightIcon width={14} height={14} />} onClick={() => setDate(shift(current, mode, 1))} />
        <Button size="sm" onClick={() => setDate(now)}>Today</Button>
        <Label className="gl-scheduler__title" aria-live="polite">{heading(current, mode)}</Label>
        <ToggleGroup type="single" value={mode} onValueChange={(v: string) => v && setMode(v as SchedulerView)} aria-label="View">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {mode === 'month' ? (
        <div className="gl-scheduler__scroll">
          <div className="gl-scheduler__month" role="grid" aria-label={heading(current, mode)}>
            {days.slice(0, 7).map((d) => <div key={d.getTime()} role="columnheader" className="gl-scheduler__dow">{fmt(d, { weekday: 'short' })}</div>)}
            {days.map((d) => {
              const list = events.filter((e) => overlapsDay(e, d)).sort((a, b) => a.start.getTime() - b.start.getTime());
              return (
                <div key={d.getTime()} role="gridcell" className="gl-scheduler__cell" data-outside={d.getMonth() !== current.getMonth() || undefined} data-today={sameDay(d, now) || undefined}>
                  <span className="gl-scheduler__daynum">{d.getDate()}</span>
                  {list.slice(0, 3).map((e) => eventButton(e))}
                  {list.length > 3 && <Label size="xs" className="gl-scheduler__more">+{list.length - 3} more</Label>}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="gl-scheduler__scroll">
          <div className="gl-scheduler__grid" style={{ gridTemplateColumns: `48px repeat(${days.length}, minmax(96px, 1fr))` }} role="grid" aria-label={heading(current, mode)}>
            <div className="gl-scheduler__corner" />
            {days.map((d) => (
              <div key={d.getTime()} role="columnheader" className="gl-scheduler__dow" data-today={sameDay(d, now) || undefined}>{fmt(d, { weekday: 'short', day: 'numeric' })}</div>
            ))}
            <div className="gl-scheduler__hours">
              {hours.map((h) => <Label key={h} size="xs" className="gl-scheduler__hour">{String(h).padStart(2, '0')}:00</Label>)}
            </div>
            {days.map((d) => (
              <div key={d.getTime()} role="gridcell" className="gl-scheduler__day" data-today={sameDay(d, now) || undefined} style={{ height: hours.length * HOUR_H }}>
                {hours.map((h, i) => <span key={h} className="gl-scheduler__line" style={{ top: (i + 1) * HOUR_H - 1 }} aria-hidden="true" />)}
                {laid(d).map(({ e, lane, lanes }) => {
                  const t = top(e.start, d);
                  return eventButton(e, { top: t, height: Math.max(top(e.end, d) - t, 20), left: `${(lane / lanes) * 100}%`, width: `${100 / lanes}%` });
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
