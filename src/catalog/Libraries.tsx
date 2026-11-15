import { Heading, Label, Link, Numeric, Text } from '../atoms';
import { DataTable, type Column } from '../organisms';
import { directoryDate, entries, libraries, unclassified, type Library } from './data';

interface Row extends Library {
  id: string;
  matched: number;
  unclaimed: number;
}

const rows: Row[] = Object.entries(libraries).map(([id, library]) => ({
  id, ...library,
  matched: entries.reduce((total, entry) => total + entry.refs.filter((ref) => ref.library === id).length, 0),
  unclaimed: unclassified.filter((ref) => ref.library === id).length,
}));

const origin = { harvest: 'Site', directory: 'Directory', both: 'Both' } as const;
const columns: Column<Row>[] = [
  { key: 'name', header: 'Library', render: (row) => (row.url ? <Link external href={row.url}>{row.name}</Link> : row.name), sortValue: (row) => row.name.toLowerCase() },
  { key: 'stack', header: 'Stack', render: (row) => row.stack ?? '—', sortValue: (row) => row.stack ?? '' },
  { key: 'platform', header: 'Platform', render: (row) => row.platform ?? '—', sortValue: (row) => row.platform ?? '' },
  { key: 'license', header: 'Licence', render: (row) => row.license ?? '—', sortValue: (row) => row.license ?? '' },
  { key: 'origin', header: 'Source', width: '100px', render: (row) => <Label>{origin[row.origin]}</Label>, sortValue: (row) => row.origin },
  { key: 'components', header: 'Pages', numeric: true, width: '90px', render: (row) => <Numeric>{row.components}</Numeric>, sortValue: (row) => row.components },
  { key: 'matched', header: 'Matched', numeric: true, width: '100px', render: (row) => <Numeric>{row.matched}</Numeric>, sortValue: (row) => row.matched },
  { key: 'unclaimed', header: 'Unclaimed', numeric: true, width: '110px', render: (row) => <Numeric>{row.unclaimed}</Numeric>, sortValue: (row) => row.unclaimed },
];

/** Every library the catalogue draws on, with how many of its pages are matched to an entry. */
export function Libraries() {
  const pages = rows.reduce((total, row) => total + row.components, 0);
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'grid', gap: 8, maxWidth: 760 }}>
        <Heading level={1} size="xl">Libraries</Heading>
        <Text tone="muted">
          {rows.length} libraries and {pages} documented components. “Site” lists come from the libraries’ own documentation sites; “Directory” lists come from the imported
          UI component directory{directoryDate ? ` dated ${directoryDate}` : ''}, which also provides stack, platform and licence.
        </Text>
      </div>
      <DataTable columns={columns} rows={rows} rowKey={(row) => row.id} defaultSort={{ key: 'components', direction: 'desc' }} caption="Click a column to sort" />
    </div>
  );
}
