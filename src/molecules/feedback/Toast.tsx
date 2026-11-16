import { Toast as Base } from 'radix-ui';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Button, Label } from '../../atoms';
import { XIcon } from '../../tokens/icons';
import type { Tone } from '../../tokens/tone';
import { cx } from '../../utils/cx';
import './Toast.css';

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: Tone;
  /** Milliseconds before it closes. */
  duration?: number;
}

interface ToastEntry extends ToastOptions {
  id: number;
}

const ToastContext = createContext<((options: ToastOptions) => void) | null>(null);

/** Returns `toast(options)`. Must be used under a Toaster. */
export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error('useToast must be used inside <Toaster>.');
  return toast;
}

/** Hosts the toast stack. Wrap the app, or a story, once. */
export function Toaster({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ToastEntry[]>([]);
  const toast = useCallback((options: ToastOptions) => {
    setEntries((current) => [...current, { ...options, id: Date.now() + Math.random() }]);
  }, []);
  const remove = useCallback((id: number) => setEntries((current) => current.filter((entry) => entry.id !== id)), []);
  const value = useMemo(() => toast, [toast]);

  return (
    <ToastContext.Provider value={value}>
      <Base.Provider swipeDirection="right">
        {children}
        {entries.map((entry) => (
          <Base.Root key={entry.id} duration={entry.duration ?? 5000} className={cx('gl-toast', `gl-tone--${entry.tone ?? 'neutral'}`)} onOpenChange={(open) => !open && remove(entry.id)}>
            <div className="gl-toast__body">
              <Base.Title asChild><Label tone="ink">{entry.title}</Label></Base.Title>
              {entry.description && <Base.Description className="gl-toast__desc">{entry.description}</Base.Description>}
            </div>
            <Base.Close asChild><Button variant="ghost" size="sm" icon={<XIcon />} aria-label="Dismiss" /></Base.Close>
          </Base.Root>
        ))}
        <Base.Viewport className="gl-toast-viewport" />
      </Base.Provider>
    </ToastContext.Provider>
  );
}
