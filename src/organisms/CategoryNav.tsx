import type { ReactNode } from 'react';
import { NavItem } from '../molecules';
import { cx } from '../utils/cx';
import './CategoryNav.css';

export interface Category {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

export interface CategoryNavProps {
  categories: Category[];
  value?: string;
  onChange?: (id: string) => void;
  label?: string;
  className?: string;
}

/** A ruled sidebar of categories. */
export function CategoryNav({ categories, value, onChange, label = 'Categories', className }: CategoryNavProps) {
  return (
    <nav aria-label={label} className={cx('gl-category-nav', className)}>
      {categories.map((category) => (
        <NavItem
          key={category.id}
          icon={category.icon}
          count={category.count}
          selected={category.id === value}
          onClick={() => onChange?.(category.id)}
        >
          {category.label}
        </NavItem>
      ))}
    </nav>
  );
}
