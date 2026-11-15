import generated from './catalog.generated.json';
import { CATEGORIES, TAGS, type CatalogEntry, type Category, type Layer, type Tag } from './catalog';

export interface Reference {
  /** Library id, a key of `libraries`. */
  library: string;
  /** The component's name or path in that library. */
  slug: string;
  url: string;
  /** The category given by the imported directory, when the page comes from it. */
  category?: string;
}

/** A catalogue entry with its Storybook location and its matched documentation pages. */
export interface ResolvedEntry extends CatalogEntry {
  title: string;
  storyId: string | null;
  refs: Reference[];
}

export const entries = generated.entries as ResolvedEntry[];
export interface Library {
  name: string;
  /** Number of documented components known for it. */
  components: number;
  /** Where its list comes from: the site harvest, the imported directory, or both. */
  origin: 'harvest' | 'directory' | 'both';
  stack?: string;
  platform?: string;
  license?: string;
  maturity?: string;
  description?: string;
  url?: string;
}

export const libraries = generated.libraries as Record<string, Library>;
/** The date of the imported UI component directory. */
export const directoryDate = generated.directoryDate as string | null;
/** Harvested documentation pages that no entry claims yet. */
export const unclassified = generated.unclassified as Reference[];

export const LAYERS: Record<Layer, string> = { atoms: 'Atoms', molecules: 'Molecules', organisms: 'Organisms', templates: 'Templates' };
export const categoryTitle = (id: Category) => CATEGORIES[id].title;
export const tagDescription = (id: Tag) => TAGS[id];
export const libraryName = (id: string) => libraries[id]?.name ?? id;
export const findEntry = (name: string) => entries.find((entry) => entry.name === name);

/** A link to a story that works from inside the preview frame, on any base path. */
export const storyHref = (storyId: string, args?: Record<string, string>) => {
  const suffix = args ? `&args=${Object.entries(args).map(([key, value]) => `${key}:${encodeURIComponent(value)}`).join(';')}` : '';
  return `./?path=/story/${storyId}${suffix}`;
};
