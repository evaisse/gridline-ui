import { useState } from 'react';
import { Button, Label } from '../../atoms';
import { Alert } from '../../molecules';
import { CheckIcon, XIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './SmartPaste.css';

export type SmartPasteValues = Record<string, string>;

export interface SmartPasteProps {
  /** Turns pasted text into field values. Supplied by the caller (a parser, or a call to a model); this component makes no model call. */
  extract: (text: string) => SmartPasteValues | Promise<SmartPasteValues>;
  /** Called with the proposed values once the user confirms them. */
  onApply?: (values: SmartPasteValues) => void;
  /** Text to use instead of reading the clipboard, e.g. in stories or tests. */
  text?: string;
  /** Maps a value key to the label shown in the confirmation list. */
  labels?: Record<string, string>;
  /** Proposal shown on first render, before anything is pasted. */
  defaultProposal?: SmartPasteValues;
  label?: string;
  className?: string;
}

/** A button that reads the clipboard, asks `extract` for field values and shows them for confirmation. */
export function SmartPaste({ extract, onApply, text, labels, defaultProposal, label = 'Smart paste', className }: SmartPasteProps) {
  const [proposal, setProposal] = useState<SmartPasteValues | null>(defaultProposal ?? null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paste = async () => {
    setBusy(true);
    setError(null);
    try {
      const source = text ?? await navigator.clipboard.readText();
      if (!source.trim()) { setError('The clipboard is empty'); return; }
      const values = await extract(source);
      if (Object.keys(values).length === 0) setError('Nothing could be extracted from that text');
      else setProposal(values);
    } catch {
      setError('Could not read the clipboard. Allow clipboard access and try again.');
    } finally {
      setBusy(false);
    }
  };

  const apply = () => { if (proposal) onApply?.(proposal); setProposal(null); };

  return (
    <div className={cx('gl-smart-paste', className)}>
      <div className="gl-smart-paste__bar">
        <Button disabled={busy} onClick={paste}>{busy ? 'Reading' : label}</Button>
        <Label>Fills the form from the clipboard</Label>
      </div>
      {error != null && <Alert tone="neg" title={error} />}
      {proposal != null && (
        <div className="gl-smart-paste__proposal" role="group" aria-label="Proposed values">
          <dl className="gl-smart-paste__list">
            {Object.entries(proposal).map(([key, value]) => (
              <div key={key} className="gl-smart-paste__row">
                <dt><Label>{labels?.[key] ?? key}</Label></dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="gl-smart-paste__actions">
            <Button size="sm" icon={<XIcon />} onClick={() => setProposal(null)}>Discard</Button>
            <Button size="sm" variant="solid" icon={<CheckIcon />} onClick={apply}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
}
