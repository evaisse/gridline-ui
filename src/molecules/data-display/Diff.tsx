import { useMemo } from 'react';
import { Label } from '../../atoms';
import { cx } from '../../utils/cx';
import './Diff.css';

export type DiffOp = 'same' | 'add' | 'del';

export interface DiffLine {
  op: DiffOp;
  text: string;
  /** 1-based line number in `before`, when the line exists there. */
  oldNo?: number;
  /** 1-based line number in `after`, when the line exists there. */
  newNo?: number;
}

export interface DiffProps {
  /** The original text. */
  before: string;
  /** The changed text. */
  after: string;
  /** `unified` interleaves the lines; `split` puts the versions side by side. */
  view?: 'unified' | 'split';
  /** Heading shown above, for example a file name. */
  title?: string;
  className?: string;
}

/** Line diff by longest common subsequence. */
export function diffLines(before: string, after: string): DiffLine[] {
  const a = before === '' ? [] : before.split('\n');
  const b = after === '' ? [] : after.split('\n');
  const n = a.length;
  const m = b.length;
  const table: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ op: 'same', text: a[i], oldNo: i + 1, newNo: j + 1 }); i += 1; j += 1; }
    else if (table[i + 1][j] >= table[i][j + 1]) { out.push({ op: 'del', text: a[i], oldNo: i + 1 }); i += 1; }
    else { out.push({ op: 'add', text: b[j], newNo: j + 1 }); j += 1; }
  }
  while (i < n) { out.push({ op: 'del', text: a[i], oldNo: i + 1 }); i += 1; }
  while (j < m) { out.push({ op: 'add', text: b[j], newNo: j + 1 }); j += 1; }
  return out;
}

const SIGN: Record<DiffOp, string> = { same: ' ', add: '+', del: '-' };

/** Two versions of a text, unified or split, computed with a line-level LCS. */
export function Diff({ before, after, view = 'unified', title, className }: DiffProps) {
  const lines = useMemo(() => diffLines(before, after), [before, after]);
  const added = lines.filter((l) => l.op === 'add').length;
  const removed = lines.filter((l) => l.op === 'del').length;

  const rows = useMemo(() => {
    if (view === 'unified') return null;
    const pairs: Array<{ left?: DiffLine; right?: DiffLine }> = [];
    let k = 0;
    while (k < lines.length) {
      if (lines[k].op === 'same') { pairs.push({ left: lines[k], right: lines[k] }); k += 1; continue; }
      const dels: DiffLine[] = [];
      const adds: DiffLine[] = [];
      while (k < lines.length && lines[k].op !== 'same') { (lines[k].op === 'del' ? dels : adds).push(lines[k]); k += 1; }
      for (let r = 0; r < Math.max(dels.length, adds.length); r += 1) pairs.push({ left: dels[r], right: adds[r] });
    }
    return pairs;
  }, [lines, view]);

  const cell = (line: DiffLine | undefined, side: 'old' | 'new') => (
    <>
      <td className={cx('gl-diff__no', line && `gl-diff__no--${line.op}`)}>{line ? (side === 'old' ? line.oldNo : line.newNo) : ''}</td>
      <td className={cx('gl-diff__code', line ? `gl-diff__code--${line.op}` : 'gl-diff__code--empty')}>{line && <><span className="gl-diff__sign" aria-hidden="true">{SIGN[line.op]}</span>{line.text}</>}</td>
    </>
  );

  return (
    <figure className={cx('gl-diff', `gl-diff--${view}`, className)}>
      <figcaption className="gl-diff__head">
        {title != null && <span className="gl-diff__title">{title}</span>}
        <Label size="xs" className="gl-diff__stat gl-diff__stat--add">+{added}</Label>
        <Label size="xs" className="gl-diff__stat gl-diff__stat--del">-{removed}</Label>
      </figcaption>
      <div className="gl-diff__scroll" role="region" aria-label={title ? `Changes in ${title}` : 'Changes'} tabIndex={0}>
        <table className="gl-diff__table">
          <tbody>
            {lines.length === 0 && <tr><td className="gl-diff__code gl-diff__code--empty">No content</td></tr>}
            {view === 'unified'
              ? lines.map((line, index) => (
                <tr key={index}>
                  <td className={cx('gl-diff__no', `gl-diff__no--${line.op}`)}>{line.oldNo ?? ''}</td>
                  {cell(line, 'new')}
                </tr>
              ))
              : rows?.map((pair, index) => (
                <tr key={index}>
                  {cell(pair.left, 'old')}
                  {cell(pair.right, 'new')}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
