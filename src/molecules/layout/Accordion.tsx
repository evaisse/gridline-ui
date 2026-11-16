import { Accordion as Base } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';
import { ChevronDownIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { styled } from '../../utils/styled';
import './Accordion.css';

export const Accordion = styled(Base.Root, 'gl-accordion');
export const AccordionItem = styled(Base.Item, 'gl-accordion__item');

export function AccordionTrigger({ className, children, ...rest }: ComponentProps<typeof Base.Trigger>) {
  return (
    <Base.Header className="gl-accordion__header">
      <Base.Trigger className={cx('gl-accordion__trigger', className)} {...rest}>
        <span>{children}</span>
        <ChevronDownIcon className="gl-accordion__chevron" />
      </Base.Trigger>
    </Base.Header>
  );
}

export function AccordionContent({ className, children, ...rest }: ComponentProps<typeof Base.Content> & { children: ReactNode }) {
  return (
    <Base.Content className={cx('gl-accordion__content', className)} {...rest}>
      <div className="gl-accordion__body">{children}</div>
    </Base.Content>
  );
}
