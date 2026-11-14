import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../atoms';
import { CheckIcon, SortIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './Command';
import './Combobox.css';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  'aria-label'?: string;
  className?: string;
}

/** A select you can type into: a popover holding a filterable command list. */
export function Combobox({ options, value, onValueChange, placeholder = 'Select', searchPlaceholder = 'Search', emptyText = 'No match', className, ...rest }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const current = options.find((option) => option.value === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger role="combobox" aria-expanded={open} aria-label={rest['aria-label']} className={cx('gl-combobox', !current && 'gl-combobox--empty', className)}>
        <span>{current?.label ?? placeholder}</span>
        <SortIcon />
      </PopoverTrigger>
      <PopoverContent className="gl-combobox__pop">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => {
                  onValueChange?.(option.value === value ? '' : option.value);
                  setOpen(false);
                }}
                hint={option.value === value ? <CheckIcon width={12} height={12} /> : undefined}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
