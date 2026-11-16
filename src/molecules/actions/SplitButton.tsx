import type { ReactNode } from 'react';
import { Button } from '../../atoms';
import { ChevronDownIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../overlays/Menu';
import './SplitButton.css';

export interface SplitButtonItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface SplitButtonProps {
  /** The label of the default action. */
  children: ReactNode;
  /** Runs the default action. */
  onClick?: () => void;
  /** The alternatives listed in the menu. */
  items: SplitButtonItem[];
  variant?: 'solid' | 'ruled';
  disabled?: boolean;
  /** The accessible name of the menu toggle. */
  menuLabel?: string;
  className?: string;
}

/** A button with a default action and a menu of alternatives. */
export function SplitButton({ children, onClick, items, variant = 'solid', disabled, menuLabel = 'More actions', className }: SplitButtonProps) {
  return (
    <div className={cx('gl-split-button', `gl-split-button--${variant}`, className)}>
      <Button variant={variant} disabled={disabled} onClick={onClick} className="gl-split-button__main">{children}</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} disabled={disabled} aria-label={menuLabel} className="gl-split-button__toggle" icon={<ChevronDownIcon width={12} height={12} />} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {items.map((item) => (
            <DropdownMenuItem key={item.id} disabled={item.disabled} onSelect={() => item.onSelect?.()}>{item.label}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
