import { ActionBarPrimitive, AuiIf, BranchPickerPrimitive } from '@assistant-ui/react';
import { Button, Label, Tooltip } from '../../atoms';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon, PencilIcon, RefreshIcon, ThumbDownIcon, ThumbUpIcon } from '../../tokens/icons';
import './AssistantActions.css';

/** Copy, regenerate and feedback, under an assistant message. */
export function AssistantActionBar({ feedback = true }: { feedback?: boolean }) {
  return (
    <ActionBarPrimitive.Root hideWhenRunning autohide="not-last" className="gl-action-bar">
      <Tooltip content="Copy">
        <ActionBarPrimitive.Copy asChild>
          <Button variant="ghost" size="sm" aria-label="Copy" icon={<><AuiIf condition={(s) => s.message.isCopied}><CheckIcon /></AuiIf><AuiIf condition={(s) => !s.message.isCopied}><CopyIcon /></AuiIf></>} />
        </ActionBarPrimitive.Copy>
      </Tooltip>
      <Tooltip content="Regenerate">
        <ActionBarPrimitive.Reload asChild><Button variant="ghost" size="sm" aria-label="Regenerate" icon={<RefreshIcon />} /></ActionBarPrimitive.Reload>
      </Tooltip>
      {feedback && (
        <>
          <Tooltip content="Good response">
            <ActionBarPrimitive.FeedbackPositive asChild><Button variant="ghost" size="sm" aria-label="Good response" icon={<ThumbUpIcon />} /></ActionBarPrimitive.FeedbackPositive>
          </Tooltip>
          <Tooltip content="Bad response">
            <ActionBarPrimitive.FeedbackNegative asChild><Button variant="ghost" size="sm" aria-label="Bad response" icon={<ThumbDownIcon />} /></ActionBarPrimitive.FeedbackNegative>
          </Tooltip>
        </>
      )}
    </ActionBarPrimitive.Root>
  );
}

/** Edit, beside the person's own message. */
export function UserActionBar() {
  return (
    <ActionBarPrimitive.Root hideWhenRunning autohide="not-last" className="gl-action-bar">
      <Tooltip content="Edit">
        <ActionBarPrimitive.Edit asChild><Button variant="ghost" size="sm" aria-label="Edit message" icon={<PencilIcon />} /></ActionBarPrimitive.Edit>
      </Tooltip>
    </ActionBarPrimitive.Root>
  );
}

/** Steps between alternative versions of a message. Hidden when there is only one. */
export function BranchPicker() {
  return (
    <BranchPickerPrimitive.Root hideWhenSingleBranch className="gl-branch-picker">
      <BranchPickerPrimitive.Previous asChild><Button variant="ghost" size="sm" aria-label="Previous version" icon={<ChevronLeftIcon />} /></BranchPickerPrimitive.Previous>
      <Label size="xs"><BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count /></Label>
      <BranchPickerPrimitive.Next asChild><Button variant="ghost" size="sm" aria-label="Next version" icon={<ChevronRightIcon />} /></BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
}
