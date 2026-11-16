// Self-test for the import-chain rules in eslint.config.js.
// Each case lints a snippet as if it lived at `file` and asserts whether
// `no-restricted-imports` (or the given rule) fires.
import { ESLint } from 'eslint';

const cases = [
  // Direction of the chain
  ['atoms/forms/X.tsx', `import { Stat } from '../../molecules';`, false, 'atom → molecule'],
  ['atoms/forms/X.tsx', `import { Toolbar } from '../../organisms';`, false, 'atom → organism'],
  ['molecules/forms/X.tsx', `import { Toolbar } from '../../organisms';`, false, 'molecule → organism'],
  ['molecules/forms/X.tsx', `import { IndexTemplate } from '../../templates';`, false, 'molecule → template'],
  ['organisms/forms/X.tsx', `import { IndexTemplate } from '../../templates';`, false, 'organism → template'],
  ['templates/forms/X.tsx', `import { data } from '../../pages/fixtures';`, false, 'template → page'],
  ['molecules/forms/X.tsx', `import { Label } from '../../atoms';`, true, 'molecule → atom'],
  ['organisms/forms/X.tsx', `import { Stat } from '../../molecules';`, true, 'organism → molecule'],
  ['organisms/forms/X.tsx', `import { Label } from '../../atoms';`, true, 'organism → atom (allowed unless STRICT_CHAIN)'],
  ['templates/forms/X.tsx', `import { Toolbar } from '../../organisms';`, true, 'template → organism'],
  ['pages/X.stories.tsx', `import { IndexTemplate } from '../templates';`, true, 'page → template'],
  // Foundations
  ['tokens/x.ts', `import { Label } from '../atoms';`, false, 'tokens → atom'],
  ['utils/x.ts', `import { Stat } from '../molecules';`, false, 'utils → molecule'],
  ['atoms/forms/X.tsx', `import type { Tone } from '../../tokens/tone';`, true, 'atom → tokens'],
  ['organisms/forms/X.tsx', `import { cx } from '../../utils/cx';`, true, 'organism → utils'],
  // Barrels and siblings
  ['molecules/forms/X.tsx', `import { Label } from '../../atoms/Label';`, false, 'deep import into a layer'],
  ['atoms/forms/X.tsx', `import { Label } from './Label';`, false, 'atom → sibling atom'],
  ['atoms/index.ts', `export { Label } from './typography/Label';`, true, 'atom barrel re-exports its atoms'],
  ['atoms/index.ts', `export { Stat } from '../molecules';`, false, 'atom barrel → molecule'],
  ['atoms/forms/X.tsx', `import './X.css';`, true, 'atom → own stylesheet'],
  ['atoms/forms/X.stories.tsx', `import { Label } from './Label';`, true, 'atom story → its atom'],
  ['molecules/forms/X.tsx', `import { Stat } from './Stat';`, true, 'molecule → sibling molecule'],
  ['organisms/forms/X.tsx', `import { Label } from '../..';`, false, 'root barrel from inside'],
  ['organisms/forms/X.tsx', `import { x } from '../../outside';`, false, 'two levels up, not a layer'],
  ['organisms/forms/X.tsx', `import { x } from '../../../outside';`, false, 'reaching three levels up'],
  ['atoms/forms/X.tsx', `import { Label } from '../typography/Label';`, false, 'atom → atom in another category'],
  ['molecules/forms/X.tsx', `import { Stat } from '../data-display/Stat';`, true, 'molecule → molecule in another category'],
  ['molecules/forms/X.tsx', `import { Label } from '../../atoms/typography/Label';`, false, 'deep import into a category folder'],
  // Storybook and platform
  ['atoms/forms/X.tsx', `import type { Meta } from '@storybook/react-vite';`, false, 'library → storybook'],
  ['molecules/forms/X.tsx', `import { Default } from './Stat.stories';`, false, 'library → story file'],
  ['molecules/forms/X.stories.tsx', `import type { Meta } from '@storybook/react-vite';`, true, 'story → storybook'],
  ['organisms/forms/X.tsx', `import { createPortal } from 'react-dom';`, false, 'component → react-dom'],
  // Stateless layers
  ['atoms/forms/X.tsx', `import { useState } from 'react';`, false, 'state in an atom'],
  ['templates/forms/X.tsx', `import { useEffect } from 'react';`, false, 'effect in a template'],
  ['molecules/forms/X.tsx', `import { useState } from 'react';`, true, 'state in a molecule'],
  // Other guards
  ['atoms/forms/X.tsx', `export default function X() { return null; }`, false, 'default export', 'no-restricted-syntax'],
  ['atoms/forms/X.tsx', `export const c = '#ff0000';`, false, 'hard-coded colour', 'no-restricted-syntax'],
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
