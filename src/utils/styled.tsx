import { createElement, type ComponentProps, type ElementType } from 'react';
import { cx } from './cx';

/**
 * Binds a base class to a component or tag. Used to dress headless parts
 * (Radix, cmdk…) without writing a wrapper function for each one.
 */
export function styled<T extends ElementType>(component: T, base: string) {
  function Styled(props: ComponentProps<T>) {
    const { className, ...rest } = props as { className?: string };
    return createElement(component, { ...rest, className: cx(base, className) });
  }
  Styled.displayName = base;
  return Styled;
}
