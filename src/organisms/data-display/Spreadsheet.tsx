import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Spreadsheet.css';

export interface SpreadsheetProps {
  /** Raw inputs by cell id (`A1`). A leading `=` makes a formula. */
  cells?: Record<string, string>;
  defaultCells?: Record<string, string>;
  onCellsChange?: (cells: Record<string, string>) => void;
  /** Number of columns, 1 to 26. */
  columns?: number;
  rows?: number;
  'aria-label'?: string;
  className?: string;
}

type Value = number | string;
type Range = number[] & { range?: true };

const colName = (c: number) => String.fromCharCode(65 + c);
const parseRef = (ref: string) => { const m = /^([A-Z])(\d+)$/.exec(ref.toUpperCase()); return m ? { c: m[1].charCodeAt(0) - 65, r: Number(m[2]) - 1 } : null; };
const idOf = (c: number, r: number) => `${colName(c)}${r + 1}`;
const TOKEN = /\s*(\d+\.?\d*|[A-Za-z]+\d+|[A-Za-z]+|[-+*/():,])/y;

/** Evaluates every cell of a sheet: numbers, text, and formulas with references, ranges, + - * /, SUM, AVERAGE, MIN, MAX, COUNT. Errors are `#CYCLE`, `#DIV/0!`, `#REF!` and `#ERR!`. */
function evaluateSheet(cells: Record<string, string>): (id: string) => Value {
  const cache = new Map<string, Value>();
  const errors = new Map<string, string>();
  const running = new Set<string>();

  const compute = (id: string): Value => {
    const failed = errors.get(id);
    if (failed) throw new Error(failed);
    const hit = cache.get(id);
    if (hit !== undefined) return hit;
    const raw = (cells[id] ?? '').trim();
    let result: Value;
    if (!raw.startsWith('=')) result = raw !== '' && !Number.isNaN(Number(raw)) ? Number(raw) : (cells[id] ?? '');
    else {
      if (running.has(id)) throw new Error('#CYCLE');
      running.add(id);
      try { result = formula(raw.slice(1)); } catch (error) { const code = error instanceof Error && error.message.startsWith('#') ? error.message : '#ERR!'; errors.set(id, code); throw new Error(code, { cause: error }); } finally { running.delete(id); }
    }
    cache.set(id, result);
    return result;
  };

  const numberAt = (id: string) => { const v = compute(id); return typeof v === 'number' ? v : 0; };

  const formula = (source: string): Value => {
    const tokens: string[] = [];
    TOKEN.lastIndex = 0;
    let pos = 0;
    while (pos < source.trimEnd().length) {
      TOKEN.lastIndex = pos;
      const m = TOKEN.exec(source);
      if (!m) throw new Error('#ERR!');
      tokens.push(m[1]); pos = TOKEN.lastIndex;
    }
    let i = 0;
    const peek = () => tokens[i];
    const take = () => tokens[i++];
    const scalar = (v: number | Range) => { if (typeof v !== 'number') throw new Error('#ERR!'); return v; };

    const expr = (): number | Range => {
      let left = term();
      while (peek() === '+' || peek() === '-') { const op = take(); const right = scalar(term()); left = op === '+' ? scalar(left) + right : scalar(left) - right; }
      return left;
    };
    const term = (): number | Range => {
      let left = unary();
      while (peek() === '*' || peek() === '/') {
        const op = take(); const right = scalar(unary());
        if (op === '/' && right === 0) throw new Error('#DIV/0!');
        left = op === '*' ? scalar(left) * right : scalar(left) / right;
      }
      return left;
    };
    const unary = (): number | Range => { if (peek() === '-') { take(); return -scalar(unary()); } return primary(); };
    const primary = (): number | Range => {
      const t = take();
      if (t === undefined) throw new Error('#ERR!');
      if (t === '(') { const v = expr(); if (take() !== ')') throw new Error('#ERR!'); return v; }
      if (/^\d/.test(t)) return Number(t);
      if (/^[A-Za-z]+\d+$/.test(t)) {
        const a = parseRef(t); if (!a) throw new Error('#REF!');
        if (peek() !== ':') return numberAt(idOf(a.c, a.r));
        take();
        const b = parseRef(take() ?? ''); if (!b) throw new Error('#REF!');
        const out: number[] = [];
        for (let r = Math.min(a.r, b.r); r <= Math.max(a.r, b.r); r++) for (let c = Math.min(a.c, b.c); c <= Math.max(a.c, b.c); c++) { const v = compute(idOf(c, r)); if (typeof v === 'number') out.push(v); }
        return out;
      }
      if (/^[A-Za-z]+$/.test(t) && peek() === '(') {
        take();
        const nums: number[] = [];
        if (peek() !== ')') for (;;) { const v = expr(); if (typeof v === 'number') nums.push(v); else nums.push(...v); if (peek() === ',') take(); else break; }
        if (take() !== ')') throw new Error('#ERR!');
        switch (t.toUpperCase()) {
          case 'SUM': return nums.reduce((a, b) => a + b, 0);
          case 'AVERAGE': if (nums.length === 0) throw new Error('#DIV/0!'); return nums.reduce((a, b) => a + b, 0) / nums.length;
          case 'MIN': return nums.length ? Math.min(...nums) : 0;
          case 'MAX': return nums.length ? Math.max(...nums) : 0;
          case 'COUNT': return nums.length;
          default: throw new Error('#ERR!');
        }
      }
      throw new Error('#ERR!');
    };
    const result = expr();
    if (i < tokens.length) throw new Error('#ERR!');
    return scalar(result);
  };

  return (id) => { try { return compute(id); } catch (error) { return error instanceof Error && error.message.startsWith('#') ? error.message : '#ERR!'; } };
}

