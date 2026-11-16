import { NavigationMenu as Base } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';
import { ChevronDownIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { styled } from '../../utils/styled';
import '../../tokens/overlay.css';
import './NavigationMenu.css';

/** Site navigation with optional flyout panels. */
export function NavigationMenu({ className, children, ...rest }: ComponentProps<typeof Base.Root>) {
  return (
    <Base.Root className={cx('gl-nav-menu', className)} {...rest}>
      <Base.List className="gl-nav-menu__list">{children}</Base.List>
      <div className="gl-nav-menu__viewport-wrap"><Base.Viewport className="gl-pop gl-nav-menu__viewport" /></div>
    </Base.Root>
  );
}

export const NavigationMenuItem = Base.Item;
export const NavigationMenuContent = styled(Base.Content, 'gl-nav-menu__content');

export function NavigationMenuTrigger({ className, children, ...rest }: ComponentProps<typeof Base.Trigger>) {
  return (
    <Base.Trigger className={cx('gl-nav-menu__link', className)} {...rest}>
      {children}
      <ChevronDownIcon width={12} height={12} className="gl-nav-menu__chevron" />
    </Base.Trigger>
  );
}

export function NavigationMenuLink({ className, ...rest }: ComponentProps<typeof Base.Link>) {
  return <Base.Link className={cx('gl-nav-menu__link', className)} {...rest} />;
}

export interface NavigationMenuCardProps extends Omit<ComponentProps<typeof Base.Link>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
}

/** A link with a description, for use inside a flyout panel. */
export function NavigationMenuCard({ title, description, className, ...rest }: NavigationMenuCardProps) {
  return (
    <Base.Link className={cx('gl-nav-menu__card', className)} {...rest}>
      <span className="gl-nav-menu__card-title">{title}</span>
      {description != null && <span className="gl-nav-menu__card-desc">{description}</span>}
    </Base.Link>
  );
}
