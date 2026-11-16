import { useState } from 'react';
import type { ReactNode } from 'react';
import { Badge, Button, IconButton, Label, Popover, PopoverContent, PopoverTrigger } from '../../atoms';
import { Tabs } from '../../molecules';
import { BellIcon } from '../../tokens/icons';
import type { Tone } from '../../tokens/tone';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './NotificationCenter.css';

export interface NotificationItem {
  id: string;
  title: ReactNode;
  body?: ReactNode;
  /** When it arrived, as text: "5 min ago". */
  time?: ReactNode;
  read: boolean;
  tone?: Tone;
}

export interface NotificationCenterProps {
  items?: NotificationItem[];
  defaultItems?: NotificationItem[];
  /** Called with the new list after one or all items are marked as read. */
  onChange?: (items: NotificationItem[]) => void;
  className?: string;
}

/** A bell with an unread count; its popover lists unread and all notifications and marks them as read. */
export function NotificationCenter({ items, defaultItems = [], onChange, className }: NotificationCenterProps) {
  const [list, setList] = useControlled<NotificationItem[]>(items, defaultItems, onChange);
  const [tab, setTab] = useState('unread');
  const unread = list.filter((n) => !n.read);
  const shown = tab === 'unread' ? unread : list;
  const markRead = (id: string) => setList(list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAll = () => setList(list.map((n) => ({ ...n, read: true })));
  const bell = <IconButton label={unread.length > 0 ? `Notifications, ${unread.length} unread` : 'Notifications'} icon={<BellIcon />} />;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className={cx('gl-notification-center', className)}>
          {unread.length > 0 ? <Badge content={unread.length} tone="neg">{bell}</Badge> : bell}
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="gl-notification-center__pop">
        <div className="gl-notification-center__head">
          <Tabs
            aria-label="Filter notifications"
            items={[{ id: 'unread', label: `Unread ${unread.length}` }, { id: 'all', label: `All ${list.length}` }]}
            value={tab}
            onChange={setTab}
          />
        </div>
        {shown.length === 0 ? (
          <p className="gl-notification-center__empty">{tab === 'unread' ? 'You are all caught up.' : 'No notifications.'}</p>
        ) : (
          <ul className="gl-notification-center__list">
            {shown.map((n) => (
              <li key={n.id} className={cx('gl-notification-center__item', `gl-tone--${n.tone ?? 'neutral'}`)} data-unread={!n.read || undefined}>
                <span className="gl-notification-center__mark" aria-hidden="true" />
                <div className="gl-notification-center__text">
                  <span className="gl-notification-center__title">{n.title}</span>
                  {n.body != null && <span className="gl-notification-center__body">{n.body}</span>}
                  {n.time != null && <Label size="xs">{n.time}</Label>}
                </div>
                {!n.read && <Button size="sm" variant="ghost" onClick={() => markRead(n.id)}>Mark read</Button>}
              </li>
            ))}
          </ul>
        )}
        <div className="gl-notification-center__foot">
          <Button size="sm" variant="ruled" disabled={unread.length === 0} onClick={markAll}>Mark all as read</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
