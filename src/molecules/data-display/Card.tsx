import type { HTMLAttributes, ReactNode } from 'react';
import { Heading, Label, Text } from '../../atoms';
import { cx } from '../../utils/cx';
import { styled } from '../../utils/styled';
import './Card.css';

/** A ruled box. In a Grid, prefer a bare Cell: the grid already draws the rules. */
export const Card = styled('article', 'gl-card');
export const CardContent = styled('div', 'gl-card__content');
export const CardFooter = styled('footer', 'gl-card__footer');

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Controls on the right of the header. */
  action?: ReactNode;
}

export function CardHeader({ eyebrow, title, description, action, className, children, ...rest }: CardHeaderProps) {
  return (
    <header className={cx('gl-card__header', className)} {...rest}>
      <div className="gl-card__heading">
        {eyebrow != null && <Label>{eyebrow}</Label>}
        {title != null && <Heading level={3} size="md">{title}</Heading>}
        {description != null && <Text variant="small" tone="muted">{description}</Text>}
        {children}
      </div>
      {action != null && <div className="gl-card__action">{action}</div>}
    </header>
  );
}
