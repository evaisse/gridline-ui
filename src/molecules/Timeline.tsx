import type { ReactNode } from 'react';
import { Label } from '../atoms';
import type { Tone } from '../tokens/tone';
import { cx } from '../utils/cx';
import './Timeline.css';

export interface TimelineEvent {
  id: string;
  title: ReactNode;
  /** When it happened. */
  time?: ReactNode;
  /** Free content under the title. */
  children?: ReactNode;
  tone?: Tone;
  /** Replaces the square on the rail. */
  icon?: ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

/** Events in order along a vertical hairline. */
export function Timeline({ events, className }: TimelineProps) {
  return (
    <ol className={cx('gl-timeline', className)}>
      {events.map((event) => (
        <li key={event.id} className={cx('gl-timeline__event', `gl-tone--${event.tone ?? 'neutral'}`)}>
          <span className="gl-timeline__mark" data-icon={event.icon != null || undefined} aria-hidden="true">{event.icon}</span>
          <div className="gl-timeline__body">
            <div className="gl-timeline__head">
              <span className="gl-timeline__title">{event.title}</span>
              {event.time != null && <Label size="xs">{event.time}</Label>}
            </div>
            {event.children != null && <div className="gl-timeline__content">{event.children}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
