import { useState, type KeyboardEvent } from 'react';
import { IconButton, Input, Textarea } from '../../atoms';
import { CheckIcon, PencilIcon, XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Editable.css';

export interface EditableProps {
  /** The committed text. */
  value?: string;
  defaultValue?: string;
  /** Called when an edit is committed, not on each keystroke. */
  onChange?: (value: string) => void;
  /** Shown when the text is empty. */
  placeholder?: string;
  /** Edit in a textarea; Enter adds a line and Ctrl or Cmd + Enter commits. */
  multiline?: boolean;
  /** Show confirm and cancel buttons while editing. */
  showControls?: boolean;
  /** Commit when focus leaves the field. Otherwise leaving cancels. */
  commitOnBlur?: boolean;
  disabled?: boolean;
  /** Accessible name of the text and of the field. */
  'aria-label': string;
  className?: string;
}

/** Text that turns into a field when clicked. Enter commits, Escape cancels. */
export function Editable({ value, defaultValue = '', onChange, placeholder = 'Click to edit', multiline = false, showControls = false, commitOnBlur = true, disabled, className, 'aria-label': ariaLabel }: EditableProps) {
  const [text, setText] = useControlled(value, defaultValue, onChange);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  const begin = () => { if (disabled) return; setDraft(text); setEditing(true); };
  const commit = () => { setEditing(false); if (draft !== text) setText(draft); };
  const cancel = () => setEditing(false);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Escape') { event.preventDefault(); cancel(); }
    else if (event.key === 'Enter' && (!multiline || event.ctrlKey || event.metaKey)) { event.preventDefault(); commit(); }
  };
  const onBlur = (event: React.FocusEvent) => {
    if (event.relatedTarget instanceof Element && event.currentTarget.closest('.gl-editable--editing')?.contains(event.relatedTarget)) return;
    if (commitOnBlur) commit(); else cancel();
  };

  if (!editing) {
    return (
      <button type="button" className={cx('gl-editable', 'gl-editable--display', text === '' && 'gl-editable--empty', className)} disabled={disabled} aria-label={`${ariaLabel}: ${text === '' ? 'empty' : text}. Edit`} onClick={begin}>
        <span className="gl-editable__text">{text === '' ? placeholder : text}</span>
        <PencilIcon width={12} height={12} className="gl-editable__hint" aria-hidden="true" />
      </button>
    );
  }

  const shared = {
    value: draft,
    autoFocus: true,
    'aria-label': ariaLabel,
    onFocus: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => event.currentTarget.select(),
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(event.target.value),
    onKeyDown,
    onBlur,
    placeholder,
  };

  return (
    <div className={cx('gl-editable', 'gl-editable--editing', className)}>
      {multiline ? <Textarea rows={3} {...shared} /> : <Input {...shared} />}
      {showControls && (
        <span className="gl-editable__controls">
          <IconButton size="sm" label="Confirm" icon={<CheckIcon />} onClick={commit} />
          <IconButton size="sm" label="Cancel" icon={<XIcon />} onClick={cancel} />
        </span>
      )}
    </div>
  );
}
