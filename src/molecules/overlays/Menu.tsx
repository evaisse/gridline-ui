import { ContextMenu as Ctx, DropdownMenu as Drop } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';
import { CheckIcon, ChevronRightIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { styled } from '../../utils/styled';
import '../../tokens/overlay.css';

interface ItemExtras {
  /** A shortcut or hint shown on the right. */
  hint?: ReactNode;
}

/* Dropdown menu: opens from a trigger. */
export const DropdownMenu = Drop.Root;
export const DropdownMenuTrigger = Drop.Trigger;
export const DropdownMenuGroup = Drop.Group;
export const DropdownMenuRadioGroup = Drop.RadioGroup;
export const DropdownMenuSub = Drop.Sub;
export const DropdownMenuLabel = styled(Drop.Label, 'gl-menu-label');
export const DropdownMenuSeparator = styled(Drop.Separator, 'gl-menu-sep');

export function DropdownMenuContent({ className, sideOffset = 4, align = 'start', ...rest }: ComponentProps<typeof Drop.Content>) {
  return <Drop.Portal><Drop.Content sideOffset={sideOffset} align={align} className={cx('gl-pop', className)} {...rest} /></Drop.Portal>;
}
export function DropdownMenuItem({ className, hint, children, ...rest }: ComponentProps<typeof Drop.Item> & ItemExtras) {
  return <Drop.Item className={cx('gl-menu-item', className)} {...rest}>{children}{hint != null && <span className="gl-menu-item__end">{hint}</span>}</Drop.Item>;
}
export function DropdownMenuCheckboxItem({ className, children, ...rest }: ComponentProps<typeof Drop.CheckboxItem>) {
  return <Drop.CheckboxItem className={cx('gl-menu-item', className)} {...rest}>{children}<Drop.ItemIndicator className="gl-menu-item__end"><CheckIcon width={12} height={12} /></Drop.ItemIndicator></Drop.CheckboxItem>;
}
export function DropdownMenuRadioItem({ className, children, ...rest }: ComponentProps<typeof Drop.RadioItem>) {
  return <Drop.RadioItem className={cx('gl-menu-item', className)} {...rest}>{children}<Drop.ItemIndicator className="gl-menu-item__end"><CheckIcon width={12} height={12} /></Drop.ItemIndicator></Drop.RadioItem>;
}
export function DropdownMenuSubTrigger({ className, children, ...rest }: ComponentProps<typeof Drop.SubTrigger>) {
  return <Drop.SubTrigger className={cx('gl-menu-item', className)} {...rest}>{children}<span className="gl-menu-item__end"><ChevronRightIcon width={12} height={12} /></span></Drop.SubTrigger>;
}
export function DropdownMenuSubContent({ className, ...rest }: ComponentProps<typeof Drop.SubContent>) {
  return <Drop.Portal><Drop.SubContent sideOffset={4} className={cx('gl-pop', className)} {...rest} /></Drop.Portal>;
}

/* Context menu: opens on right click or long press. */
export const ContextMenu = Ctx.Root;
export const ContextMenuTrigger = Ctx.Trigger;
export const ContextMenuLabel = styled(Ctx.Label, 'gl-menu-label');
export const ContextMenuSeparator = styled(Ctx.Separator, 'gl-menu-sep');

export function ContextMenuContent({ className, ...rest }: ComponentProps<typeof Ctx.Content>) {
  return <Ctx.Portal><Ctx.Content className={cx('gl-pop', className)} {...rest} /></Ctx.Portal>;
}
export function ContextMenuItem({ className, hint, children, ...rest }: ComponentProps<typeof Ctx.Item> & ItemExtras) {
  return <Ctx.Item className={cx('gl-menu-item', className)} {...rest}>{children}{hint != null && <span className="gl-menu-item__end">{hint}</span>}</Ctx.Item>;
}
export function ContextMenuCheckboxItem({ className, children, ...rest }: ComponentProps<typeof Ctx.CheckboxItem>) {
  return <Ctx.CheckboxItem className={cx('gl-menu-item', className)} {...rest}>{children}<Ctx.ItemIndicator className="gl-menu-item__end"><CheckIcon width={12} height={12} /></Ctx.ItemIndicator></Ctx.CheckboxItem>;
}
