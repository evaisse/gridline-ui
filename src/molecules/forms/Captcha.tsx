import { useState, type FormEvent } from 'react';
import { RefreshIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import './Captcha.css';

export interface CaptchaProps {
  /** Called after each check with whether the answer was right. */
  onVerify?: (ok: boolean) => void;
  /** `math` asks for a sum; `text` asks for the characters drawn. */
  kind?: 'math' | 'text';
  className?: string;
}

interface Challenge { text: string; answer: string }

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const pick = (max: number) => Math.floor(Math.random() * max);

function make(kind: 'math' | 'text'): Challenge {
  if (kind === 'math') {
    const a = 2 + pick(8);
    const b = 2 + pick(8);
    return { text: `${a} + ${b}`, answer: String(a + b) };
  }
  const code = Array.from({ length: 5 }, () => ALPHABET[pick(ALPHABET.length)]).join('');
  return { text: code, answer: code };
}

/** A self-contained challenge drawn as SVG with line noise. It runs in the browser only and deters casual scripts; it is not a security boundary. */
export function Captcha({ onVerify, kind = 'math', className }: CaptchaProps) {
  const [challenge, setChallenge] = useState(() => make(kind));
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'idle' | 'ok' | 'wrong'>('idle');
  const [noise, setNoise] = useState(() => Array.from({ length: 4 }, () => [pick(160), pick(48), pick(160), pick(48)]));

  const refresh = () => {
    setChallenge(make(kind));
    setNoise(Array.from({ length: 4 }, () => [pick(160), pick(48), pick(160), pick(48)]));
    setAnswer('');
    setResult('idle');
    onVerify?.(false);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const ok = answer.trim().toUpperCase() === challenge.answer;
    setResult(ok ? 'ok' : 'wrong');
    onVerify?.(ok);
    if (!ok) setAnswer('');
  };

  return (
    <form className={cx('gl-captcha', result === 'ok' && 'gl-captcha--ok', result === 'wrong' && 'gl-captcha--wrong', className)} onSubmit={submit}>
      <div className="gl-captcha__row">
        <svg className="gl-captcha__image" viewBox="0 0 160 48" role="img" aria-label={kind === 'math' ? `Solve ${challenge.text}` : `Type the characters ${challenge.text.split('').join(' ')}`}>
          {noise.map((line, index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} />)}
          {challenge.text.split('').map((char, index, all) => (
            <text key={index} x={(160 / (all.length + 1)) * (index + 1)} y={32 + (index % 2 ? 3 : -3)} textAnchor="middle" transform={`rotate(${(index % 3 - 1) * 8} ${(160 / (all.length + 1)) * (index + 1)} 24)`}>{char}</text>
          ))}
        </svg>
        <button type="button" className="gl-captcha__refresh" aria-label="New challenge" title="New challenge" onClick={refresh}><RefreshIcon /></button>
      </div>
      <div className="gl-captcha__row">
        <input
          className="gl-captcha__input" aria-label={kind === 'math' ? 'Answer' : 'Characters shown'} autoComplete="off" inputMode={kind === 'math' ? 'numeric' : 'text'}
          value={answer} disabled={result === 'ok'} onChange={(event) => setAnswer(event.target.value)}
        />
        <button type="submit" className="gl-captcha__submit" disabled={result === 'ok' || answer === ''}>Verify</button>
      </div>
      <p className="gl-captcha__status" role="status">{result === 'ok' ? 'Verified' : result === 'wrong' ? 'Not quite. Try again.' : 'Prove you are not a script'}</p>
    </form>
  );
}
