import { AttachmentPrimitive, AuiIf, ComposerPrimitive, useAuiState } from '@assistant-ui/react';
import { Button, Label, Tooltip } from '../atoms';
import { Attachment } from '../molecules';
import { ArrowUpIcon, PaperclipIcon, QuoteIcon, StopIcon, XIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './AssistantComposer.css';

function ComposerAttachment() {
  const name = useAuiState((s) => s.attachment.name);
  const type = useAuiState((s) => s.attachment.type);
  return (
    <AttachmentPrimitive.Root>
      <Attachment name={name} meta={type} />
      <AttachmentPrimitive.Remove asChild>
        <button type="button" className="gl-composer__remove" aria-label={`Remove ${name}`}><XIcon width={10} height={10} /></button>
      </AttachmentPrimitive.Remove>
    </AttachmentPrimitive.Root>
  );
}

export interface AssistantComposerProps {
  placeholder?: string;
  autoFocus?: boolean;
  /** Show the attach button. The runtime must have an attachment adapter. */
  attachments?: boolean;
  className?: string;
}

/** The message box: quoted selection, attachments, input, then attach and send in a ruled strip. */
export function AssistantComposer({ placeholder = 'Send a message', autoFocus = false, attachments = false, className }: AssistantComposerProps) {
  return (
    <ComposerPrimitive.Root className={cx('gl-composer', className)}>
      <ComposerPrimitive.Quote className="gl-composer__quote">
        <QuoteIcon width={12} height={12} />
        <ComposerPrimitive.QuoteText className="gl-composer__quote-text" />
        <ComposerPrimitive.QuoteDismiss asChild><Button variant="ghost" size="sm" aria-label="Remove quote" icon={<XIcon />} /></ComposerPrimitive.QuoteDismiss>
      </ComposerPrimitive.Quote>
      {attachments && (
        <AuiIf condition={(s) => s.composer.attachments.length > 0}>
          <div className="gl-composer__attachments">
            <ComposerPrimitive.Attachments>{() => <ComposerAttachment />}</ComposerPrimitive.Attachments>
          </div>
        </AuiIf>
      )}
      <ComposerPrimitive.Input className="gl-composer__input" placeholder={placeholder} rows={1} autoFocus={autoFocus} enterKeyHint="send" aria-label="Message" />
      <div className="gl-composer__bar">
        {attachments && (
          <Tooltip content="Attach a file">
            <ComposerPrimitive.AddAttachment asChild><Button variant="ghost" size="sm" aria-label="Attach a file" icon={<PaperclipIcon />} /></ComposerPrimitive.AddAttachment>
          </Tooltip>
        )}
        <Label size="xs" className="gl-composer__hint">Enter to send · Shift + Enter for a new line</Label>
        <AuiIf condition={(s) => !s.thread.isRunning}>
          <ComposerPrimitive.Send asChild><Button variant="solid" size="sm" icon={<ArrowUpIcon />}>Send</Button></ComposerPrimitive.Send>
        </AuiIf>
        <AuiIf condition={(s) => s.thread.isRunning}>
          <ComposerPrimitive.Cancel asChild><Button size="sm" icon={<StopIcon />}>Stop</Button></ComposerPrimitive.Cancel>
        </AuiIf>
      </div>
    </ComposerPrimitive.Root>
  );
}
