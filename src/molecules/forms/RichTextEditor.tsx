import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { BoldIcon, ItalicIcon, LinkIcon, ListIcon, RedoIcon, UnderlineIcon, UndoIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './RichTextEditor.css';

export interface RichTextEditorProps {
  /** The content as an HTML string. */
  value?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
  /** Accessible name of the editing surface. */
  'aria-label'?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

type Command = 'bold' | 'italic' | 'underline' | 'insertUnorderedList';

const COMMANDS: Array<{ command: Command; label: string; icon: ReactNode }> = [
  { command: 'bold', label: 'Bold', icon: <BoldIcon /> },
  { command: 'italic', label: 'Italic', icon: <ItalicIcon /> },
  { command: 'underline', label: 'Underline', icon: <UnderlineIcon /> },
  { command: 'insertUnorderedList', label: 'Bulleted list', icon: <ListIcon /> },
];

/**
 * A lightweight rich text field: a contentEditable surface with a ruled toolbar built on `document.execCommand`.
 * It is not a document-model editor: the value is the browser's HTML, with no schema, collaboration or plugins.
 */
export function RichTextEditor({ value, defaultValue = '', onChange, 'aria-label': ariaLabel = 'Rich text', placeholder, disabled, className }: RichTextEditorProps) {
  const [html, setHtml] = useControlled(value, defaultValue, onChange);
  const surface = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const node = surface.current;
    if (node && node.innerHTML !== html) node.innerHTML = html;
  }, [html]);

  useEffect(() => {
    const update = () => {
      const node = surface.current;
      if (!node || !node.contains(document.getSelection()?.anchorNode ?? null)) return;
      setActive(Object.fromEntries(COMMANDS.map(({ command }) => [command, document.queryCommandState(command)])));
    };
    document.addEventListener('selectionchange', update);
    return () => document.removeEventListener('selectionchange', update);
  }, []);

  const run = (command: string, arg?: string) => {
    surface.current?.focus();
    document.execCommand(command, false, arg);
    if (surface.current) setHtml(surface.current.innerHTML);
  };
  const link = () => {
    const url = window.prompt('Link address', 'https://');
    if (url) run('createLink', url);
  };
  // Keep the text selection when a toolbar button is pressed.
  const keep = (event: MouseEvent) => event.preventDefault();

  return (
    <div className={cx('gl-rich-text-editor', disabled && 'gl-rich-text-editor--disabled', className)}>
      <div role="toolbar" aria-label="Formatting" className="gl-rich-text-editor__toolbar">
        {COMMANDS.map(({ command, label, icon }) => (
          <button key={command} type="button" aria-label={label} title={label} aria-pressed={!!active[command]} disabled={disabled} onMouseDown={keep} onClick={() => run(command)}>{icon}</button>
        ))}
        <button type="button" aria-label="Link" title="Link" disabled={disabled} onMouseDown={keep} onClick={link}><LinkIcon /></button>
        <span className="gl-rich-text-editor__spacer" />
        <button type="button" aria-label="Undo" title="Undo" disabled={disabled} onMouseDown={keep} onClick={() => run('undo')}><UndoIcon /></button>
        <button type="button" aria-label="Redo" title="Redo" disabled={disabled} onMouseDown={keep} onClick={() => run('redo')}><RedoIcon /></button>
      </div>
      <div
        ref={surface} role="textbox" aria-multiline="true" aria-label={ariaLabel} aria-disabled={disabled || undefined} data-placeholder={placeholder}
        contentEditable={!disabled} suppressContentEditableWarning className="gl-rich-text-editor__surface" data-empty={html === '' || html === '<br>' || undefined}
        onInput={(event) => setHtml(event.currentTarget.innerHTML)}
      />
    </div>
  );
}
