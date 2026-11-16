import type { KeyboardEvent } from 'react';
import { IconButton, Input, Label, Link } from '../../atoms';
import { Empty } from '../../molecules';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, FileIcon, ZoomInIcon, ZoomOutIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './PdfViewer.css';

export interface PdfViewerProps {
  /** URL of the document. A `data:` or `blob:` URI works too. Without it an empty state is shown. */
  src?: string;
  /** Accessible name of the document, also the download file name. */
  title?: string;
  /** Current page, starting at 1. */
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** Zoom in percent. */
  zoom?: number;
  defaultZoom?: number;
  onZoomChange?: (zoom: number) => void;
  /** Number of pages, when known. It limits the page controls. */
  pageCount?: number;
  /** Height of the document area in pixels. */
  height?: number;
  className?: string;
}

const STEPS = [50, 75, 100, 125, 150, 200, 300];

/**
 * A document in the browser's own PDF renderer, under a ruled toolbar (page, zoom, download, open).
 * Rendering, in-document search and text selection are delegated to the browser: the page and zoom
 * are passed as `#page=` and `#zoom=` fragments, which browsers honour to different degrees. When the
 * browser cannot display PDFs inline, or there is no `src`, an empty state is shown.
 */
export function PdfViewer({ src, title = 'Document', page, defaultPage = 1, onPageChange, zoom, defaultZoom = 100, onZoomChange, pageCount, height = 560, className }: PdfViewerProps) {
  const [current, setPage] = useControlled(page, defaultPage, onPageChange);
  const [scale, setZoom] = useControlled(zoom, defaultZoom, onZoomChange);
  const last = pageCount ?? Infinity;
  const goto = (n: number) => { if (Number.isFinite(n)) setPage(Math.min(Math.max(1, Math.round(n)), last)); };
  const step = (dir: 1 | -1) => {
    const at = STEPS.findIndex((s) => s >= scale);
    const next = dir > 0 ? STEPS.find((s) => s > scale) : [...STEPS].reverse().find((s) => s < scale);
    setZoom(next ?? STEPS[at < 0 ? STEPS.length - 1 : at]);
  };
  const onPageKey = (event: KeyboardEvent<HTMLInputElement>) => { if (event.key === 'Enter') goto(event.currentTarget.valueAsNumber); };
  const fragment = `#page=${current}&zoom=${scale}`;
  const none = <Empty icon={<FileIcon />} title={src ? 'This browser cannot show the PDF' : 'No document'} description={src ? 'Download the file or open it in a new tab.' : 'Choose a document to preview it here.'} />;

  return (
    <div className={cx('gl-pdf', className)}>
      <div className="gl-pdf__bar" role="toolbar" aria-label={`${title} controls`}>
        <div className="gl-pdf__cell">
          <IconButton label="Previous page" icon={<ChevronLeftIcon />} variant="ghost" size="sm" disabled={!src || current <= 1} onClick={() => goto(current - 1)} />
          <Input key={current} className="gl-pdf__page" variant="cell" type="number" min={1} max={Number.isFinite(last) ? last : undefined} defaultValue={current} aria-label="Page number" disabled={!src} onKeyDown={onPageKey} onBlur={(event) => goto(event.currentTarget.valueAsNumber)} />
          {Number.isFinite(last) && <Label>of {last}</Label>}
          <IconButton label="Next page" icon={<ChevronRightIcon />} variant="ghost" size="sm" disabled={!src || current >= last} onClick={() => goto(current + 1)} />
        </div>
        <div className="gl-pdf__cell">
          <IconButton label="Zoom out" icon={<ZoomOutIcon />} variant="ghost" size="sm" disabled={!src || scale <= STEPS[0]} onClick={() => step(-1)} />
          <Label tone="ink" className="gl-pdf__zoom" aria-live="polite">{scale}%</Label>
          <IconButton label="Zoom in" icon={<ZoomInIcon />} variant="ghost" size="sm" disabled={!src || scale >= STEPS[STEPS.length - 1]} onClick={() => step(1)} />
        </div>
        {src && (
          <div className="gl-pdf__cell gl-pdf__cell--end">
            <Link variant="plain" href={src} download={title.endsWith('.pdf') ? title : `${title}.pdf`}><DownloadIcon aria-hidden="true" /> Download</Link>
            <Link variant="plain" href={src} external>Open</Link>
          </div>
        )}
      </div>
      <div className="gl-pdf__view" style={{ height }}>
        {src ? (
          <object key={`${src}${fragment}`} className="gl-pdf__object" data={`${src}${fragment}`} type="application/pdf" aria-label={title}>{none}</object>
        ) : none}
      </div>
    </div>
  );
}
