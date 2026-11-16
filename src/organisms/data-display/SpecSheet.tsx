import type { ReactNode } from 'react';
import { KeyValue } from '../../molecules';
import { cx } from '../../utils/cx';
import './SpecSheet.css';

export interface Spec {
  label: string;
  value: ReactNode;
}

export interface SpecSheetProps {
  specs: Spec[];
  columns?: 1 | 2 | 3;
  className?: string;
}

/** A block of key–value facts, set in columns. */
export function SpecSheet({ specs, columns = 2, className }: SpecSheetProps) {
  return (
    <div className={cx('gl-spec-sheet', className)} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {specs.map((spec) => (
        <KeyValue key={spec.label} label={spec.label}>{spec.value}</KeyValue>
      ))}
    </div>
  );
}
