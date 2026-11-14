import type { HTMLAttributes, ReactNode } from 'react';
import { Label, Progress } from '../atoms';
import { FileIcon, XIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import './Attachment.css';

export interface AttachmentProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Size or type, e.g. "PDF · 240 kB". */
  meta?: ReactNode;
  /** An image thumbnail URL. Falls back to a file glyph. */
  thumbnail?: string;
  /** Upload progress from 0 to 100. Omit when complete. */
  progress?: number;
  error?: string;
  onRemove?: () => void;
}

/** A file or image chip with upload state and a remove action. */
export function Attachment({ name, meta, thumbnail, progress, error, onRemove, className, ...rest }: AttachmentProps) {
  return (
    <div className={cx('gl-attachment', error && 'gl-attachment--error', className)} {...rest}>
      <span className="gl-attachment__media">
        {thumbnail ? <img src={thumbnail} alt="" /> : <FileIcon />}
      </span>
      <span className="gl-attachment__body">
        <span className="gl-attachment__name">{name}</span>
        {error ? <Label size="xs" className="gl-attachment__error">{error}</Label> : progress != null ? <Progress value={progress} aria-label={`Uploading ${name}`} /> : meta != null && <Label size="xs">{meta}</Label>}
      </span>
      {onRemove && (
        <button type="button" className="gl-attachment__remove" onClick={onRemove} aria-label={`Remove ${name}`}><XIcon width={12} height={12} /></button>
      )}
    </div>
  );
}
