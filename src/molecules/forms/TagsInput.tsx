import { useState, type KeyboardEvent } from 'react';
import { Tag } from '../../atoms';
import { XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './TagsInput.css';

export interface TagsInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  /** Stop accepting entries once this many are present. */
  max?: number;
  'aria-label'?: string;
  id?: string;
  className?: string;
}

/** A field that turns each entry into a tag. Enter or a comma adds; Backspace removes the last one. */
export function TagsInput({ value, defaultValue = [], onChange, placeholder = 'Add…', max = Infinity, className, ...rest }: TagsInputProps) {
  const [tags, setTags] = useControlled(value, defaultValue, onChange);
  const [draft, setDraft] = useState('');
  const full = tags.length >= max;

  const add = () => {
    const next = draft.trim();
    if (next !== '' && !tags.includes(next) && !full) setTags([...tags, next]);
    setDraft('');
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); add(); }
    else if (event.key === 'Backspace' && draft === '' && tags.length > 0) setTags(tags.slice(0, -1));
  };

  return (
    <div className={cx('gl-tags-input', className)}>
      {tags.map((tag) => (
        <Tag key={tag}>
          {tag}
          <button type="button" className="gl-tags-input__remove" aria-label={`Remove ${tag}`} onClick={() => setTags(tags.filter((entry) => entry !== tag))}><XIcon width={10} height={10} /></button>
        </Tag>
      ))}
      <input className="gl-tags-input__control" value={draft} placeholder={full ? '' : placeholder} disabled={full} onChange={(event) => setDraft(event.target.value)} onKeyDown={onKeyDown} onBlur={add} {...rest} />
    </div>
  );
}
