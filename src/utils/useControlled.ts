import { useCallback, useState } from 'react';

/** State that is owned by the parent when `value` is given, and by the component otherwise. */
export function useControlled<T>(value: T | undefined, defaultValue: T, onChange?: (next: T) => void): [T, (next: T) => void] {
  const [inner, setInner] = useState(defaultValue);
  const current = value === undefined ? inner : value;
  const set = useCallback((next: T) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  }, [value, onChange]);
  return [current, set];
}
