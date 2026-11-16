import { useEffect, useId, useRef, useState, type ChangeEvent, type KeyboardEvent, type SyntheticEvent } from 'react';
import { Popover, PopoverAnchor, PopoverContent, Textarea } from '../../atoms';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Mentions.css';

export interface MentionOption {
  /** Inserted after the trigger character, for example `ada` gives `@ada`. */
  value: string;
  label: string;
  description?: string;
}

export interface MentionsProps {
  options: MentionOption[];
  /** The plain text, mentions included as `@value`. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Characters that open the suggestions. */
  triggers?: string[];
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

interface Match { trigger: string; start: number; query: string }

function findMatch(text: string, caret: number, triggers: string[]): Match | null {
  for (let i = caret - 1; i >= 0; i -= 1) {
    const char = text[i];
    if (/\s/.test(char)) return null;
    if (triggers.includes(char) && (i === 0 || /\s/.test(text[i - 1]))) return { trigger: char, start: i, query: text.slice(i + 1, caret) };
  }
  return null;
}

/** A text field that suggests people or things after a trigger character. Mentions stay plain text; there is no rich-text model. */
export function Mentions({ options, value, defaultValue = '', onChange, triggers = ['@'], placeholder, rows = 3, disabled, className, 'aria-label': ariaLabel }: MentionsProps) {
  const [text, setText] = useControlled(value, defaultValue, onChange);
  const [match, setMatch] = useState<Match | null>(null);
  const [index, setIndex] = useState(0);
  const field = useRef<HTMLTextAreaElement>(null);
  const caretTo = useRef<number | null>(null);
  const listId = useId();

  const query = match?.query.toLowerCase() ?? '';
  const shown = match ? options.filter((option) => option.value.toLowerCase().includes(query) || option.label.toLowerCase().includes(query)) : [];
  const open = match !== null && shown.length > 0;

  useEffect(() => {
    if (caretTo.current === null || !field.current) return;
    field.current.setSelectionRange(caretTo.current, caretTo.current);
    caretTo.current = null;
  });

  const sync = (target: HTMLTextAreaElement) => {
    const next = findMatch(target.value, target.selectionStart, triggers);
    setMatch(next);
    if (next?.query !== match?.query) setIndex(0);
  };
  const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => { setText(event.target.value); sync(event.target); };
  const onSelect = (event: SyntheticEvent<HTMLTextAreaElement>) => sync(event.currentTarget);

  const insert = (option: MentionOption) => {
    if (!match) return;
    const caret = match.start + 1 + match.query.length;
    const insertion = `${match.trigger}${option.value} `;
    setText(text.slice(0, match.start) + insertion + text.slice(caret));
    caretTo.current = match.start + insertion.length;
    setMatch(null);
    field.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!open) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); setIndex((index + 1) % shown.length); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setIndex((index - 1 + shown.length) % shown.length); }
    else if (event.key === 'Enter' || event.key === 'Tab') { event.preventDefault(); insert(shown[index]); }
    else if (event.key === 'Escape') { event.preventDefault(); setMatch(null); }
  };

  return (
    <Popover open={open}>
      <PopoverAnchor asChild>
        <div className={cx('gl-mentions', className)}>
          <Textarea
            ref={field}
            rows={rows}
            value={text}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={ariaLabel}
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls={open ? listId : undefined}
            aria-activedescendant={open ? `${listId}-${index}` : undefined}
            onChange={onTextChange}
            onSelect={onSelect}
            onKeyDown={onKeyDown}
            onBlur={() => setMatch(null)}
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="gl-mentions__panel"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <div id={listId} role="listbox" aria-label="Suggestions">
          {shown.map((option, position) => (
            <div
              key={option.value}
              id={`${listId}-${position}`}
              role="option"
              aria-selected={position === index}
              className="gl-mentions__option"
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setIndex(position)}
              onClick={() => insert(option)}
            >
              <span>{option.label}</span>
              {option.description && <span className="gl-mentions__description">{option.description}</span>}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
