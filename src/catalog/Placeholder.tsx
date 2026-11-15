import { Heading, Label, Link, Tag, Text } from '../atoms';
import { KeyValue } from '../molecules';
import { categoryTitle, entries, findEntry, LAYERS, libraryName, storyHref, tagDescription } from './data';
import './catalog.css';

export interface PlaceholderProps {
  /** The catalogue entry to describe. */
  name: string;
}

/** Stands in for a component that is in the catalogue but not built: what it is, where it is documented elsewhere. */
export function Placeholder({ name }: PlaceholderProps) {
  const entry = findEntry(name);
  if (!entry) return <Text>No catalogue entry named “{name}”.</Text>;
  const related = entries.filter((other) => other.name !== entry.name && other.category === entry.category && other.status === 'available' && other.storyId && other.tags.some((tag) => entry.tags.includes(tag))).slice(0, 8);

  return (
    <article className="gl-placeholder">
      <header className="gl-placeholder__head gl-hatch">
        <div className="gl-placeholder__title">
          <Label>{LAYERS[entry.layer]} · {categoryTitle(entry.category)}</Label>
          <Heading level={1} size="xl">{entry.name}</Heading>
          <Tag tone="warn" dot>Planned</Tag>
        </div>
      </header>
      <div className="gl-placeholder__body">
        <Text variant="lead">{entry.summary}</Text>
        <KeyValue label="Tags">
          <span className="gl-catalogue__chips">
            {entry.tags.map((tag) => <a key={tag} className="gl-catalogue__chip" href={storyHref('catalogue--browse', { tag })} target="_top" title={tagDescription(tag)}>{tag}</a>)}
          </span>
        </KeyValue>
        {entry.aliases.length > 0 && <KeyValue label="Also called">{entry.aliases.join(', ')}</KeyValue>}
        <div className="gl-placeholder__section">
          <Label tone="ink">References · {entry.refs.length}</Label>
          {entry.refs.length === 0 && <Text tone="muted">No documentation page was matched in the harvested libraries.</Text>}
          <ul className="gl-placeholder__refs">
            {entry.refs.map((ref) => (
              <li key={ref.url}><Label>{libraryName(ref.library)}</Label><Link external href={ref.url}>{ref.slug}</Link></li>
            ))}
          </ul>
        </div>
        {related.length > 0 && (
          <div className="gl-placeholder__section">
            <Label tone="ink">Built components nearby</Label>
            <span className="gl-catalogue__chips">
              {related.map((other) => <a key={other.name} className="gl-catalogue__chip" href={storyHref(other.storyId!)} target="_top">{other.name}</a>)}
            </span>
          </div>
        )}
        <Text variant="small" tone="muted">To build it: write the component in src/{entry.layer}, change its catalogue entry from plan( to have(, then run npm run catalog.</Text>
      </div>
    </article>
  );
}
