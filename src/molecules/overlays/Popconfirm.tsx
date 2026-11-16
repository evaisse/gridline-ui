import type { ReactNode } from 'react';
import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Popconfirm.css';

export interface PopconfirmProps {
  /** The element that asks; it becomes the trigger. Must accept a ref and click handlers. */
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Runs when the confirm button is pressed. */
  onConfirm?: () => void;
  onCancel?: () => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

/** A small confirmation anchored to the button that asked. */
export function Popconfirm({ children, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel, open, defaultOpen = false, onOpenChange, side = 'top', className }: PopconfirmProps) {
  const [isOpen, setOpen] = useControlled(open, defaultOpen, onOpenChange);
  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side={side} role="alertdialog" aria-label={typeof title === 'string' ? title : 'Confirm'} className={cx('gl-popconfirm', className)}>
        <p className="gl-popconfirm__title">{title}</p>
        {description != null && <p className="gl-popconfirm__description">{description}</p>}
        <div className="gl-popconfirm__actions">
          <PopoverClose asChild><Button size="sm" onClick={onCancel}>{cancelLabel}</Button></PopoverClose>
          <PopoverClose asChild><Button size="sm" variant="solid" onClick={onConfirm}>{confirmLabel}</Button></PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
