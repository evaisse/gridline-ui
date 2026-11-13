// Invented data for the page stories. Nothing here is a real package or measurement.
import type { Category, MasterListItem, ScoreView, Spec } from '../organisms';

export const packages: MasterListItem[] = [
  { id: 'tessera', title: 'tessera', meta: 'Nov 12, 2026', icon: '◆', trailing: '4.2.0' },
  { id: 'quillmark', title: 'quillmark', meta: 'Nov 09, 2026', icon: '◇', trailing: '1.9.3' },
  { id: 'harrow', title: 'harrow', meta: 'Nov 05, 2026', icon: '▲', trailing: '0.14.0' },
  { id: 'lumen-fmt', title: 'lumen-fmt', meta: 'Oct 29, 2026', icon: '●', trailing: '3.0.1' },
  { id: 'castor', title: 'castor', meta: 'Oct 28, 2026', icon: '■', trailing: '2.7.0' },
  { id: 'bramble', title: 'bramble', meta: 'Oct 23, 2026', icon: '◆', trailing: '5.1.2' },
  { id: 'ostinato', title: 'ostinato', meta: 'Oct 21, 2026', icon: '○', trailing: '0.8.5' },
  { id: 'fennel-io', title: 'fennel-io', meta: 'Oct 19, 2026', icon: '▲', trailing: '1.2.0' },
  { id: 'marlin', title: 'marlin', meta: 'Oct 16, 2026', icon: '□', trailing: '6.0.0' },
  { id: 'sextant', title: 'sextant', meta: 'Oct 15, 2026', icon: '◇', trailing: '2.3.4' },
];

export const specs: Spec[] = [
  { label: 'Maintainer', value: 'Tessera Labs' },
  { label: 'Licence', value: 'MIT' },
  { label: 'Latest', value: '4.2.0' },
  { label: 'Weekly installs', value: '1.2M' },
  { label: 'Runtime', value: 'Node ≥ 22' },
  { label: 'Types', value: 'Bundled' },
];

export const scoreViews: ScoreView[] = [
  {
    id: 'coverage', label: 'Coverage', tone: 'pos', unit: '%', max: 100,
    rows: [
      { name: 'core', value: 91.4, rank: 3, of: 37 },
      { name: 'parser', value: 73.6, rank: 9, of: 38 },
      { name: 'printer', value: 66.1, rank: 12, of: 40 },
      { name: 'cli', value: 48.9, rank: 21, of: 42 },
    ],
  },
  {
    id: 'size', label: 'Size', tone: 'neg', unit: 'kB', max: 60,
    rows: [
      { name: 'core', value: 12.4, rank: 6, of: 37 },
      { name: 'parser', value: 41.2, rank: 27, of: 38 },
      { name: 'printer', value: 18.7, rank: 11, of: 40 },
      { name: 'cli', value: 7.9, rank: 2, of: 42 },
    ],
  },
  {
    id: 'build', label: 'Build', tone: 'warn', unit: 's', max: 30,
    rows: [
      { name: 'core', value: 3.2, rank: 4, of: 37 },
      { name: 'parser', value: 21.5, rank: 30, of: 38 },
      { name: 'printer', value: 9.8, rank: 15, of: 40 },
      { name: 'cli', value: 1.4, rank: 1, of: 42 },
    ],
  },
];

export const categories: Category[] = [
  { id: 'all', label: 'All packages', icon: '▦', count: 42 },
  { id: 'parsing', label: 'Parsing', icon: '▤', count: 12 },
  { id: 'formatting', label: 'Formatting', icon: '≡', count: 8 },
  { id: 'io', label: 'Input / output', icon: '⇄', count: 9 },
  { id: 'testing', label: 'Testing', icon: '✓', count: 7 },
  { id: 'tooling', label: 'Tooling', icon: '⚙', count: 6 },
];

export const cards = [
  {
    eyebrow: 'Parsing', tag: 'Stable', tagTone: 'pos' as const, title: 'tessera',
    facts: [{ label: 'Updated', value: '11/12/2026' }, { label: 'Modules', value: 4 }],
    description: 'An incremental parser toolkit with error recovery and a compact syntax tree.',
    listTitle: 'Top modules', list: ['core', 'parser', 'printer'],
  },
  {
    eyebrow: 'Formatting', tag: 'Beta', tagTone: 'info' as const, title: 'lumen-fmt',
    facts: [{ label: 'Updated', value: '10/29/2026' }, { label: 'Modules', value: 3 }],
    description: 'An opinionated formatter that preserves comments and keeps diffs small.',
    listTitle: 'Top modules', list: ['rules', 'printer', 'cli'],
  },
  {
    eyebrow: 'Input / output', tag: 'Stable', tagTone: 'pos' as const, title: 'fennel-io',
    facts: [{ label: 'Updated', value: '10/19/2026' }, { label: 'Modules', value: 5 }],
    description: 'Streaming file and network primitives with backpressure built in.',
    listTitle: 'Top modules', list: ['stream', 'fs', 'net'],
  },
  {
    eyebrow: 'Testing', tag: 'Deprecated', tagTone: 'warn' as const, title: 'harrow',
    facts: [{ label: 'Updated', value: '11/05/2026' }, { label: 'Modules', value: 2 }],
    description: 'A snapshot test runner. Superseded by the built-in runner; kept for migration.',
    listTitle: 'Top modules', list: ['runner', 'snapshot'],
  },
  {
    eyebrow: 'Tooling', tag: 'Stable', tagTone: 'pos' as const, title: 'sextant',
    facts: [{ label: 'Updated', value: '10/15/2026' }, { label: 'Modules', value: 6 }],
    description: 'Project navigation: symbol index, references, and a fast fuzzy finder.',
    listTitle: 'Top modules', list: ['index', 'query', 'watch'],
  },
];
