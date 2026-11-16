# Gridline UI

A compact, hairline-ruled design system for data-dense interfaces, documented in Storybook.

Gridline treats the interface as a technical table: structure comes from 1px rules and a visible grid, not from floating cards.

Live demo: <https://evaisse.github.io/gridline-ui/> — the static Storybook, deployed by
`.github/workflows/pages.yml` on every push to `main`.

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
  tokens/      CSS variables, tones, data palette, icons, overlay styles   (foundation)
  utils/       cx(), styled(), useControlled(), the mock assistant runtime (foundation)
  atoms/       49 single-purpose elements
  molecules/   84 small compositions
  organisms/   70 self-contained blocks, including charts and the assistant
  templates/   25 page layouts with named slots
  pages/       stories that fill a template with invented fixtures
  catalog/     the component catalogue, its browser and the placeholders for planned components
```

The import chain is `tokens → atoms → molecules → organisms → templates → pages`.
A layer imports from the layers to its left and never from those to its right.

Inside a layer, each component sits in a category folder: `src/molecules/forms/Rating.tsx`.
The folder, the catalogue category and the Storybook folder are the same word.
[`src/catalog/ORGANISATION.md`](src/catalog/ORGANISATION.md) gives the naming and grouping rules;
[`src/catalog/BACKLOG.md`](src/catalog/BACKLOG.md) lists what is not built yet, most widely documented first.

## Catalogue, folders and tags

`src/catalog/catalog.ts` lists every component, built or planned, with its layer, its category,
its tags and the names other libraries use for the same thing. Everything else follows from it.

| What | Where | How it is produced |
|---|---|---|
| Storybook folders | story `title`: `Layer/Category/Name` | written into each story by `npm run catalog` |
| Tags | story `tags`, and the catalogue filters | written into each story by `npm run catalog` |
| References to other libraries | `src/catalog/catalog.generated.json` | entries matched by alias against the harvested pages |
| Placeholders for planned components | `src/catalog/planned/*.stories.tsx` | one per `plan(` entry, with `@see` links in a comment |
| Harvested documentation pages | `src/catalog/sources.generated.json` | `npm run catalog:harvest` reads 19 documentation sites |
| Imported UI component directory | `src/catalog/import/repertoire-ui.sqlite` and `.json` | `npm run catalog:import` converts the SQLite export (33 libraries, 3,018 components) |

In Storybook, open **Catalogue** to search and filter all components by status, layer, category,
tag or library; each name links to its story, each reference to the other library's page.
**Catalogue / Unclassified** lists documentation pages that no entry claims yet, and
**Catalogue / Libraries** lists the 50 libraries with their stack, platform and licence.
Placeholders carry the `planned` tag, which is switched off in the sidebar filter by default.

```bash
npm run catalog            # apply catalog.ts: titles, tags, placeholders, references
npm run catalog:check      # the same, read-only; part of `npm run check`
npm run catalog:harvest    # re-read the documentation sites (needs network), then apply
npm run catalog:import     # re-read src/catalog/import/repertoire-ui.sqlite, then apply
```

To add a component, add an entry to `catalog.ts` and run `npm run catalog`.
To build a planned one, write it, change its entry from `plan(` to `have(` and run it again.

The harvested libraries are shadcn/ui, Radix Primitives, Base UI, Ark UI, Headless UI, React Aria,
React Spectrum, Material UI, Ant Design, Chakra UI, Mantine, Carbon, Polaris, Primer,
Atlassian Design System, Fluent 2, HeroUI, daisyUI and assistant-ui. A reference is listed only
because the library's own site links to that page; nothing is guessed.

The imported directory adds 31 more libraries, mostly enterprise suites on other stacks: Telerik
(Blazor, WPF, MAUI), Kendo (React, Angular, jQuery), Syncfusion (EJ2, Blazor, Flutter), DevExtreme,
PrimeReact, PrimeVue, PrimeNG, PrimeFaces, Sencha Ext JS, Radzen, Webix, DHTMLX, Ionic, Quasar,
Element Plus, NG-ZORRO, Ignite UI, Smart UI, Web Awesome, Tabler, Flowbite Svelte, Flutter Material,
flatpickr, Tabulator and Skeletonizer. To update it, replace the `.sqlite` file and run
`npm run catalog:import`. Names are matched after removing vendor prefixes (`RadzenButton`,
`Ext.Button`), versions, bracketed notes, plurals and suffixes such as `Control` or `View`.

## Component inventory

Gridline covers the component sets of [shadcn/ui](https://ui.shadcn.com/docs/components) and
[assistant-ui](https://www.assistant-ui.com/), restyled to the eight rules. Behaviour comes from the same
headless libraries those projects use; the markup and CSS are Gridline's own.

### shadcn/ui

| shadcn/ui | Gridline | Layer |
|---|---|---|
| Accordion | `Accordion` | molecule |
| Alert | `Alert` | molecule |
| Alert Dialog | `AlertDialog` | molecule |
| Aspect Ratio | `AspectRatio` | atom |
| Attachment | `Attachment` | molecule |
| Avatar | `Avatar` | atom |
| Badge | `Tag` | atom |
| Breadcrumb | `Breadcrumb` | molecule |
| Bubble | `Bubble`, `BubbleGroup` | molecule |
| Button | `Button` | atom |
| Button Group | `ButtonGroup` | molecule |
| Calendar | `Calendar` | molecule |
| Card | `Card` | molecule |
| Carousel | `Carousel` | molecule |
| Chart | `ChartFrame` and the chart components below | organism |
| Checkbox | `Checkbox` | atom |
| Code Block | `CodeBlock` | molecule |
| Collapsible | `Collapsible` | atom |
| Combobox | `Combobox` | organism |
| Command | `Command` | organism |
| Context Menu | `ContextMenu` | molecule |
| Data Table | `DataTable` | organism |
| Date Picker | `DatePicker` | organism |
| Dialog | `Dialog` | molecule |
| Direction | `DirectionProvider` | atom |
| Drawer | `Drawer` | molecule |
| Dropdown Menu | `DropdownMenu` | molecule |
| Empty | `Empty` | molecule |
| Field | `Field`, `FieldSet` | molecule |
| Hover Card | `HoverCard` | atom |
| Input | `Input` | atom |
| Input Group | `InputGroup` | molecule |
| Input OTP | `InputOTP` | molecule |
| Item | `Item`, `ItemGroup` | molecule |
| Kbd | `Kbd` | atom |
| Label | `Label`, and `Field` for form labels | atom |
| Marker | `Marker` | atom |
| Menubar | `Menubar` | organism |
| Message | `Message` | organism |
| Message Scroller | `MessageScroller` | organism |
| Native Select | `NativeSelect` | atom |
| Navigation Menu | `NavigationMenu` | organism |
| Pagination | `Pagination` | molecule |
| Popover | `Popover` | atom |
| Progress | `Progress` | atom |
| Questionnaire | `Questionnaire` | organism |
| Radio Group | `RadioGroup`, `Radio` | atom |
| Resizable | `ResizableGroup` | molecule |
| Scroll Area | `ScrollArea` | atom |
| Select | `Select` | molecule |
| Separator | `Separator` | atom |
| Sheet | `Sheet` | molecule |
| Sidebar | `Sidebar` | organism |
| Skeleton | `Skeleton` | atom |
| Slider | `Slider` | atom |
| Spinner | `Spinner` | atom |
| Switch | `Switch` | atom |
| Table | `Table` | molecule |
| Tabs | `Tabs`, `TabPanels` | molecule |
| Textarea | `Textarea` | atom |
| Toast | `Toaster`, `useToast` | molecule |
| Toggle | `Toggle` | atom |
| Toggle Group | `ToggleGroup` | molecule |
| Tooltip | `Tooltip` | atom |
| Trace | `Trace` | organism |
| Typography | `Heading`, `Text`, `Prose`, `Blockquote`, `InlineCode` | atom |

### assistant-ui

These wrap `@assistant-ui/react` primitives, so they work with any assistant-ui runtime.
Render them under an `AssistantRuntimeProvider`.

| assistant-ui | Gridline | Layer |
|---|---|---|
| Thread, Message, Suggestion, Error, Selection Toolbar | `AssistantThread` | organism |
| Composer, Attachment | `AssistantComposer` | organism |
| Thread List | `AssistantThreadList` | organism |
| Assistant Modal | `AssistantModal` | organism |
| Assistant Sidebar | `AssistantSidebar` | organism |
| Action Bar | `AssistantActionBar`, `UserActionBar` | molecule |
| Branch Picker | `BranchPicker` | molecule |
| Markdown | `MarkdownText` | molecule |
| Reasoning, Chain of Thought | `Reasoning` | molecule |
| Tool fallback | `ToolCall` | molecule |

The stories run on `src/utils/mockAssistant.tsx`, a canned local model that reasons, calls a tool
and streams Markdown. It makes no network request.

### Charts

All charts sit in a `ChartFrame` and read their colours from `--gl-data-1` to `--gl-data-8`.

| Chart | Component | Variants |
|---|---|---|
| Area | `AreaChart` | linear, monotone, step, stacked |
| Bar | `BarChart` | grouped, stacked, horizontal, with labels |
| Line | `LineChart` | linear, monotone, step, with dots |
| Pie | `PieChart` | pie, donut with centre, with labels |
| Radar | `RadarChart` | polygon or circular grid, filled or outline |
| Radial | `RadialChart` | rings, 180° gauge |
| Tooltip | `ChartTooltip` | square, line or dashed marker |
| Ranked columns | `ColumnChart` | one colour per column or one colour |
| Scatter | `ScatterPlot` | quadrants, connected paths |
| Ranked bars | `ScoreBoard`, `MeterRow` | tabbed metrics |
| Leaderboard | `DataTable` | ranked, top rows tinted, sortable |

## Libraries

| Purpose | Library |
|---|---|
| Accessible behaviour (dialogs, menus, sliders…) | `radix-ui` |
| Charts | `recharts` |
| Command palette | `cmdk` |
| Calendar | `react-day-picker` |
| Resizable panels | `react-resizable-panels` |
| One-time code input | `input-otp` |
| Assistant | `@assistant-ui/react`, `@assistant-ui/react-markdown`, `remark-gfm` |

## Import rules enforced by ESLint

All of these are errors (`eslint.config.js`):

| Rule | Example of what is rejected |
|---|---|
| No upward import | an atom importing `../../molecules` |
| Foundations import no components | `tokens/` importing `../atoms` |
| Barrel only across layers | `../../atoms/typography/Label` instead of `../../atoms` |
| Atoms are leaves | an atom importing another atom, in its folder or another |
| No root barrel from inside | `import … from '../..'` |
| Two levels up lands on a layer | `../../anything-else`, `../../../x` |
| Library is Storybook-free | a component importing `@storybook/*` or a `.stories` file |
| No `react-dom` in components | `createPortal` in an organism |
| Atoms and templates are stateless | `useState` in an atom |
| `pages/` holds stories only | a component file in `src/pages` |
| Named exports only | `export default` outside stories |
| No hard-coded colours | `'#ff0000'` in a component |

Set `STRICT_CHAIN = true` at the top of `eslint.config.js` to also forbid skipping a level:
each layer may then import only from the layer directly below it. It is off by default because
organisms and templates legitimately use atoms such as `Label` and `Frame`.

`npm run lint:boundaries` runs `scripts/check-boundaries.mjs`, which lints 38 small snippets and
asserts that each rule fires, or stays quiet, as specified. Run it after editing the ESLint config.

## Fonts

Storybook loads Source Serif 4, Inter and JetBrains Mono from `@fontsource-variable`. They are
set through `--gl-font-display`, `--gl-font-body` and `--gl-font-mono`; override the variables to
use other faces.
