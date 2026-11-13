// Self-test for the import-chain rules in eslint.config.js.
// Each case lints a snippet as if it lived at `file` and asserts whether
// `no-restricted-imports` (or the given rule) fires.
import { ESLint } from 'eslint';

const cases = [
  // Direction of the chain
  ['atoms/X.tsx', `import { Stat } from '../molecules';`, false, 'atom → molecule'],
  ['atoms/X.tsx', `import { Toolbar } from '../organisms';`, false, 'atom → organism'],
  ['molecules/X.tsx', `import { Toolbar } from '../organisms';`, false, 'molecule → organism'],
  ['molecules/X.tsx', `import { IndexTemplate } from '../templates';`, false, 'molecule → template'],
  ['organisms/X.tsx', `import { IndexTemplate } from '../templates';`, false, 'organism → template'],
  ['templates/X.tsx', `import { data } from '../pages/fixtures';`, false, 'template → page'],
  ['molecules/X.tsx', `import { Label } from '../atoms';`, true, 'molecule → atom'],
  ['organisms/X.tsx', `import { Stat } from '../molecules';`, true, 'organism → molecule'],
  ['organisms/X.tsx', `import { Label } from '../atoms';`, true, 'organism → atom (allowed unless STRICT_CHAIN)'],
  ['templates/X.tsx', `import { Toolbar } from '../organisms';`, true, 'template → organism'],
  ['pages/X.stories.tsx', `import { IndexTemplate } from '../templates';`, true, 'page → template'],
  // Foundations
  ['tokens/x.ts', `import { Label } from '../atoms';`, false, 'tokens → atom'],
  ['utils/x.ts', `import { Stat } from '../molecules';`, false, 'utils → molecule'],
  ['atoms/X.tsx', `import type { Tone } from '../tokens/tone';`, true, 'atom → tokens'],
  ['organisms/X.tsx', `import { cx } from '../utils/cx';`, true, 'organism → utils'],
  // Barrels and siblings
  ['molecules/X.tsx', `import { Label } from '../atoms/Label';`, false, 'deep import into a layer'],
  ['atoms/X.tsx', `import { Label } from './Label';`, false, 'atom → sibling atom'],
  ['atoms/index.ts', `export { Label } from './Label';`, true, 'atom barrel re-exports its atoms'],
  ['atoms/index.ts', `export { Stat } from '../molecules';`, false, 'atom barrel → molecule'],
  ['atoms/X.tsx', `import './X.css';`, true, 'atom → own stylesheet'],
  ['atoms/X.stories.tsx', `import { Label } from './Label';`, true, 'atom story → its atom'],
  ['molecules/X.tsx', `import { Stat } from './Stat';`, true, 'molecule → sibling molecule'],
  ['organisms/X.tsx', `import { Label } from '..';`, false, 'root barrel from inside'],
  ['organisms/X.tsx', `import { x } from '../../outside';`, false, 'reaching two levels up'],
  // Storybook and platform
  ['atoms/X.tsx', `import type { Meta } from '@storybook/react-vite';`, false, 'library → storybook'],
  ['molecules/X.tsx', `import { Default } from './Stat.stories';`, false, 'library → story file'],
  ['molecules/X.stories.tsx', `import type { Meta } from '@storybook/react-vite';`, true, 'story → storybook'],
  ['organisms/X.tsx', `import { createPortal } from 'react-dom';`, false, 'component → react-dom'],
  // Stateless layers
  ['atoms/X.tsx', `import { useState } from 'react';`, false, 'state in an atom'],
  ['templates/X.tsx', `import { useEffect } from 'react';`, false, 'effect in a template'],
  ['molecules/X.tsx', `import { useState } from 'react';`, true, 'state in a molecule'],
  // Other guards
  ['atoms/X.tsx', `export default function X() { return null; }`, false, 'default export', 'no-restricted-syntax'],
  ['atoms/X.tsx', `export const c = '#ff0000';`, false, 'hard-coded colour', 'no-restricted-syntax'],
  ['pages/Widget.tsx', `export const x = 1;`, false, 'component file in pages', 'no-restricted-syntax'],
];

const eslint = new ESLint();
let failed = 0;

for (const [file, code, allowed, title, ruleId = 'no-restricted-imports'] of cases) {
  const [result] = await eslint.lintText(code + '\n', { filePath: `src/${file}` });
  const hits = result.messages.filter((message) => message.ruleId === ruleId);
  const ok = allowed ? hits.length === 0 : hits.length > 0;
  if (!ok) failed += 1;
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${allowed ? 'allow ' : 'forbid'}  ${title}`);
  if (!ok && hits[0]) console.log(`        ${hits[0].message}`);
}

console.log(`\n${cases.length - failed}/${cases.length} boundary cases behave as specified.`);
process.exit(failed ? 1 : 0);
