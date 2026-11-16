# Naming and organisation

How components are named, where their files go and how they are grouped. The catalogue
(`catalog.ts`) is the source of truth; `npm run catalog` applies it and `npm run check` enforces it.

## 1. Where a file goes

```
src/<layer>/<category>/<Name>.tsx          the component
src/<layer>/<category>/<Name>.css          its styles, imported by the component
src/<layer>/<category>/<Name>.stories.tsx  its stories
src/<layer>/index.ts                       the layer barrel, the only thing other layers import
```

- **Layer** is the atomic level: `atoms`, `molecules`, `organisms`, `templates`. `pages` stays flat.
- **Category** is one of the folders below. It is the same word in three places: the folder on
  disk, the `category` of the catalogue entry, and the middle part of the Storybook title
  (`Molecules/Forms/Rating`). The sync script refuses a story that sits in the wrong folder.
- Imports: `../../atoms` (a lower layer's barrel), `../../tokens/…`, `../../utils/…`, `./Sibling`,
  and for molecules and above `../<category>/Sibling`. Atoms never import another atom.

## 2. Which layer

| Layer | Test | Examples |
|---|---|---|
| Atom | One element, one job. No state, imports no other component. | Button, Input, Tag, Stack |
| Molecule | A few atoms working as one control. May hold its own small state. | Field, NumberInput, Tabs, Dialog |
| Organism | A self-contained block with its own data or behaviour, made of molecules. | DataTable, Sidebar, Kanban, AuthForm |
| Template | A page layout with named slots and no content of its own. Stateless. | SettingsTemplate, DocsTemplate |
| Page | A template filled with invented fixtures. Stories only. | Pages/Tickets |

When in doubt between two layers, pick the lower one: a component can move up when it grows.

## 3. Which category

| Folder | Holds | Typical tags |
|---|---|---|
| `actions` | Things you press | action, toggle, menu |
| `forms` | Anything that collects a value, and form structure | input, selection, date, file, form |
| `data-display` | Values, records, lists, tables, trees, boards | data, list, table, tree, kpi |
| `charts` | Plots; all sit in a `ChartFrame` and use the data palette | data |
| `feedback` | Status, progress, messages, empty states | status, loading, message |
| `navigation` | Moving between places and steps; application chrome | wayfinding, steps, shell |
| `overlays` | Content that floats above the page | popup, modal |
| `layout` | Structure, spacing, disclosure | container, spacing, disclosure |
| `typography` | Text in the three voices | text |
| `media` | Images, icons, players, embedded documents | media |
| `assistant` | Chat and agent interfaces | ai, chat |
| `marketing` | Blocks for public pages | page, text |
| `commerce` | Products, prices, carts | — |
| `application`, `dashboards`, `listings`, `utility` | Templates only, by kind of screen | page |

A component has one category and several tags. The category answers "where do I look for it";
tags answer "what else is like it" across categories (a `DatePicker` is in `forms` and tagged
`date`, like `Scheduler` in `data-display`).

## 4. Names

- **PascalCase, a noun, no brand and no library prefix.** `DataTable`, not `GlTable` or `Grid2`.
- **Use the most widely documented name.** The backlog shows, for each planned component, the
  names other libraries use; the entry takes the commonest one and lists the others as aliases.
- **Suffixes say what kind of control it is**, so related components sort together:

| Suffix | Meaning | Examples |
|---|---|---|
| `…Input` | A text-like field with extra behaviour | NumberInput, PasswordInput, TagsInput, MaskedInput |
| `…Picker` | A field that opens a panel to choose from | DatePicker, TimePicker, ColorPicker, MonthPicker |
| `…Select` | One or several options from a list | NativeSelect, TreeSelect |
| `…Group` | Several of the same control under one value or one border | ButtonGroup, ToggleGroup, CheckboxGroup |
| `…Chart` | A plot | AreaChart, FunnelChart, SankeyChart |
| `…List`, `…Table`, `…Grid`, `…Tree` | The shape of the records shown | MasterList, DataTable, PivotGrid, TreeTable |
| `…Bar` | A horizontal strip | Toolbar, TopBar, ActionBar |
| `…Panel` | A docked region with its own content | FilterPanel, FloatingPanel |
| `…Card` | One record in a ruled box | IndexCard, ProductCard, ChoiceCard |
| `…Form` | A complete form | AuthForm, DataForm |
| `…Template` | A page layout | SettingsTemplate |

- **Families share a file.** Parts that only make sense together are exported from one file named
  after the root: `Dialog.tsx` exports `Dialog`, `DialogContent`, `Drawer`, `Sheet`; `Card.tsx`
  exports `Card`, `CardHeader`, `CardContent`. The catalogue lists them under `exports`.
- **Variants are props, not components.** `Button variant="solid"`, not `SolidButton`.
  A new component is justified by different behaviour, not by different looks.
- **Props**: `value` / `defaultValue` / `onChange` for anything that holds a value (use
  `useControlled`), `tone` for data colour (`Tone`), `size` (`sm` | `md` | `lg`), `variant` for
  looks, `className` passed through, and `aria-label` wherever there is no visible label.
- **CSS**: one block per component, `gl-<kebab-name>`, elements `gl-<name>__<part>`, modifiers
  `gl-<name>--<variant>`. Only `--gl-*` tokens; no hex colours; rows 40px, controls 32px.

## 5. Adding or building a component

1. Find or add its entry in `catalog.ts`: name, layer, category, tags, one-line summary, aliases.
2. Create the three files in `src/<layer>/<category>/` and export it from `src/<layer>/index.ts`.
3. Change the entry from `plan(` to `have(` and run `npm run catalog`: the story gets its title
   and tags, the placeholder is removed and the component leaves `BACKLOG.md`.
4. `npm run check`.
