import { Heading, Label, Link, Text } from '../atoms';
import { libraries, libraryName, unclassified } from './data';
import './catalog.css';

/** Documentation pages harvested from other libraries that no catalogue entry claims yet. */
export function UnclassifiedReferences() {
  const ids = Object.keys(libraries).filter((id) => unclassified.some((ref) => ref.library === id));
  return (
    <div style={{ maxWidth: 960, border: '1px solid var(--gl-rule-strong)' }}>
      <div className="gl-catalogue__group" style={{ display: 'grid', gap: 8, background: 'var(--gl-surface-1)' }}>
        <Heading level={1} size="xl">Unclassified references</Heading>
        <Text tone="muted">{unclassified.length} pages were found in other libraries without a matching catalogue entry. To claim one, add its name to the aliases of an entry in src/catalog/catalog.ts, or add a planned entry for it.</Text>
      </div>
      {ids.map((id) => {
        const refs = unclassified.filter((ref) => ref.library === id);
        return (
          <section key={id} className="gl-catalogue__group">
            <Label tone="ink">{libraryName(id)} · {refs.length}</Label>
            <div className="gl-catalogue__refs">{refs.map((ref) => <Link key={ref.url} variant="plain" external href={ref.url}>{ref.slug.split('/').pop()}</Link>)}</div>
          </section>
        );
      })}
    </div>
  );
}
