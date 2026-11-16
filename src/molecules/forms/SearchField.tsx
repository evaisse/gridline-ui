import { Input, type InputProps } from '../../atoms';

export type SearchFieldProps = Omit<InputProps, 'type' | 'leading'>;

/** A search input sized to fill a ruled cell. */
export function SearchField({ placeholder = 'Search', variant = 'cell', ...rest }: SearchFieldProps) {
  return <Input type="search" leading="⌕" placeholder={placeholder} variant={variant} aria-label={rest['aria-label'] ?? placeholder} {...rest} />;
}
