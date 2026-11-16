import { useMemo, type KeyboardEvent, type ReactNode } from 'react';
import { IconButton } from '../../atoms';
import { ChevronRightIcon, FileIcon, FolderIcon, ListIcon, PanelIcon } from '../../tokens/icons';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import { TreeView, type TreeNode } from './TreeView';
import './FileManager.css';

export interface FileItem {
  id: string;
  name: string;
  kind: 'file' | 'folder';
  /** Bytes. */
  size?: number;
  /** A display string, already formatted. */
  modified?: string;
  children?: FileItem[];
}

export interface FileManagerProps {
  items: FileItem[];
  /** The open folder; empty string is the root. */
  folderId?: string;
  defaultFolderId?: string;
  onFolderChange?: (folderId: string) => void;
  selectedId?: string;
  onSelect?: (item: FileItem) => void;
  /** Called on double click or Enter. Folders also open. */
  onOpen?: (item: FileItem) => void;
  view?: 'list' | 'grid';
  defaultView?: 'list' | 'grid';
  onViewChange?: (view: 'list' | 'grid') => void;
  rootLabel?: string;
  /** Extra buttons in the toolbar: upload, new folder. */
  actions?: ReactNode;
  className?: string;
}

const formatSize = (bytes?: number) => {
  if (bytes == null) return '—';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024, i = 0;
  while (value >= 1024 && i < units.length - 1) { value /= 1024; i++; }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[i]}`;
};

const findPath = (items: FileItem[], id: string, trail: FileItem[] = []): FileItem[] | null => {
  for (const item of items) {
    if (item.id === id) return [...trail, item];
    const inner = item.children && findPath(item.children, id, [...trail, item]);
    if (inner) return inner;
  }
  return null;
};

const toTree = (items: FileItem[]): TreeNode[] =>
  items.filter((i) => i.kind === 'folder').map((i) => ({ id: i.id, label: i.name, icon: <FolderIcon width={14} height={14} />, children: toTree(i.children ?? []) }));

/** A folder tree beside a breadcrumb and a file list or grid. Selection inverts; double click or Enter opens. */
export function FileManager({ items, folderId, defaultFolderId = '', onFolderChange, selectedId, onSelect, onOpen, view, defaultView = 'list', onViewChange, rootLabel = 'All files', actions, className }: FileManagerProps) {
  const [folder, setFolder] = useControlled(folderId, defaultFolderId, onFolderChange);
  const [mode, setMode] = useControlled(view, defaultView, onViewChange);
  const [selected, setSelected] = useControlled(selectedId, '');
  const trail = useMemo(() => (folder ? findPath(items, folder) ?? [] : []), [items, folder]);
  const current = trail.length ? trail[trail.length - 1].children ?? [] : items;
  const tree: TreeNode[] = useMemo(() => [{ id: '', label: rootLabel, icon: <FolderIcon width={14} height={14} />, children: toTree(items) }], [items, rootLabel]);

  const sorted = [...current].sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'folder' ? -1 : 1));
  const open = (item: FileItem) => { if (item.kind === 'folder') { setFolder(item.id); setSelected(''); } onOpen?.(item); };
  const select = (item: FileItem) => { setSelected(item.id); onSelect?.(item); };
  const onKey = (item: FileItem, event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') { event.preventDefault(); open(item); }
    else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const sibling = event.key === 'ArrowDown' ? event.currentTarget.nextElementSibling : event.currentTarget.previousElementSibling;
      if (sibling instanceof HTMLElement) { sibling.focus(); sibling.click(); }
    }
  };
  const crumbs = [{ id: '', name: rootLabel }, ...trail];

  return (
    <div className={cx('gl-file-manager', className)}>
      <aside className="gl-file-manager__tree">
        <TreeView aria-label="Folders" nodes={tree} defaultExpanded={['', ...trail.map((t) => t.id)]} selectedId={folder} onSelect={(id) => { setFolder(id); setSelected(''); }} />
      </aside>
      <div className="gl-file-manager__main">
        <div className="gl-file-manager__bar">
          <nav aria-label="Path" className="gl-file-manager__crumbs">
            {crumbs.map((crumb, i) => (
              <span key={crumb.id} className="gl-file-manager__crumb">
                {i > 0 && <ChevronRightIcon width={10} height={10} aria-hidden="true" />}
                <button type="button" aria-current={i === crumbs.length - 1 ? 'page' : undefined} onClick={() => { setFolder(crumb.id); setSelected(''); }}>{crumb.name}</button>
              </span>
            ))}
          </nav>
          {actions}
          <IconButton label="List view" size="sm" variant={mode === 'list' ? 'solid' : 'ruled'} aria-pressed={mode === 'list'} icon={<ListIcon />} onClick={() => setMode('list')} />
          <IconButton label="Grid view" size="sm" variant={mode === 'grid' ? 'solid' : 'ruled'} aria-pressed={mode === 'grid'} icon={<PanelIcon />} onClick={() => setMode('grid')} />
        </div>
        {sorted.length === 0 && <p className="gl-file-manager__empty">This folder is empty.</p>}
        {sorted.length > 0 && mode === 'list' && (
          <div role="listbox" aria-label="Files" className="gl-file-manager__list">
            <div className="gl-file-manager__row gl-file-manager__row--head" aria-hidden="true"><span>Name</span><span>Size</span><span>Modified</span></div>
            {sorted.map((item) => (
              <div
                key={item.id} role="option" tabIndex={0} aria-selected={item.id === selected} data-selected={item.id === selected || undefined} className="gl-file-manager__row"
                onClick={() => select(item)} onDoubleClick={() => open(item)} onKeyDown={(event) => onKey(item, event)}
              >
                <span className="gl-file-manager__name">{item.kind === 'folder' ? <FolderIcon width={14} height={14} /> : <FileIcon width={14} height={14} />}<span>{item.name}</span></span>
                <span className="gl-file-manager__meta">{item.kind === 'folder' ? `${item.children?.length ?? 0} items` : formatSize(item.size)}</span>
                <span className="gl-file-manager__meta">{item.modified ?? '—'}</span>
              </div>
            ))}
          </div>
        )}
        {sorted.length > 0 && mode === 'grid' && (
          <div role="listbox" aria-label="Files" className="gl-file-manager__tiles">
            {sorted.map((item) => (
              <div
                key={item.id} role="option" tabIndex={0} aria-selected={item.id === selected} data-selected={item.id === selected || undefined} className="gl-file-manager__tile"
                onClick={() => select(item)} onDoubleClick={() => open(item)} onKeyDown={(event) => onKey(item, event)}
              >
                {item.kind === 'folder' ? <FolderIcon width={28} height={28} /> : <FileIcon width={28} height={28} />}
                <span className="gl-file-manager__tile-name">{item.name}</span>
                <span className="gl-file-manager__meta">{item.kind === 'folder' ? `${item.children?.length ?? 0} items` : formatSize(item.size)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
