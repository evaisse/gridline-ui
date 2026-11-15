import { useEffect, useState } from 'react';
import { Button, type ButtonProps } from '../atoms';
import { CheckIcon, CopyIcon } from '../tokens/icons';

export interface CopyButtonProps extends Omit<ButtonProps, 'icon' | 'onClick'> {
  /** The text placed on the clipboard. */
  value: string;
  /** Label once copied. */
  copiedLabel?: string;
}

/** Copies a string and confirms for two seconds. */
export function CopyButton({ value, copiedLabel = 'Copied', children = 'Copy', ...rest }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button icon={copied ? <CheckIcon /> : <CopyIcon />} onClick={() => { void navigator.clipboard?.writeText(value); setCopied(true); }} {...rest}>
      <span aria-live="polite">{copied ? copiedLabel : children}</span>
    </Button>
  );
}
