import type { Meta, StoryObj } from '@storybook/react-vite';
import { CATEGORIES, TAGS } from './catalog';
import { CatalogueBrowser } from './CatalogueBrowser';
import { libraries } from './data';
import { Libraries as LibrariesTable } from './Libraries';
import { UnclassifiedReferences } from './UnclassifiedReferences';

const optional = (values: string[]) => ({ control: 'select' as const, options: [undefined, ...values] });

const meta = {
  title: 'Catalogue',
  component: CatalogueBrowser,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    layer: optional(['atoms', 'molecules', 'organisms', 'templates']),
    status: optional(['available', 'planned']),
    category: optional(Object.keys(CATEGORIES)),
    tag: optional(Object.keys(TAGS)),
    library: optional(Object.keys(libraries)),
  },
} satisfies Meta<typeof CatalogueBrowser>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Every component, built or planned. Click a name to open its story, a tag to filter on it. */
export const Browse: Story = {};
/** What is not built yet, with the libraries that document it. */
export const Planned: Story = { args: { status: 'planned' } };
/** Harvested documentation pages that no entry claims yet. */
export const Unclassified: Story = { render: () => <UnclassifiedReferences />, parameters: { layout: 'fullscreen' } };
/** The libraries behind the references: stack, platform, licence and how much of each is matched. */
export const Libraries: Story = { render: () => <LibrariesTable />, parameters: { layout: 'fullscreen' } };
