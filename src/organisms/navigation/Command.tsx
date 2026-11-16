import { Command as Base } from 'cmdk';
import type { ComponentProps, ReactNode } from 'react';
import { SearchIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { styled } from '../../utils/styled';
import '../../tokens/overlay.css';
import './Command.css';

/** A filterable list of actions, driven from the keyboard. */
export const Command = styled(Base, 'gl-command');
export const CommandList = styled(Base.List, 'gl-command__list');
export const CommandEmpty = styled(Base.Empty, 'gl-command__empty');
export const CommandGroup = styled(Base.Group, 'gl-command__group');
export const CommandSeparator = styled(Base.Separator, 'gl-menu-sep');

export function CommandInput({ className, ...rest }: ComponentProps<typeof Base.Input>) {
  return (
    <div className="gl-command__input">
      <SearchIcon />
      <Base.Input className={cx('gl-command__control', className)} {...rest} />
    </div>
  );
}

export function CommandItem({ className, hint, children, ...rest }: ComponentProps<typeof Base.Item> & { hint?: ReactNode }) {
  return (
    <Base.Item className={cx('gl-menu-item', className)} {...rest}>
      {children}
      {hint != null && <span className="gl-menu-item__end">{hint}</span>}
    </Base.Item>
  );
}
