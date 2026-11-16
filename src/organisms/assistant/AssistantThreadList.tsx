import { AuiIf, ThreadListItemPrimitive, ThreadListPrimitive } from '@assistant-ui/react';
import { Button, Label } from '../../atoms';
import { PlusIcon, TrashIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './AssistantThreadList.css';

function ThreadListItem() {
  return (
    <ThreadListItemPrimitive.Root className="gl-thread-list__item">
      <ThreadListItemPrimitive.Trigger className="gl-thread-list__trigger">
        <ThreadListItemPrimitive.Title fallback="New conversation" />
      </ThreadListItemPrimitive.Trigger>
      <ThreadListItemPrimitive.Delete asChild>
        <button type="button" className="gl-thread-list__delete" aria-label="Delete conversation"><TrashIcon width={12} height={12} /></button>
      </ThreadListItemPrimitive.Delete>
    </ThreadListItemPrimitive.Root>
  );
}

export interface AssistantThreadListProps {
  title?: string;
  className?: string;
}

/** The conversations of the current runtime: a "new" button, then one ruled row each. */
export function AssistantThreadList({ title = 'Conversations', className }: AssistantThreadListProps) {
  return (
    <ThreadListPrimitive.Root className={cx('gl-thread-list', className)}>
      <div className="gl-thread-list__head">
        <Label>{title}</Label>
        <ThreadListPrimitive.New asChild><Button size="sm" icon={<PlusIcon />}>New</Button></ThreadListPrimitive.New>
      </div>
      <div className="gl-thread-list__items">
        <ThreadListPrimitive.Items>{() => <ThreadListItem />}</ThreadListPrimitive.Items>
        <AuiIf condition={(s) => s.threads.threadIds.length === 0}>
          <div className="gl-thread-list__empty gl-hatch"><Label size="xs">Saved conversations appear here</Label></div>
        </AuiIf>
      </div>
    </ThreadListPrimitive.Root>
  );
}
