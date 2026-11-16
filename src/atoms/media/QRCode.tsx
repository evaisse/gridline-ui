import type { SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import './QRCode.css';

// Data codewords per block, error-correction level M, versions 1-10: [ecc per block, [count, data codewords]...]
const BLOCKS_M: Array<[number, Array<[number, number]>]> = [
  [10, [[1, 16]]],
  [16, [[1, 28]]],
  [26, [[1, 44]]],
  [18, [[2, 32]]],
  [24, [[2, 43]]],
  [16, [[4, 27]]],
  [18, [[4, 31]]],
  [22, [[2, 38], [2, 39]]],
  [22, [[3, 36], [2, 37]]],
  [26, [[4, 43], [1, 44]]],
];
const ALIGN = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]];

function gfMul(x: number, y: number): number {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    z ^= ((y >>> i) & 1) * x;
  }
  return z;
}

function rsRemainder(data: number[], degree: number): number[] {
  const gen = new Array<number>(degree).fill(0);
  gen[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      gen[j] = gfMul(gen[j], root);
      if (j + 1 < degree) gen[j] ^= gen[j + 1];
    }
    root = gfMul(root, 2);
  }
  const rem = new Array<number>(degree).fill(0);
  for (const b of data) {
    const factor = b ^ (rem.shift() as number);
    rem.push(0);
    gen.forEach((coef, i) => {
      rem[i] ^= gfMul(coef, factor);
    });
  }
  return rem;
}

function bch(value: number, poly: number, polyBits: number): number {
  let rem = value;
  for (let i = 0; i < polyBits; i++) rem = (rem << 1) ^ ((rem >>> (polyBits - 1)) * poly);
  return rem;
}

function maskFn(mask: number, x: number, y: number): boolean {
  switch (mask) {
    case 0: return (x + y) % 2 === 0;
    case 1: return y % 2 === 0;
    case 2: return x % 3 === 0;
    case 3: return (x + y) % 3 === 0;
    case 4: return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
    case 5: return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6: return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default: return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
}

function penalty(m: boolean[][]): number {
  const n = m.length;
  let score = 0;
  const lines: boolean[][] = [];
  for (let i = 0; i < n; i++) {
    lines.push(m[i]);
    lines.push(m.map((row) => row[i]));
  }
  const pat = [true, false, true, true, true, false, true];
  for (const line of lines) {
    let run = 1;
    for (let i = 1; i <= n; i++) {
      if (i < n && line[i] === line[i - 1]) run++;
      else {
        if (run >= 5) score += 3 + run - 5;
        run = 1;
      }
    }
    for (let i = 0; i + 7 <= n; i++) {
      if (!pat.every((v, k) => line[i + k] === v)) continue;
      const before = i >= 4 && [1, 2, 3, 4].every((k) => !line[i - k]);
      const after = i + 11 <= n && [7, 8, 9, 10].every((k) => !line[i + k]);
      if (before || after) score += 40;
    }
  }
  for (let y = 0; y < n - 1; y++) {
    for (let x = 0; x < n - 1; x++) {
      const c = m[y][x];
      if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) score += 3;
    }
  }
  const dark = m.reduce((s, row) => s + row.filter(Boolean).length, 0);
  const total = n * n;
  score += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10;
  return score;
}

export interface QRMatrix {
  /** Modules per side: 21 + 4 * (version - 1). */
  size: number;
  version: number;
  mask: number;
  /** `modules[y][x]` is true for a dark module. */
  modules: boolean[][];
}

