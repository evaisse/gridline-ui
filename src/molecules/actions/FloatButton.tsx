import { useState } from 'react';
import type { ReactNode } from 'react';
import { IconButton } from '../../atoms';
import { PlusIcon, XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './FloatButton.css';

export interface FloatAction {
  id: string;
  label: string;
  icon: ReactNode;
  onSelect?: () => void;
}

export interface FloatButtonProps {
  /** The accessible name of the main button. */
  label: string;
  /** Glyph of the main button. Defaults to a plus. */
  icon?: ReactNode;
  /** Pressed when there are no `actions`. */
  onClick?: () => void;
  /** Extra actions that unfold above the main button, like a speed dial. */
  actions?: FloatAction[];
  /** Which corner of the viewport it sits in. */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Pin to the nearest positioned ancestor instead of the viewport. */
  contained?: boolean;
  className?: string;
}

/** A button pinned to a corner of the viewport, optionally opening more actions. */
export function FloatButton({ label, icon, onClick, actions, position = 'bottom-right', contained = false, className }: FloatButtonProps) {
  const [open, setOpen] = useState(false);
  const hasActions = actions != null && actions.length > 0;
  const up = position.startsWith('bottom');

  return (
    <div
      className={cx('gl-float-button', `gl-float-button--${position}`, contained && 'gl-float-button--contained', !up && 'gl-float-button--down', className)}
      onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
    >
      {hasActions && open && (
        <ul className="gl-float-button__list" aria-label={`${label} actions`}>
          {actions.map((action) => (
            <li key={action.id}>
              <IconButton label={action.label} icon={action.icon} onClick={() => { setOpen(false); action.onSelect?.(); }} />
            </li>
          ))}
        </ul>
      )}
      <IconButton
        variant="solid"
        label={label}
        icon={hasActions && open ? <XIcon /> : (icon ?? <PlusIcon />)}
        aria-haspopup={hasActions ? 'true' : undefined}
        aria-expanded={hasActions ? open : undefined}
        onClick={() => (hasActions ? setOpen(!open) : onClick?.())}
      />
    </div>
  );
}
