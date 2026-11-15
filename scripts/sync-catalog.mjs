// Applies src/catalog/catalog.ts to the rest of the repository.
//
//   node scripts/sync-catalog.mjs           write
//   node scripts/sync-catalog.mjs --check   write nothing, exit 1 if anything is out of date
//
// 1. Matches each catalogue entry with the documentation pages harvested from other libraries
//    (src/catalog/sources.generated.json) and writes src/catalog/catalog.generated.json.
// 2. Sets the `title` and `tags` of every component story from its entry, so that Storybook
//    folders are `Layer/Category/Name` and tags follow the catalogue.
// 3. Writes one placeholder story per planned entry under src/catalog/planned/.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { catalog, CATEGORIES, TAGS } from '../src/catalog/catalog.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const check = process.argv.includes('--check');
const LAYERS = { atoms: 'Atoms', molecules: 'Molecules', organisms: 'Organisms', templates: 'Templates' };
const problems = [];
const stale = [];

const write = (path, content) => {
  const current = existsSync(root + path) ? readFileSync(root + path, 'utf8') : null;
  if (current === content) return;
  if (check) stale.push(path); else writeFileSync(root + path, content);
};

/** `date-picker`, `DatePicker` and `forms/date-picker` all become `datepicker`. */
const normalise = (slug) => slug.split('/').pop().replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
/** Storybook's own id rule: lowercase, runs of other characters become one dash. */
const sanitise = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** `WithTabs` → `with-tabs`, as Storybook derives a story id from its export name. */
const exportToId = (name) => sanitise(name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'));

/* 1. References */

for (const item of catalog) {
  if (!(item.category in CATEGORIES)) problems.push(`${item.name}: unknown category "${item.category}"`);
  for (const tag of item.tags) if (!(tag in TAGS)) problems.push(`${item.name}: unknown tag "${tag}"`);
}

const sources = JSON.parse(readFileSync(`${root}src/catalog/sources.generated.json`, 'utf8')).libraries;
const byAlias = new Map();
for (const item of catalog) for (const alias of item.aliases) {
  if (byAlias.has(alias)) problems.push(`alias "${alias}" is claimed by both ${byAlias.get(alias).name} and ${item.name}`);
  byAlias.set(alias, item);
}

const refs = new Map(catalog.map((item) => [item.name, []]));
const unclassified = [];
for (const [library, { components }] of Object.entries(sources)) {
  for (const { slug, url } of components) {
    const owner = byAlias.get(normalise(slug));
    if (owner) refs.get(owner.name).push({ library, slug, url }); else unclassified.push({ library, slug, url });
  }
}

/* 2. Story titles and tags */

const titleOf = (item) => `${LAYERS[item.layer]}/${CATEGORIES[item.category].title}/${item.story ?? item.name}`;
const tagList = (tags) => `[${tags.map((tag) => `'${tag}'`).join(', ')}]`;
const storyIds = new Map();

for (const layer of Object.keys(LAYERS)) {
  for (const file of readdirSync(`${root}src/${layer}`).filter((name) => name.endsWith('.stories.tsx')).sort()) {
    const path = `src/${layer}/${file}`;
    const source = readFileSync(root + path, 'utf8');
    const match = source.match(/title: '((?:Atoms|Molecules|Organisms|Templates)\/[^']*)'(?:, tags: \[[^\]]*\])?/);
    if (!match) { problems.push(`${path}: no title found`); continue; }
    const storyName = match[1].split('/').pop();
    const owners = catalog.filter((item) => item.layer === layer && item.status === 'available' && item.story !== null && (item.story ?? item.name) === storyName);
    if (owners.length === 0) { problems.push(`${path}: no catalogue entry for story "${storyName}" in ${layer}`); continue; }
    const title = titleOf(owners[0]);
    const tags = [...new Set(owners.flatMap((item) => item.tags))];
    write(path, source.replace(match[0], `title: '${title}', tags: ${tagList(tags)}`));
    const first = source.match(/^export const (\w+)/m);
    if (first) for (const owner of owners) storyIds.set(owner.name, `${sanitise(title)}--${exportToId(first[1])}`);
  }
}
for (const item of catalog) {
  if (item.status === 'available' && item.story !== null && !storyIds.has(item.name)) problems.push(`${item.name}: marked available but no story titled "${item.story ?? item.name}" in ${item.layer}`);
}

/* 3. Placeholders for planned components */

const plannedDir = 'src/catalog/planned/';
const planned = catalog.filter((item) => item.status === 'planned');
const expected = new Set();
const libraryName = (id) => sources[id]?.name ?? id;
for (const item of planned) {
  const file = `${plannedDir}${LAYERS[item.layer]}.${item.name}.stories.tsx`;
  expected.add(file.slice(plannedDir.length));
  const title = titleOf(item);
  storyIds.set(item.name, `${sanitise(title)}--planned`);
  const links = refs.get(item.name);
  const seeAlso = links.length > 0
    ? links.map((ref) => ` * @see ${ref.url} ${libraryName(ref.library)}`).join('\n')
    : ' * No documentation page was matched in the harvested libraries.';
  write(file, `// Generated by scripts/sync-catalog.mjs from src/catalog/catalog.ts. Do not edit: change the catalogue entry instead.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '../Placeholder';

/**
 * ${item.name} — planned ${item.layer.slice(0, -1)}, not built yet.
 * ${item.summary}
 *
${seeAlso}
 */
const meta = {
  title: '${title}',
  component: Placeholder,
  tags: ${tagList(['planned', ...item.tags])},
  args: { name: '${item.name}' },
} satisfies Meta<typeof Placeholder>;
export default meta;

export const Planned: StoryObj<typeof meta> = {};
`);
}
if (existsSync(root + plannedDir)) {
  for (const file of readdirSync(root + plannedDir)) {
    if (expected.has(file)) continue;
    if (check) stale.push(plannedDir + file); else rmSync(root + plannedDir + file);
  }
} else if (!check) mkdirSync(root + plannedDir, { recursive: true });

/* Output */

const generated = {
  note: 'Generated by scripts/sync-catalog.mjs from catalog.ts and sources.generated.json. Do not edit by hand.',
  libraries: Object.fromEntries(Object.entries(sources).map(([id, lib]) => [id, { name: lib.name, components: lib.components.length }])),
  entries: catalog.map((item) => ({ ...item, title: titleOf(item), storyId: storyIds.get(item.name) ?? null, refs: refs.get(item.name) })),
  unclassified,
};
write('src/catalog/catalog.generated.json', `${JSON.stringify(generated, null, 1)}\n`);

const matched = [...refs.values()].reduce((total, list) => total + list.length, 0);
console.log(`${catalog.length} entries (${catalog.length - planned.length} available, ${planned.length} planned), ${matched} references matched, ${unclassified.length} unclassified.`);
for (const problem of problems) console.error(`problem  ${problem}`);
for (const path of stale) console.error(`stale    ${path}`);
if (stale.length > 0) console.error('Run `npm run catalog` to update.');
if (problems.length > 0 || stale.length > 0) process.exit(1);
