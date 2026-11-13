# Gridline UI

A compact, hairline-ruled design system for data-dense interfaces, documented in Storybook.

Gridline treats the interface as a technical table: structure comes from 1px rules and a visible grid, not from floating cards.

## Run it

```bash
npm install
npm run dev        # Storybook on http://localhost:6006
npm run build      # static Storybook in storybook-static/
npm run check      # typecheck + lint + boundary self-test
```

## The eight rules

1. **One hairline.** 1px, one colour at two opacities. Never 2px.
2. **Shared borders.** Cells touch; one rule separates two cells.
3. **Flat.** No shadows, no gradients, corners of 2px at most.
4. **Three voices.** Serif for titles, sans for reading, uppercase mono for metadata and figures.
5. **Fixed rhythm.** Rows are 40px, controls 32px, spacing in multiples of 4.
6. **One tint.** Surfaces are the tint at 4–14% opacity. Override `--gl-tint` to re-theme.
7. **Inversion selects.** The selected row or tab flips to solid tint.
8. **Colour is data.** Saturated colour appears only where it encodes a value.

## Atomic layers

```
src/
  tokens/      CSS variables, tones, base styles          (foundation)
  utils/       helpers such as cx()                       (foundation)
  atoms/       Label, Heading, Text, Numeric, Button, Tag, Input, Select, Meter, Ruler, Grid, Frame
  molecules/   KeyValue, Stat, Tabs, ListRow, MeterRow, NavItem, SearchField
  organisms/   Toolbar, MasterList, SpecSheet, StatGroup, ScoreBoard, IndexCard, CategoryNav, DataTable
  templates/   MasterDetailTemplate, IndexTemplate
  pages/       stories that fill a template with fixtures
```

The import chain is `tokens → atoms → molecules → organisms → templates → pages`.
A layer imports from the layers to its left and never from those to its right.

## Import rules enforced by ESLint

All of these are errors (`eslint.config.js`):

| Rule | Example of what is rejected |
|---|---|
| No upward import | an atom importing `../molecules` |
| Foundations import no components | `tokens/` importing `../atoms` |
| Barrel only across layers | `../atoms/Label` instead of `../atoms` |
| Atoms are leaves | an atom importing a sibling atom |
| No root barrel from inside | `import … from '..'` |
| One level up at most | `../../anything` |
| Library is Storybook-free | a component importing `@storybook/*` or a `.stories` file |
| No `react-dom` in components | `createPortal` in an organism |
| Atoms and templates are stateless | `useState` in an atom |
| `pages/` holds stories only | a component file in `src/pages` |
| Named exports only | `export default` outside stories |
| No hard-coded colours | `'#ff0000'` in a component |

Set `STRICT_CHAIN = true` at the top of `eslint.config.js` to also forbid skipping a level:
each layer may then import only from the layer directly below it. It is off by default because
organisms and templates legitimately use atoms such as `Label` and `Frame`.

`npm run lint:boundaries` runs `scripts/check-boundaries.mjs`, which lints 34 small snippets and
asserts that each rule fires, or stays quiet, as specified. Run it after editing the ESLint config.

## Fonts

Storybook loads Source Serif 4, Inter and JetBrains Mono from `@fontsource-variable`. They are
set through `--gl-font-display`, `--gl-font-body` and `--gl-font-mono`; override the variables to
use other faces.
