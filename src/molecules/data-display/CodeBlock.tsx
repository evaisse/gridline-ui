import { useState, type HTMLAttributes } from 'react';
import { Button, Label } from '../../atoms';
import { CheckIcon, CopyIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './CodeBlock.css';

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
  /** A filename or language shown in the header. */
  title?: string;
  lineNumbers?: boolean;
  /** Tint lines starting with + or - as additions and removals. */
  diff?: boolean;
  copyable?: boolean;
}

/** Code, terminal output or a diff. No syntax colouring: structure, not rainbow. */
export function CodeBlock({ code, title, lineNumbers = false, diff = false, copyable = true, className, ...rest }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, '').split('\n');

  const copy = () => {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cx('gl-codeblock', className)} {...rest}>
      {(title || copyable) && (
        <div className="gl-codeblock__header">
          <Label>{title}</Label>
          {copyable && <Button variant="ghost" size="sm" icon={copied ? <CheckIcon /> : <CopyIcon />} onClick={copy} aria-label="Copy code">{copied ? 'Copied' : 'Copy'}</Button>}
        </div>
      )}
      <pre className="gl-codeblock__pre" tabIndex={0}>
        <code>
          {lines.map((line, i) => (
            <span key={i} className="gl-codeblock__line" data-diff={diff ? (line.startsWith('+') ? 'add' : line.startsWith('-') ? 'del' : undefined) : undefined}>
              {lineNumbers && <span className="gl-codeblock__no" aria-hidden="true">{i + 1}</span>}
              <span>{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
