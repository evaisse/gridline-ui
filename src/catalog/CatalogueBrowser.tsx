import { useMemo, useState } from 'react';
import { Button, Heading, Highlight, Label, Link, Tag, Text } from '../atoms';
import { Empty, SearchField } from '../molecules';
import { FilterPanel, type FilterGroup, type FilterState } from '../organisms';
import { SearchTemplate } from '../templates';
import { SearchIcon } from '../tokens/icons';
import { CATEGORIES, TAGS, type Category, type Layer, type Tag as TagId } from './catalog';
import { categoryTitle, entries, LAYERS, libraries, libraryName, storyHref, tagDescription, type ResolvedEntry } from './data';
import './catalog.css';

export interface CatalogueBrowserProps {
  /** Initial text query. */
  query?: string;
  /** Initial filters, one value each. They can be set from the URL: `&args=tag:date;status:planned`. */
  layer?: Layer;
  status?: 'available' | 'planned';
  category?: Category;
  tag?: TagId;
  /** A library id: only components that library also documents. */
  library?: string;
}

const count = (test: (entry: ResolvedEntry) => boolean) => entries.filter(test).length;
const groups: FilterGroup[] = [
  { id: 'status', title: 'Status', options: [{ value: 'available', label: 'Built', count: count((e) => e.status === 'available') }, { value: 'planned', label: 'Planned', count: count((e) => e.status === 'planned') }] },
  { id: 'layer', title: 'Layer', options: (Object.keys(LAYERS) as Layer[]).map((layer) => ({ value: layer, label: LAYERS[layer], count: count((e) => e.layer === layer) })) },
  { id: 'category', title: 'Category', options: (Object.keys(CATEGORIES) as Category[]).map((id) => ({ value: id, label: categoryTitle(id), count: count((e) => e.category === id) })).filter((option) => option.count > 0) },
  { id: 'tag', title: 'Tag', options: (Object.keys(TAGS) as TagId[]).map((id) => ({ value: id, label: id, count: count((e) => e.tags.includes(id)) })).filter((option) => option.count > 0) },
  { id: 'library', title: 'Also documented by', options: Object.keys(libraries).map((id) => ({ value: id, label: libraryName(id), count: count((e) => e.refs.some((ref) => ref.library === id)) })) },
];

const any = (selected: string[] | undefined, test: (value: string) => boolean) => selected == null || selected.length === 0 || selected.some(test);

/** The whole catalogue, searchable and filterable by status, layer, category, tag and library. */
export function CatalogueBrowser({ query: initialQuery = '', layer, status, category, tag, library }: CatalogueBrowserProps) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<FilterState>(() => Object.fromEntries(Object.entries({ layer, status, category, tag, library }).filter(([, value]) => value).map(([key, value]) => [key, [value as string]])));
  const needle = query.trim().toLowerCase();

  const matches = useMemo(() => entries.filter((entry) =>
    (needle === '' || `${entry.name} ${entry.summary} ${entry.aliases.join(' ')}`.toLowerCase().includes(needle))
    && any(filters.status, (value) => entry.status === value)
    && any(filters.layer, (value) => entry.layer === value)
    && any(filters.category, (value) => entry.category === value)
    && (filters.tag ?? []).every((value) => entry.tags.includes(value as TagId))
    && any(filters.library, (value) => entry.refs.some((ref) => ref.library === value))), [needle, filters]);

  const toggleTag = (id: string) => {
    const current = filters.tag ?? [];
    setFilters({ ...filters, tag: current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id] });
  };

  return (
    <SearchTemplate
      search={
        <>
          <Heading level={1} size="xl">Component catalogue</Heading>
          <Text tone="muted">{entries.length} components, built or planned, matched against {Object.keys(libraries).length} libraries. Tags combine: a component must carry every selected tag.</Text>
          <div style={{ maxWidth: 720, paddingBottom: 16 }}>
            <SearchField variant="ruled" placeholder="Name, purpose or the name another library uses" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </>
      }
      filters={<FilterPanel groups={groups} value={filters} onChange={setFilters} />}
      summary={
        <>
          <Label tone="ink">{matches.length} of {entries.length} components</Label>
          <Label>{matches.filter((entry) => entry.status === 'planned').length} planned</Label>
        </>
      }
    >
      {matches.length === 0 && <Empty style={{ border: 0 }} icon={<SearchIcon />} title="Nothing matches" description="Remove a filter or shorten the search." action={<Button onClick={() => { setFilters({}); setQuery(''); }}>Clear everything</Button>} />}
      {matches.map((entry) => (
        <article key={entry.name} className="gl-catalogue__row" data-status={entry.status}>
          <div className="gl-catalogue__head">
            {entry.storyId != null
              ? <a className="gl-catalogue__name" href={storyHref(entry.storyId)} target="_top"><Highlight query={query}>{entry.name}</Highlight></a>
              : <span className="gl-catalogue__name"><Highlight query={query}>{entry.name}</Highlight></span>}
            <Label>{LAYERS[entry.layer]} · {categoryTitle(entry.category)}</Label>
            {entry.status === 'planned' ? <Tag dot tone="warn">Planned</Tag> : <Tag dot tone="pos">Built</Tag>}
            <span className="gl-catalogue__chips" style={{ marginLeft: 'auto' }}>
              {entry.tags.map((id) => <button key={id} type="button" className="gl-catalogue__chip" aria-pressed={(filters.tag ?? []).includes(id)} title={tagDescription(id)} onClick={() => toggleTag(id)}>{id}</button>)}
            </span>
          </div>
          <Text variant="small" tone="muted"><Highlight query={query}>{entry.summary}</Highlight></Text>
          {entry.refs.length > 0 && (
            <div className="gl-catalogue__refs">
              {entry.refs.map((ref) => <Link key={ref.url} variant="plain" external href={ref.url} title={ref.slug}>{libraryName(ref.library)}{normalised(ref.slug) !== entry.name.toLowerCase() && ` · ${ref.slug.split('/').pop()}`}</Link>)}
            </div>
          )}
        </article>
      ))}
    </SearchTemplate>
  );
}

const normalised = (slug: string) => (slug.split('/').pop() ?? '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
