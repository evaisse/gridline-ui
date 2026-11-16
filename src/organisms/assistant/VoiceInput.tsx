import { useEffect, useRef, useState } from 'react';
import { Button, Label } from '../../atoms';
import { MicIcon, StopIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './VoiceInput.css';

interface RecognitionResult { isFinal: boolean; 0: { transcript: string } }
interface RecognitionEvent { resultIndex: number; results: ArrayLike<RecognitionResult> }
interface Recognition {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null; onend: (() => void) | null; onerror: (() => void) | null;
  start: () => void; stop: () => void;
}
type RecognitionCtor = new () => Recognition;

const getCtor = (): RecognitionCtor | undefined => {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
};

export interface VoiceInputProps {
  /** Whether dictation is running. Controlled; pair with `onListeningChange`. */
  listening?: boolean;
  defaultListening?: boolean;
  onListeningChange?: (listening: boolean) => void;
  /** Called with each finished phrase. */
  onTranscript?: (text: string) => void;
  /** Text shown while speech is still being recognised (interim result). Stories can set it directly. */
  interim?: string;
  /** Language tag such as `en-GB`. */
  lang?: string;
  /** Overrides browser detection; `false` shows the unsupported state. */
  supported?: boolean;
  className?: string;
}

/** Dictation button using the browser's SpeechRecognition API; disabled with a message where it is missing. */
export function VoiceInput({ listening, defaultListening = false, onListeningChange, onTranscript, interim, lang = 'en-US', supported, className }: VoiceInputProps) {
  const [on, setOn] = useControlled(listening, defaultListening, onListeningChange);
  const [heard, setHeard] = useState('');
  const available = supported ?? getCtor() !== undefined;
  const latest = useRef({ setOn, onTranscript });
  useEffect(() => { latest.current = { setOn, onTranscript }; });

  useEffect(() => {
    const Ctor = getCtor();
    if (!on || !available || !Ctor) return;
    const rec = new Ctor();
    rec.lang = lang; rec.continuous = true; rec.interimResults = true;
    rec.onresult = (event) => {
      let partial = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (result.isFinal) { latest.current.onTranscript?.(result[0].transcript.trim()); setHeard(''); } else partial += result[0].transcript;
      }
      if (partial) setHeard(partial);
    };
    rec.onend = () => latest.current.setOn(false);
    rec.onerror = () => latest.current.setOn(false);
    rec.start();
    return () => { rec.onend = null; rec.onerror = null; rec.stop(); setHeard(''); };
  }, [on, available, lang]);

  const text = interim ?? heard;
  return (
    <div className={cx('gl-voice-input', on && 'gl-voice-input--on', className)}>
      <Button
        variant={on ? 'solid' : 'ruled'}
        disabled={!available}
        aria-pressed={on}
        icon={on ? <StopIcon /> : <MicIcon />}
        onClick={() => setOn(!on)}
      >
        {on ? 'Stop dictation' : 'Start dictation'}
      </Button>
      <div className="gl-voice-input__status" role="status" aria-live="polite">
        {!available
          ? <Label>Speech recognition is not available in this browser</Label>
          : on
            ? <><span className="gl-voice-input__dot" aria-hidden="true" /><span className="gl-voice-input__text">{text || 'Listening'}</span></>
            : <Label>Microphone off</Label>}
      </div>
    </div>
  );
}
