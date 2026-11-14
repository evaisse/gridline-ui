import { AlertDialog as Alert, Dialog as Base } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';
import { Button, Heading, Text } from '../atoms';
import { XIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import { styled } from '../utils/styled';
import '../tokens/overlay.css';
import './Dialog.css';

export const Dialog = Base.Root;
export const DialogTrigger = Base.Trigger;
export const DialogClose = Base.Close;
export const DialogFooter = styled('footer', 'gl-dialog__footer');
export const DialogBody = styled('div', 'gl-dialog__body');

export interface DialogContentProps extends Omit<ComponentProps<typeof Base.Content>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** `center` is a modal dialog; a side makes it a sheet; `bottom` is a drawer. */
  side?: 'center' | 'left' | 'right' | 'top' | 'bottom';
}

/** The surface shared by Dialog, Sheet and Drawer. A title is required for screen readers. */
export function DialogContent({ title, description, side = 'center', className, children, ...rest }: DialogContentProps) {
  return (
    <Base.Portal>
      <Base.Overlay className="gl-backdrop" />
      <Base.Content className={cx('gl-dialog', `gl-dialog--${side}`, className)} {...(description == null ? { 'aria-describedby': undefined } : {})} {...rest}>
        <header className="gl-dialog__header">
          <div className="gl-dialog__heading">
            <Base.Title asChild><Heading level={2} size="md">{title}</Heading></Base.Title>
            {description != null && <Base.Description asChild><Text variant="small" tone="muted">{description}</Text></Base.Description>}
          </div>
          <Base.Close asChild><Button variant="ghost" size="sm" icon={<XIcon />} aria-label="Close" /></Base.Close>
        </header>
        {children}
      </Base.Content>
    </Base.Portal>
  );
}

/** Sheet: a dialog docked to an edge. */
export const Sheet = Base.Root;
export const SheetTrigger = Base.Trigger;
export const SheetClose = Base.Close;
export function SheetContent({ side = 'right', ...rest }: DialogContentProps) {
  return <DialogContent side={side} {...rest} />;
}

/** Drawer: a sheet that rises from the bottom, for narrow screens. */
export const Drawer = Base.Root;
export const DrawerTrigger = Base.Trigger;
export const DrawerClose = Base.Close;
export function DrawerContent(props: Omit<DialogContentProps, 'side'>) {
  return <DialogContent side="bottom" {...props} />;
}

/** Alert dialog: interrupts for a decision. It cannot be dismissed by clicking outside. */
export const AlertDialog = Alert.Root;
export const AlertDialogTrigger = Alert.Trigger;

export interface AlertDialogContentProps {
  title: ReactNode;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

export function AlertDialogContent({ title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm }: AlertDialogContentProps) {
  return (
    <Alert.Portal>
      <Alert.Overlay className="gl-backdrop" />
      <Alert.Content className="gl-dialog gl-dialog--center">
        <header className="gl-dialog__header">
          <div className="gl-dialog__heading">
            <Alert.Title asChild><Heading level={2} size="md">{title}</Heading></Alert.Title>
            <Alert.Description asChild><Text variant="small" tone="muted">{description}</Text></Alert.Description>
          </div>
        </header>
        <footer className="gl-dialog__footer">
          <Alert.Cancel asChild><Button>{cancelLabel}</Button></Alert.Cancel>
          <Alert.Action asChild><Button variant="solid" onClick={onConfirm}>{confirmLabel}</Button></Alert.Action>
        </footer>
      </Alert.Content>
    </Alert.Portal>
  );
}
