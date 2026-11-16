import { Select as Base } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';
import { CheckIcon, ChevronDownIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { styled } from '../../utils/styled';
import '../../tokens/overlay.css';
import './Select.css';

export interface SelectProps extends ComponentProps<typeof Base.Root> {
  placeholder?: string;
  'aria-label'?: string;
  variant?: 'ruled' | 'cell';
  className?: string;
  children: ReactNode;
}

/** A custom listbox. Use NativeSelect when the platform picker is good enough. */
export function Select({ placeholder, variant = 'ruled', className, children, 'aria-label': ariaLabel, ...rest }: SelectProps) {
  return (
    <Base.Root {...rest}>
      <Base.Trigger aria-label={ariaLabel} className={cx('gl-select-trigger', `gl-select-trigger--${variant}`, className)}>
        <Base.Value placeholder={placeholder} />
        <Base.Icon className="gl-select-trigger__icon"><ChevronDownIcon /></Base.Icon>
      </Base.Trigger>
      <Base.Portal>
        <Base.Content position="popper" sideOffset={4} className="gl-pop gl-select-content">
          <Base.Viewport>{children}</Base.Viewport>
        </Base.Content>
      </Base.Portal>
    </Base.Root>
  );
}

export function SelectItem({ className, children, ...rest }: ComponentProps<typeof Base.Item>) {
  return (
    <Base.Item className={cx('gl-menu-item', className)} {...rest}>
      <Base.ItemText>{children}</Base.ItemText>
      <Base.ItemIndicator className="gl-menu-item__end"><CheckIcon width={12} height={12} /></Base.ItemIndicator>
    </Base.Item>
  );
}

export const SelectGroup = Base.Group;
export const SelectLabel = styled(Base.Label, 'gl-menu-label');
export const SelectSeparator = styled(Base.Separator, 'gl-menu-sep');
