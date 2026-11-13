import { useMemo, useState, type ReactNode } from 'react';
import { Label } from '../atoms';
import { ListRow, SearchField } from '../molecules';
import { cx } from '../utils/cx';
import './MasterList.css';

export interface MasterListItem {
  id: string;
  title: string;
  meta?: ReactNode;
  icon?: ReactNode;
  trailing?: ReactNode;
}

export interface MasterListProps {
  items: MasterListItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** Column heads shown above the rows. */
  metaHeader?: string;
  titleHeader?: string;
  searchable?: boolean;
  /** Rendered above the search field, typically a Toolbar of filters. */
  filters?: ReactNode;
  className?: string;
}

/** The left side of a master–detail view: filters, search, and a dense list. */
export function MasterList({ items, selectedId, onSelect, metaHeader, titleHeader, searchable = true, filters, className }: MasterListProps) {
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((item) => item.title.toLowerCase().includes(q)) : items;
  }, [items, query]);

  return (
    <div className={cx('gl-master-list', className)}>
      {filters}
      {searchable && (
        <div className="gl-master-list__search">
          <SearchField value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      )}
      {(metaHeader || titleHeader) && (
        <div className="gl-master-list__head">
          {metaHeader && <Label className="gl-master-list__meta-head">{metaHeader}</Label>}
          {titleHeader && <Label>{titleHeader}</Label>}
        </div>
      )}
      <div className="gl-master-list__rows">
        {visible.map((item) => (
          <ListRow
            key={item.id}
            meta={item.meta}
            icon={item.icon}
            trailing={item.trailing}
            selected={item.id === selectedId}
            onClick={() => onSelect?.(item.id)}
          >
            {item.title}
          </ListRow>
        ))}
        {visible.length === 0 && <div className="gl-master-list__empty gl-hatch"><Label>No match</Label></div>}
      </div>
    </div>
  );
}