/** Encodes text (UTF-8, byte mode, error correction M, versions 1-10) as a QR matrix; null when the text is too long (over 213 bytes). */
export function encodeQR(text: string): QRMatrix | null {
  const bytes = Array.from(new TextEncoder().encode(text));
  let version = 0;
  for (let v = 1; v <= 10; v++) {
    const cap = BLOCKS_M[v - 1][1].reduce((s, [c, d]) => s + c * d, 0);
    if (4 + (v < 10 ? 8 : 16) + 8 * bytes.length <= cap * 8) {
      version = v;
      break;
    }
  }
  if (!version) return null;
  const [eccLen, groups] = BLOCKS_M[version - 1];
  const dataCap = groups.reduce((s, [c, d]) => s + c * d, 0);

  // Bit stream.
  const bits: number[] = [];
  const put = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1);
  };
  put(0b0100, 4);
  put(bytes.length, version < 10 ? 8 : 16);
  bytes.forEach((b) => put(b, 8));
  put(0, Math.min(4, dataCap * 8 - bits.length));
  put(0, (8 - (bits.length % 8)) % 8);
  const data: number[] = [];
  for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(''), 2));
  for (let pad = 0xec; data.length < dataCap; pad ^= 0xec ^ 0x11) data.push(pad);

  // Split into blocks, add Reed-Solomon, interleave.
  const dataBlocks: number[][] = [];
  let at = 0;
  for (const [count, len] of groups) {
    for (let i = 0; i < count; i++) {
      dataBlocks.push(data.slice(at, at + len));
      at += len;
    }
  }
  const eccBlocks = dataBlocks.map((b) => rsRemainder(b, eccLen));
  const words: number[] = [];
  const longest = Math.max(...dataBlocks.map((b) => b.length));
  for (let i = 0; i < longest; i++) dataBlocks.forEach((b) => i < b.length && words.push(b[i]));
  for (let i = 0; i < eccLen; i++) eccBlocks.forEach((b) => words.push(b[i]));

  // Function patterns.
  const size = 17 + 4 * version;
  const grid: boolean[][] = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const fn: boolean[][] = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const setFn = (x: number, y: number, dark: boolean) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    grid[y][x] = dark;
    fn[y][x] = true;
  };
  for (let i = 0; i < size; i++) {
    setFn(6, i, i % 2 === 0);
    setFn(i, 6, i % 2 === 0);
  }
  for (const [cx0, cy0] of [[3, 3], [size - 4, 3], [3, size - 4]]) {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const d = Math.max(Math.abs(dx), Math.abs(dy));
      setFn(cx0 + dx, cy0 + dy, d !== 2 && d !== 4);
    }
  }
  const pos = ALIGN[version - 1];
  pos.forEach((px, i) => pos.forEach((py, j) => {
    if ((i === 0 && j === 0) || (i === 0 && j === pos.length - 1) || (i === pos.length - 1 && j === 0)) return;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setFn(px + dx, py + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }));
  const drawFormat = (mask: number) => {
    const fmt = (((0 << 3) | mask) << 10 | bch((0 << 3) | mask, 0x537, 10)) ^ 0x5412; // level M = 00
    const b = (i: number) => ((fmt >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) setFn(8, i, b(i));
    setFn(8, 7, b(6));
    setFn(8, 8, b(7));
    setFn(7, 8, b(8));
    for (let i = 9; i < 15; i++) setFn(14 - i, 8, b(i));
    for (let i = 0; i < 8; i++) setFn(size - 1 - i, 8, b(i));
    for (let i = 8; i < 15; i++) setFn(8, size - 15 + i, b(i));
    setFn(8, size - 8, true);
  };
  drawFormat(0);
  if (version >= 7) {
    const info = (version << 12) | bch(version, 0x1f25, 12);
    for (let i = 0; i < 18; i++) {
      const bit = ((info >>> i) & 1) === 1;
      const a = size - 11 + (i % 3);
      const b = Math.floor(i / 3);
      setFn(a, b, bit);
      setFn(b, a, bit);
    }
  }

  // Place codewords in the zigzag.
  let k = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const y = ((right + 1) & 2) === 0 ? size - 1 - vert : vert;
        if (!fn[y][x] && k < words.length * 8) {
          grid[y][x] = ((words[k >>> 3] >>> (7 - (k & 7))) & 1) === 1;
          k++;
        }
      }
    }
  }

  // Pick the mask with the lowest penalty.
  const apply = (mask: number) => grid.map((row, y) => row.map((v, x) => (fn[y][x] ? v : v !== maskFn(mask, x, y))));
  let best = 0;
  let bestScore = Infinity;
  let bestGrid = grid;
  for (let mask = 0; mask < 8; mask++) {
    drawFormat(mask);
    const g = apply(mask);
    // Re-draw format modules into the masked grid.
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (fn[y][x]) g[y][x] = grid[y][x];
    const s = penalty(g);
    if (s < bestScore) {
      bestScore = s;
      best = mask;
      bestGrid = g;
    }
  }
  return { size, version, mask: best, modules: bestGrid };
}

export interface QRCodeProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'values'> {
  /** The string to encode (UTF-8, up to 213 bytes). */
  value: string;
  /** Rendered width and height in px. */
  size?: number;
  /** Quiet zone in modules; scanners need 4. */
  margin?: number;
  /** Accessible name; defaults to the encoded value. */
  label?: string;
}

/** Encodes a string as a real, scannable QR code drawn as SVG rects in `currentColor`; renders an empty frame if the value is too long. */
export function QRCode({ value, size = 160, margin = 4, label, className, ...rest }: QRCodeProps) {
  const qr = encodeQR(value);
  const n = qr ? qr.size + margin * 2 : 21 + margin * 2;
  const rects: Array<{ x: number; y: number; w: number }> = [];
  if (qr) {
    qr.modules.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        if (!row[x]) { x++; continue; }
        const start = x;
        while (x < row.length && row[x]) x++;
        rects.push({ x: start, y, w: x - start });
      }
    });
  }
  return (
    <svg
      role="img"
      aria-label={label ?? (qr ? `QR code: ${value}` : 'QR code unavailable: value too long')}
      className={cx('gl-qrcode', !qr && 'gl-qrcode--empty', className)}
      width={size}
      height={size}
      viewBox={`0 0 ${n} ${n}`}
      shapeRendering="crispEdges"
      {...rest}
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x + margin} y={r.y + margin} width={r.w} height="1" fill="currentColor" />
      ))}
    </svg>
  );
}