const show = (v: Value) => (typeof v === 'number' ? String(Math.round(v * 1e10) / 1e10) : v);

/** An editable grid with a formula bar. Arrow keys move, Enter or typing edits, formulas support references, ranges, arithmetic and SUM, AVERAGE, MIN, MAX, COUNT. */
export function Spreadsheet({ cells, defaultCells = {}, onCellsChange, columns = 8, rows = 12, className, 'aria-label': ariaLabel = 'Spreadsheet' }: SpreadsheetProps) {
  const [data, setData] = useControlled(cells, defaultCells, onCellsChange);
  const [sel, setSel] = useState({ c: 0, r: 0 });
  const [draft, setDraft] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const skipBlur = useRef(false);
  const edit = (value: string) => { skipBlur.current = false; setDraft(value); };
  const blur = () => { if (skipBlur.current) { skipBlur.current = false; return; } commit(0, 0); };
  const cols = Math.min(26, Math.max(1, columns));
  const read = useMemo(() => evaluateSheet(data), [data]);
  const selId = idOf(sel.c, sel.r);

  const move = (dc: number, dr: number) => setSel((s) => ({ c: Math.min(cols - 1, Math.max(0, s.c + dc)), r: Math.min(rows - 1, Math.max(0, s.r + dr)) }));
  const commit = (dc: number, dr: number) => {
    skipBlur.current = true;
    if (draft !== null) {
      const next = { ...data };
      if (draft === '') delete next[selId]; else next[selId] = draft;
      setData(next);
    }
    setDraft(null); move(dc, dr); gridRef.current?.focus();
  };
  const cancel = () => { skipBlur.current = true; setDraft(null); gridRef.current?.focus(); };

  const onGridKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.ctrlKey || event.metaKey) return;
    const arrows: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
    if (arrows[event.key]) { event.preventDefault(); move(...arrows[event.key]); }
    else if (event.key === 'Tab') { if (!event.shiftKey && sel.c < cols - 1) { event.preventDefault(); move(1, 0); } else if (event.shiftKey && sel.c > 0) { event.preventDefault(); move(-1, 0); } }
    else if (event.key === 'Enter' || event.key === 'F2') { event.preventDefault(); edit(data[selId] ?? ''); }
    else if (event.key === 'Delete' || event.key === 'Backspace') { event.preventDefault(); const next = { ...data }; delete next[selId]; setData(next); }
    else if (event.key.length === 1) { event.preventDefault(); edit(event.key); }
  };
  const onEditKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') { event.preventDefault(); commit(0, 1); }
    else if (event.key === 'Tab') { event.preventDefault(); commit(event.shiftKey ? -1 : 1, 0); }
    else if (event.key === 'Escape') { event.preventDefault(); cancel(); }
  };

  return (
    <div className={cx('gl-spreadsheet', className)}>
      <div className="gl-spreadsheet__bar">
        <span className="gl-spreadsheet__name">{selId}</span>
        <span className="gl-spreadsheet__fx" aria-hidden="true">fx</span>
        <input
          className="gl-spreadsheet__formula" aria-label={`Formula bar, cell ${selId}`} value={draft ?? data[selId] ?? ''} spellCheck={false}
          onChange={(event) => edit(event.target.value)} onKeyDown={onEditKey} onBlur={() => { if (draft !== null) blur(); }}
        />
      </div>
      <div className="gl-spreadsheet__scroll">
        <div ref={gridRef} role="grid" tabIndex={0} aria-label={ariaLabel} aria-rowcount={rows + 1} aria-colcount={cols + 1} aria-activedescendant={`gl-ss-${selId}`} className="gl-spreadsheet__grid" style={{ '--gl-ss-cols': cols } as CSSProperties} onKeyDown={onGridKey}>
          <div role="row" className="gl-spreadsheet__row">
            <span role="columnheader" className="gl-spreadsheet__corner" />
            {Array.from({ length: cols }, (_, c) => <span key={c} role="columnheader" className="gl-spreadsheet__head" data-active={c === sel.c || undefined}>{colName(c)}</span>)}
          </div>
          {Array.from({ length: rows }, (_, r) => (
            <div role="row" key={r} className="gl-spreadsheet__row">
              <span role="rowheader" className="gl-spreadsheet__head gl-spreadsheet__head--row" data-active={r === sel.r || undefined}>{r + 1}</span>
              {Array.from({ length: cols }, (_, c) => {
                const id = idOf(c, r);
                const value = read(id);
                const selected = c === sel.c && r === sel.r;
                const error = typeof value === 'string' && /^#[A-Z/0!]+[!?]?$/.test(value) && (data[id] ?? '').trim().startsWith('=');
                return (
                  <div
                    key={c} id={`gl-ss-${id}`} role="gridcell" aria-selected={selected} aria-invalid={error || undefined} className="gl-spreadsheet__cell"
                    data-selected={selected || undefined} data-number={typeof value === 'number' || undefined} data-error={error || undefined}
                    onMouseDown={() => { if (draft !== null && !selected) commit(0, 0); setSel({ c, r }); }} onDoubleClick={() => edit(data[id] ?? '')}
                  >
                    {selected && draft !== null
                      ? <input className="gl-spreadsheet__editor" aria-label={`Edit cell ${id}`} autoFocus value={draft} spellCheck={false} onChange={(event) => edit(event.target.value)} onKeyDown={onEditKey} onBlur={blur} />
                      : show(value)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
