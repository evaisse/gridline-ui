import { createContext, useContext, useMemo, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { Button, Label } from '../atoms';
import { PanelIcon } from '../tokens/icons';
import { cx } from '../utils/cx';
import { styled } from '../utils/styled';
import './Sidebar.css';

interface SidebarState {
  open: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarState | null>(null);

export function useSidebar() {
  const state = useContext(SidebarContext);
  if (!state) throw new Error('useSidebar must be used inside <SidebarProvider>.');
  return state;
}

export interface SidebarProviderProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
}

/** Lays out a Sidebar beside its content and holds the open state. */
export function SidebarProvider({ defaultOpen = true, className, ...rest }: SidebarProviderProps) {
  const [open, setOpen] = useState(defaultOpen);
  const value = useMemo(() => ({ open, toggle: () => setOpen((current) => !current) }), [open]);
  return (
    <SidebarContext.Provider value={value}>
      <div className={cx('gl-sidebar-layout', className)} data-sidebar={open ? 'open' : 'closed'} {...rest} />
    </SidebarContext.Provider>
  );
}

/** The rail itself. Collapses to icons when closed. */
export const Sidebar = styled('aside', 'gl-sidebar');
export const SidebarHeader = styled('div', 'gl-sidebar__header');
export const SidebarContent = styled('div', 'gl-sidebar__content');
export const SidebarFooter = styled('div', 'gl-sidebar__footer');
export const SidebarInset = styled('main', 'gl-sidebar-inset');

export function SidebarGroup({ label, className, children, ...rest }: HTMLAttributes<HTMLDivElement> & { label?: ReactNode }) {
  return (
    <div className={cx('gl-sidebar__group', className)} {...rest}>
      {label != null && <div className="gl-sidebar__group-label"><Label size="xs">{label}</Label></div>}
      {children}
    </div>
  );
}

export interface SidebarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  active?: boolean;
  badge?: ReactNode;
}

export function SidebarItem({ icon, active = false, badge, className, children, ...rest }: SidebarItemProps) {
  return (
    <button type="button" aria-current={active ? 'page' : undefined} className={cx('gl-sidebar__item', className)} {...rest}>
      {icon != null && <span className="gl-sidebar__item-icon">{icon}</span>}
      <span className="gl-sidebar__item-label">{children}</span>
      {badge != null && <Label size="xs" tone="inherit" className="gl-sidebar__item-badge">{badge}</Label>}
    </button>
  );
}

export function SidebarTrigger() {
  const { open, toggle } = useSidebar();
  return <Button variant="ghost" size="sm" icon={<PanelIcon />} aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'} aria-expanded={open} onClick={toggle} />;
}
