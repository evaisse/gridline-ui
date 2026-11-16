// Applies src/catalog/catalog.ts to the rest of the repository.
//
//   node scripts/sync-catalog.mjs           write
//   node scripts/sync-catalog.mjs --check   write nothing, exit 1 if anything is out of date
//
// 1. Matches each catalogue entry with the documentation pages of other libraries, from the
//    harvest (src/catalog/sources.generated.json) and from the imported UI component directory
//    (src/catalog/import/repertoire-ui.json), and writes src/catalog/catalog.generated.json.
// 2. Sets the `title` and `tags` of every component story from its entry, so that Storybook
//    folders are `Layer/Category/Name` and tags follow the catalogue.
// 3. Writes one placeholder story per planned entry under src/catalog/planned/.
// 4. Writes src/catalog/BACKLOG.md: the planned entries ordered by how many libraries document them.
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

// Two sources of references: pages harvested from documentation sites, and the UI component
// directory imported from repertoire-ui.sqlite. A library present in both is merged, by URL.
const harvested = JSON.parse(readFileSync(`${root}src/catalog/sources.generated.json`, 'utf8')).libraries;
const directoryPath = `${root}src/catalog/import/repertoire-ui.json`;
const directory = existsSync(directoryPath) ? JSON.parse(readFileSync(directoryPath, 'utf8')) : { libraries: {} };
/** Directory ids that name a library the harvest already knows under another id. */
const SAME_LIBRARY = { 'ant-design': 'antd' };

const sources = {};
for (const [id, lib] of Object.entries(harvested)) sources[id] = { name: lib.name, origin: 'harvest', components: lib.components.map((item) => ({ ...item })) };
for (const [directoryId, lib] of Object.entries(directory.libraries)) {
  const id = SAME_LIBRARY[directoryId] ?? directoryId;
  const target = sources[id] ??= { name: lib.name, origin: 'directory', components: [] };
  if (target.origin === 'harvest') target.origin = 'both';
  Object.assign(target, { stack: lib.stack, platform: lib.platform, license: lib.license, maturity: lib.maturity, description: lib.description, url: lib.url });
  const known = new Map(target.components.map((item) => [item.url.replace(/\/$/, ''), item]));
  for (const item of lib.components) {
    const existing = known.get(item.url.replace(/\/$/, ''));
    if (existing) existing.category = item.category; else target.components.push({ slug: item.name, url: item.url, category: item.category });
  }
}

const byAlias = new Map();
for (const item of catalog) for (const alias of item.aliases) {
  if (byAlias.has(alias)) problems.push(`alias "${alias}" is claimed by both ${byAlias.get(alias).name} and ${item.name}`);
  byAlias.set(alias, item);
}

/**
 * The names to try for one documented component, most specific first. Libraries decorate names:
 * a vendor prefix (RadzenButton, Ext.Button), a version (BorderBeam6.4.0), a note in brackets,
 * a plural, or a suffix such as Control or View.
 */
const candidates = (slug) => {
  const base = normalise(slug.replace(/\s*\(.*?\)/g, '').replace(/\d+(\.\d+)+$/, '').replace(/^(Radzen|Ext\.(?:[a-z]+\.)*)/, ''));
  const names = [normalise(slug), base];
  for (const suffix of ['s', 'control', 'component', 'widget', 'view', 'es']) if (base.endsWith(suffix) && base.length > suffix.length + 2) names.push(base.slice(0, -suffix.length));
  return [...new Set(names)];
};

const refs = new Map(catalog.map((item) => [item.name, []]));
const unclassified = [];
for (const [library, { components }] of Object.entries(sources)) {
  for (const { slug, url, category } of components) {
    const owner = candidates(slug).map((name) => byAlias.get(name)).find(Boolean);
    const ref = category ? { library, slug, url, category } : { library, slug, url };
    if (owner) refs.get(owner.name).push(ref); else unclassified.push(ref);
  }
}

/* 2. Story titles and tags */

const titleOf = (item) => `${LAYERS[item.layer]}/${CATEGORIES[item.category].title}/${item.story ?? item.name}`;
const tagList = (tags) => `[${tags.map((tag) => `'${tag}'`).join(', ')}]`;
const storyIds = new Map();

for (const layer of Object.keys(LAYERS)) {
  // Components live in src/<layer>/<category>/. The folder must be the entry's category.
  const files = readdirSync(`${root}src/${layer}`, { recursive: true }).map((name) => name.replaceAll('\\', '/')).filter((name) => name.endsWith('.stories.tsx')).sort();
  for (const file of files) {
    const path = `src/${layer}/${file}`;
    const source = readFileSync(root + path, 'utf8');
    const match = source.match(/title: '((?:Atoms|Molecules|Organisms|Templates)\/[^']*)'(?:, tags: \[[^\]]*\])?/);
    if (!match) { problems.push(`${path}: no title found`); continue; }
    const storyName = match[1].split('/').pop();
    const owners = catalog.filter((item) => item.layer === layer && item.status === 'available' && item.story !== null && (item.story ?? item.name) === storyName);
    if (owners.length === 0) { problems.push(`${path}: no catalogue entry for story "${storyName}" in ${layer}`); continue; }
    const title = titleOf(owners[0]);
    if (file.split('/')[0] !== owners[0].category) problems.push(`${path}: ${owners[0].name} is in category "${owners[0].category}", so it belongs in src/${layer}/${owners[0].category}/`);
    const tags = [...new Set(owners.flatMap((item) => item.tags))];
    write(path, source.replace(match[0], `title: '${title}', tags: ${tagList(tags)}`));
    const first = source.match(/^export const (\w+)/m);
    if (first) for (const owner of owners) storyIds.set(owner.name, `${sanitise(title)}--${exportToId(first[1])}`);
  }
}
for (const item of catalog) {
  if (item.status === 'available' && item.story !== null && !storyIds.has(item.name)) problems.push(`${item.name}: marked available but no story titled "${item.story ?? item.name}" in ${item.layer}`);
}

