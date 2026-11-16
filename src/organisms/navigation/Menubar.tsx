import { Menubar as Base } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { styled } from '../../utils/styled';
import '../../tokens/overlay.css';
import './Menubar.css';

/** A desktop-style menu bar: File, Edit, View. */
export const Menubar = styled(Base.Root, 'gl-menubar');
export const MenubarMenu = Base.Menu;
export const MenubarTrigger = styled(Base.Trigger, 'gl-menubar__trigger');
export const MenubarSeparator = styled(Base.Separator, 'gl-menu-sep');
export const MenubarLabel = styled(Base.Label, 'gl-menu-label');

export function MenubarContent({ className, sideOffset = 4, align = 'start', ...rest }: ComponentProps<typeof Base.Content>) {
  return <Base.Portal><Base.Content sideOffset={sideOffset} align={align} className={cx('gl-pop', className)} {...rest} /></Base.Portal>;
}

export function MenubarItem({ className, hint, children, ...rest }: ComponentProps<typeof Base.Item> & { hint?: ReactNode }) {
  return <Base.Item className={cx('gl-menu-item', className)} {...rest}>{children}{hint != null && <span className="gl-menu-item__end">{hint}</span>}</Base.Item>;
}
