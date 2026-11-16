import { useState } from 'react';
import type { ReactNode } from 'react';
import { Avatar, Label } from '../../atoms';
import { cx } from '../../utils/cx';
import './ActivityFeed.css';

export interface ActivityEntry {
  id: string;
  /** Who did it. */
  actor: string;
  /** What they did, as a phrase: "published", "commented on". */
  action: ReactNode;
  /** What it was done to: a package, a ticket. */
  target?: ReactNode;
  /** When it happened. */
  at: Date | string | number;
  /** Free detail under the line. */
  detail?: ReactNode;
}

export interface ActivityFeedProps {
  entries: ActivityEntry[];
  /** The reference for "Today" and "Yesterday"; defaults to the current time. */
  now?: Date | string | number;
  className?: string;
}

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const clock = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');

function dayLabel(d: Date, now: Date) {
  const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((startOf(now) - startOf(d)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: d.getFullYear() === now.getFullYear() ? undefined : 'numeric' });
}

/** Who did what, newest first, grouped by day. */
export function ActivityFeed({ entries, now, className }: ActivityFeedProps) {
  const [mounted] = useState(() => Date.now());
  const ref = new Date(now ?? mounted);
  const sorted = entries.map((e) => ({ e, d: new Date(e.at) })).sort((a, b) => b.d.getTime() - a.d.getTime());
  const groups: Array<{ key: string; label: string; items: typeof sorted }> = [];
  for (const item of sorted) {
    const key = dayKey(item.d);
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.items.push(item);
    else groups.push({ key, label: dayLabel(item.d, ref), items: [item] });
  }

  if (groups.length === 0) return <p className={cx('gl-activity-feed', 'gl-activity-feed--empty', className)}>No activity yet.</p>;

  return (
    <div className={cx('gl-activity-feed', className)}>
      {groups.map((group) => (
        <section key={group.key} className="gl-activity-feed__group" aria-label={group.label}>
          <h3 className="gl-activity-feed__day"><Label tone="ink">{group.label}</Label></h3>
          <ul className="gl-activity-feed__list">
            {group.items.map(({ e, d }) => (
              <li key={e.id} className="gl-activity-feed__item">
                <Avatar fallback={initials(e.actor)} size="sm" />
                <div className="gl-activity-feed__main">
                  <p className="gl-activity-feed__line"><strong>{e.actor}</strong> {e.action}{e.target != null && <> <span className="gl-activity-feed__target">{e.target}</span></>}</p>
                  {e.detail != null && <div className="gl-activity-feed__detail">{e.detail}</div>}
                </div>
                <Label size="xs"><time dateTime={d.toISOString()}>{clock(d)}</time></Label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