/* 2b. One CSS block per component: two stylesheets must not open with the same `gl-` block */

const blocks = new Map();
for (const layer of Object.keys(LAYERS)) {
  for (const file of readdirSync(`${root}src/${layer}`, { recursive: true }).map((name) => name.replaceAll('\\', '/')).filter((name) => name.endsWith('.css')).sort()) {
    const block = readFileSync(`${root}src/${layer}/${file}`, 'utf8').match(/\.(gl-[a-z0-9]+(?:-[a-z0-9]+)*)/)?.[1];
    if (!block) continue;
    if (blocks.has(block)) problems.push(`CSS block ".${block}" is opened by both ${blocks.get(block)} and src/${layer}/${file}: their styles would mix`);
    else blocks.set(block, `src/${layer}/${file}`);
  }
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
  directoryDate: directory.generatedAt ?? null,
  libraries: Object.fromEntries(Object.entries(sources).map(([id, { components, ...lib }]) => [id, { ...lib, components: components.length }])),
  entries: catalog.map((item) => ({ ...item, title: titleOf(item), storyId: storyIds.get(item.name) ?? null, refs: refs.get(item.name) })),
  unclassified,
};
write('src/catalog/catalog.generated.json', `${JSON.stringify(generated, null, 1)}\n`);

/* 4. Backlog: what is still missing, most widely documented first */

const popularity = (item) => new Set(refs.get(item.name).map((ref) => ref.library)).size;
const backlog = planned.map((item) => ({ item, libraries: popularity(item), pages: refs.get(item.name).length }))
  .sort((a, b) => b.libraries - a.libraries || b.pages - a.pages || a.item.name.localeCompare(b.item.name));
const libraryTotal = Object.keys(sources).length;
const also = (item) => [...new Set(refs.get(item.name).map((ref) => ref.slug.split('/').pop().replace(/^(Radzen|Ext\.(?:[a-z]+\.)*)/, '')))].filter((name) => normalise(name) !== normalise(item.name)).slice(0, 4).join(', ');
const row = ({ item, libraries, pages }, index) => `| ${index + 1} | ${item.name} | ${LAYERS[item.layer]} / ${CATEGORIES[item.category].title} | ${libraries} | ${pages} | ${also(item) || '—'} | ${item.summary} |`;
const tier = (title, note, rows, offset) => rows.length === 0 ? '' : `## ${title}\n\n${note}\n\n| # | Component | Folder | Libraries | Pages | Also called | What it is |\n|---:|---|---|---:|---:|---|---|\n${rows.map((entry, i) => row(entry, offset + i)).join('\n')}\n\n`;
const p1 = backlog.filter((entry) => entry.libraries >= 15);
const p2 = backlog.filter((entry) => entry.libraries >= 5 && entry.libraries < 15);
const p3 = backlog.filter((entry) => entry.libraries >= 1 && entry.libraries < 5);
const p4 = backlog.filter((entry) => entry.libraries === 0);
write('src/catalog/BACKLOG.md', `# Component backlog

Generated by \`npm run catalog\` from \`catalog.ts\`. Do not edit by hand: change the catalogue instead.

${planned.length === 0 ? 'Every component in the catalogue is built. New `plan(` entries will be listed here' : `${planned.length} components are in the catalogue and not built yet. They are listed`}, ordered by popularity:
the number of libraries, out of the ${libraryTotal} the catalogue draws on, that document the same component.
"Pages" counts documentation pages, which is higher when a library splits the component in several.
Ties are broken by pages, then by name. A component leaves this list when its entry changes from \`plan(\` to \`have(\`.

${tier('Priority 1 — documented by 15 libraries or more', 'Expected in any general-purpose library.', p1, 0)}${tier('Priority 2 — 5 to 14 libraries', 'Common in the larger suites.', p2, p1.length)}${tier('Priority 3 — 1 to 4 libraries', 'Specialised.', p3, p1.length + p2.length)}${tier('Priority 4 — Gridline compositions', 'Not a named component elsewhere: blocks and page templates assembled from built components.', p4, p1.length + p2.length + p3.length)}`);

const matched = [...refs.values()].reduce((total, list) => total + list.length, 0);
console.log(`${catalog.length} entries (${catalog.length - planned.length} available, ${planned.length} planned), ${matched} references matched, ${unclassified.length} unclassified.`);
for (const problem of problems) console.error(`problem  ${problem}`);
for (const path of stale) console.error(`stale    ${path}`);
if (stale.length > 0) console.error('Run `npm run catalog` to update.');
if (problems.length > 0 || stale.length > 0) process.exit(1);
