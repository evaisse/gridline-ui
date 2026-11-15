import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Checkbox, Heading, Label, NativeSelect, Numeric, Radio, RadioGroup, Slider, Switch, Tag, Text } from '../atoms';
import { Empty, InputGroup, Pagination, SearchField, Tabs } from '../molecules';
import { SearchTemplate } from '../templates';
import { SearchIcon, XIcon } from '../tokens/icons';
import { searchCategories, searchLicences, searchResults, type SearchResult } from './appFixtures';

const statusTone = { Stable: 'pos', Beta: 'info', Deprecated: 'warn' } as const;
const scopes = [{ id: 'packages', label: 'Packages' }, { id: 'docs', label: 'Documentation' }, { id: 'maintainers', label: 'Maintainers' }];
const ages = [{ id: 'any', label: 'Any time', days: Infinity }, { id: '30', label: 'Last 30 days', days: 30 }, { id: '90', label: 'Last 90 days', days: 90 }];
const PAGE_SIZE = 6;

const toggle = (list: string[], item: string) => (list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]);
const count = (key: 'category' | 'licence', value: string) => searchResults.filter((result) => result[key] === value).length;

/** One facet: a titled block ruled off from the next. */
function Facet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: 12, padding: 16, borderBottom: '1px solid var(--gl-rule)' }}>
      <Label tone="ink">{title}</Label>
      {children}
    </div>
  );
}

function Option({ label, total, children }: { label: string; total?: number; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
      {children}
      <Text variant="small" style={{ flex: 1 }}>{label}</Text>
      {total != null && <Label size="xs">{total}</Label>}
    </label>
  );
}

function Result({ result }: { result: SearchResult }) {
  return (
    <article style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 8, padding: 16, borderBottom: '1px solid var(--gl-rule)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Heading level={3} size="lg"><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{result.name}</a></Heading>
        <Label>{result.version}</Label>
        <Tag dot tone={statusTone[result.status]}>{result.status}</Tag>
        <span style={{ marginLeft: 'auto' }}><Numeric unit="%">{result.score}</Numeric></span>
      </div>
      <Text tone="muted">{result.description}</Text>
      <Label size="xs" style={{ whiteSpace: 'normal', lineHeight: 1.6 }}>{result.category} · {result.licence} · {result.installs} installs / week · updated {result.updated}{result.typed ? ' · types bundled' : ''}</Label>
    </article>
  );
}

function Search() {
  const [query, setQuery] = useState('pars');
  const [scope, setScope] = useState('packages');
  const [categories, setCategories] = useState<string[]>([]);
  const [licences, setLicences] = useState<string[]>([]);
  const [minScore, setMinScore] = useState(40);
  const [age, setAge] = useState('any');
  const [typed, setTyped] = useState(false);
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);

  const maxAge = ages.find((item) => item.id === age)?.days ?? Infinity;
  const needle = query.trim().toLowerCase();
  const matches = searchResults
    .filter((result) =>
      (needle === '' || `${result.name} ${result.description}`.toLowerCase().includes(needle))
      && (categories.length === 0 || categories.includes(result.category))
      && (licences.length === 0 || licences.includes(result.licence))
      && result.score >= minScore && result.age <= maxAge && (!typed || result.typed))
    .sort((a, b) => (sort === 'score' ? b.score - a.score : sort === 'recent' ? a.age - b.age : Number(b.name.includes(needle)) - Number(a.name.includes(needle))));
  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const active = [...categories, ...licences];
  const clear = () => { setCategories([]); setLicences([]); setMinScore(0); setAge('any'); setTyped(false); setPage(1); };

  return (
    <SearchTemplate
      search={
        <>
          <Heading level={1} size="xl">Search the registry</Heading>
          <InputGroup style={{ maxWidth: 720 }}>
            <SearchField variant="ruled" placeholder="Package name or keyword" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
            <Button variant="solid" icon={<SearchIcon />}>Search</Button>
          </InputGroup>
          <div style={{ overflowX: 'auto' }}><Tabs items={scopes} value={scope} onChange={setScope} fill={false} style={{ border: 0, background: 'transparent', width: 'max-content' }} /></div>
        </>
      }
      filters={
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 40, padding: '0 16px', borderBottom: '1px solid var(--gl-rule-strong)' }}>
            <Label>Filters</Label>
            <Button variant="ghost" size="sm" onClick={clear}>Clear all</Button>
          </div>
          <Facet title="Category">
            {searchCategories.map((item) => (
              <Option key={item} label={item} total={count('category', item)}>
                <Checkbox checked={categories.includes(item)} onCheckedChange={() => { setCategories(toggle(categories, item)); setPage(1); }} aria-label={item} />
              </Option>
            ))}
          </Facet>
          <Facet title="Licence">
            {searchLicences.map((item) => (
              <Option key={item} label={item} total={count('licence', item)}>
                <Checkbox checked={licences.includes(item)} onCheckedChange={() => { setLicences(toggle(licences, item)); setPage(1); }} aria-label={item} />
              </Option>
            ))}
          </Facet>
          <Facet title="Minimum score">
            <Slider value={[minScore]} min={0} max={80} step={5} onValueChange={([value]) => { setMinScore(value); setPage(1); }} thumbLabels={['Minimum score']} />
            <Numeric unit="%">{minScore}</Numeric>
          </Facet>
          <Facet title="Last release">
            <RadioGroup value={age} onValueChange={(value) => { setAge(value); setPage(1); }} aria-label="Last release">
              {ages.map((item) => <Option key={item.id} label={item.label}><Radio value={item.id} aria-label={item.label} /></Option>)}
            </RadioGroup>
          </Facet>
          <Facet title="Types">
            <Option label="Type definitions bundled"><Switch checked={typed} onCheckedChange={(value) => { setTyped(value); setPage(1); }} aria-label="Type definitions bundled" /></Option>
          </Facet>
        </>
      }
      summary={
        <>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <Label tone="ink">{matches.length} result{matches.length === 1 ? '' : 's'}{needle && ` for “${query.trim()}”`}</Label>
            {active.map((item) => (
              <Tag key={item}>
                {item}
                <button type="button" aria-label={`Remove ${item}`} onClick={() => { setCategories(categories.filter((entry) => entry !== item)); setLicences(licences.filter((entry) => entry !== item)); }} style={{ all: 'unset', display: 'grid', cursor: 'pointer' }}>
                  <XIcon width={10} height={10} />
                </button>
              </Tag>
            ))}
          </div>
          <NativeSelect aria-label="Sort by" value={sort} onChange={(event) => setSort(event.target.value)} style={{ width: 180 }}>
            <option value="relevance">Most relevant</option><option value="score">Highest score</option><option value="recent">Recently updated</option>
          </NativeSelect>
        </>
      }
      footer={
        <>
          <Label>Page {current} of {pageCount}</Label>
          <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
        </>
      }
    >
      {matches.length === 0
        ? <Empty style={{ border: 0 }} icon={<SearchIcon />} title="Nothing matches" description="Remove a filter or lower the minimum score." action={<Button onClick={clear}>Clear all filters</Button>} />
        : matches.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE).map((result) => <Result key={result.name} result={result} />)}
    </SearchTemplate>
  );
}

const meta = { title: 'Pages/Search', component: Search, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Search>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
