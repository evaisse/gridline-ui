// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

/**
 * Atomic design import chain.
 *
 *   tokens → atoms → molecules → organisms → templates → pages
 *
 * A layer may import from the layers to its left and never from the layers
 * to its right. Set STRICT_CHAIN to true to also forbid skipping a level
 * (an organism could then import molecules only, not atoms).
 * `tokens` and `utils` are foundations and stay importable from everywhere.
 *
 * Inside a layer, components sit in one folder per category (src/molecules/forms/…).
 * The barrel stays at the layer root: other layers import `../../atoms`, never a file inside it.
 */
const STRICT_CHAIN = false;

const CHAIN = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];
const FOUNDATIONS = ['tokens', 'utils'];
/** Layers that render markup only: no state, no effects. */
const STATELESS = ['atoms', 'templates'];

const STORY_GLOB = '**/*.stories.{ts,tsx}';
const anywhere = (layer) => [`**/${layer}`, `**/${layer}/**`];

/** Builds the `no-restricted-imports` options for one layer. */
function importRules(layer, { story, barrel = false }) {
  const patterns = [];
  const paths = [];
  const index = CHAIN.indexOf(layer);

  if (index === -1) {
    // tokens and utils sit under the chain and import nothing from it.
    patterns.push({
      group: CHAIN.flatMap(anywhere),
      message: `"${layer}" is a foundation: it cannot import from any component layer.`,
    });
  } else {
    const above = CHAIN.slice(index + 1);
    if (above.length) {
      patterns.push({
        group: above.flatMap(anywhere),
        message: `Upward import: "${layer}" cannot import from ${above.join(', ')}. The chain is ${CHAIN.join(' → ')}.`,
      });
    }

    const skipped = STRICT_CHAIN ? CHAIN.slice(0, Math.max(0, index - 1)) : [];
    if (skipped.length) {
      patterns.push({
        group: skipped.flatMap(anywhere),
        message: `Skipped level: "${layer}" may only import from "${CHAIN[index - 1]}" (STRICT_CHAIN is on).`,
      });
    }

    const below = CHAIN.slice(0, index).filter((name) => !skipped.includes(name));
    if (below.length) {
      patterns.push({
        group: below.map((name) => `**/${name}/*`),
        message: 'Deep import: import from the layer barrel (e.g. "../atoms"), not from a file inside it.',
      });
    }

    if (layer === 'atoms' && !story && !barrel) {
      patterns.push({
        group: ['./*', '!./*.css'],
        message: 'Atoms are leaves: an atom cannot import another atom. Compose them in a molecule.',
      });
      patterns.push({
        regex: '^\\.\\./[a-z-]+/',
        message: 'Atoms are leaves: an atom cannot import an atom from another category folder either.',
      });
    }
  }

  // Components live in src/<layer>/<category>/, so `../../<layer>` is the way to another layer.
  patterns.push({
    regex: `^\\.\\./\\.\\./(?!(${[...CHAIN, ...FOUNDATIONS].join('|')})(/|$))`,
    message: 'Two levels up must land on a layer or a foundation: ../../atoms, ../../tokens/…',
  });
  patterns.push({
    regex: '^(\\.\\./){3,}',
    message: 'Do not reach more than two directories up: that leaves src/.',
  });
  for (const name of ['..', '../index', '../index.ts', '../..', '../../index', '../../index.ts']) {
    paths.push({ name, message: 'Do not import the root barrel from inside the library: it creates cycles.' });
  }

  if (!story) {
    patterns.push({
      group: ['**/*.stories', '**/*.stories.*', 'storybook', 'storybook/**', '@storybook/**'],
      message: 'Library code cannot depend on stories or on Storybook.',
    });
    paths.push({ name: 'react-dom', message: 'Components must not touch react-dom directly.' });
    if (STATELESS.includes(layer)) {
      paths.push({
        name: 'react',
        importNames: ['useState', 'useReducer', 'useEffect', 'useLayoutEffect', 'useContext', 'useRef'],
        message: `"${layer}" are stateless: move state and effects to a molecule, an organism or a page.`,
      });
    }
  }

  return { paths, patterns };
}

const layerConfigs = [...FOUNDATIONS, ...CHAIN].flatMap((layer) => [
  {
    name: `gridline/boundaries/${layer}`,
    files: [`src/${layer}/**/*.{ts,tsx}`],
    ignores: [STORY_GLOB, '**/index.ts'],
    rules: { 'no-restricted-imports': ['error', importRules(layer, { story: false })] },
  },
  {
    name: `gridline/boundaries/${layer}/barrel`,
    files: [`src/${layer}/index.ts`],
    rules: { 'no-restricted-imports': ['error', importRules(layer, { story: false, barrel: true })] },
  },
  {
    name: `gridline/boundaries/${layer}/stories`,
    files: [`src/${layer}/${STORY_GLOB}`],
    rules: { 'no-restricted-imports': ['error', importRules(layer, { story: true })] },
  },
]);

export default tseslint.config(
  { ignores: ['node_modules', 'storybook-static', 'dist', '!.storybook'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  ...storybook.configs['flat/recommended'],
  {
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]',
          message: 'No hard-coded colours in components: use a --gl-* token.',
        },
      ],
    },
  },
  {
    name: 'gridline/named-exports',
    files: ['src/**/*.{ts,tsx}'],
    ignores: [STORY_GLOB],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: 'ExportDefaultDeclaration', message: 'Use named exports so barrels stay explicit.' },
        {
          selector: 'Literal[value=/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]',
          message: 'No hard-coded colours in components: use a --gl-* token.',
        },
      ],
    },
  },
  {
    name: 'gridline/pages-are-stories',
    files: ['src/pages/**/*.tsx'],
    ignores: [STORY_GLOB],
    rules: {
      'no-restricted-syntax': [
        'error',
        { selector: 'Program', message: 'src/pages holds stories and fixtures only. Put reusable UI in a lower layer.' },
      ],
    },
  },
  ...layerConfigs,
  {
    files: ['scripts/**', '*.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
);
