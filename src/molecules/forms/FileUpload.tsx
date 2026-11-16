import { useRef, useState, type DragEvent } from 'react';
import { Label } from '../../atoms';
import { FileIcon, UploadIcon, XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './FileUpload.css';

export interface FileUploadProps {
  /** Called with the full list each time files are added or removed. */
  onFilesChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  /** The main line inside the drop zone. */
  title?: string;
  /** A hint under it: accepted types, size limit. */
  hint?: string;
  disabled?: boolean;
  className?: string;
}

const size = (bytes: number) => (bytes >= 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} kB`);

/** A hatched drop zone that also opens the file picker, with the chosen files listed under it. */
export function FileUpload({ onFilesChange, accept, multiple = true, title = 'Drop files here or browse', hint, disabled = false, className }: FileUploadProps) {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [over, setOver] = useState(false);

  const update = (next: File[]) => { setFiles(next); onFilesChange?.(next); };
  const add = (list: FileList | null) => { if (list && list.length > 0) update(multiple ? [...files, ...list] : [list[0]]); };
  const onDrop = (event: DragEvent) => { event.preventDefault(); setOver(false); if (!disabled) add(event.dataTransfer.files); };

  return (
    <div className={cx('gl-file-upload', className)}>
      <button
        type="button" className="gl-file-upload__zone gl-hatch" data-over={over || undefined} disabled={disabled} onClick={() => input.current?.click()}
        onDragOver={(event) => { event.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={onDrop}
      >
        <span className="gl-file-upload__box">
          <UploadIcon />
          <Label tone="ink">{title}</Label>
          {hint != null && <span className="gl-file-upload__hint">{hint}</span>}
        </span>
      </button>
      <input ref={input} type="file" hidden accept={accept} multiple={multiple} onChange={(event) => { add(event.target.files); event.target.value = ''; }} />
      {files.length > 0 && (
        <ul className="gl-file-upload__list">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`}>
              <FileIcon />
              <span className="gl-file-upload__name">{file.name}</span>
              <Label size="xs">{size(file.size)}</Label>
              <button type="button" aria-label={`Remove ${file.name}`} onClick={() => update(files.filter((_, at) => at !== i))}><XIcon width={12} height={12} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
