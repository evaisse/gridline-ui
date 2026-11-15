import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { Label } from '../atoms';
import { XIcon } from '../tokens/icons';
import type { Tone } from '../tokens/tone';
import { cx } from '../utils/cx';
import './Banner.css';

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  /** A short uppercase lead, e.g. "Maintenance". */
  label?: ReactNode;
  /** Buttons or a link at the end of the line. */
  action?: ReactNode;
  /** Shows a close cell. The banner hides itself and calls `onDismiss`. */
  dismissible?: boolean;
  onDismiss?: () => void;
}

/** A full-width announcement strip for the top of a page. For a message inside content, use Alert. */
export function Banner({ tone = 'neutral', label, action, dismissible = false, onDismiss, className, children, ...rest }: BannerProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div role="status" className={cx('gl-banner', `gl-tone--${tone}`, className)} {...rest}>
      <div className="gl-banner__text">
        {label != null && <Label tone="inherit" className="gl-banner__label">{label}</Label>}
        <span>{children}</span>
      </div>
      {action != null && <div className="gl-banner__action">{action}</div>}
      {dismissible && <button type="button" className="gl-banner__close" aria-label="Dismiss" onClick={() => { setOpen(false); onDismiss?.(); }}><XIcon /></button>}
    </div>
  );
}
