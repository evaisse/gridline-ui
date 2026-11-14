import { Tabs as Base } from 'radix-ui';
import type { ReactNode } from 'react';
import { Label } from '../atoms';
import { cx } from '../utils/cx';
import './Tabs.css';

export interface TabPanel {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabPanelsProps {
  panels: TabPanel[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (id: string) => void;
  fill?: boolean;
  className?: string;
}

/** Tabs that own their panels, with arrow-key navigation. For a bare switch, use Tabs. */
export function TabPanels({ panels, defaultValue, fill = false, className, ...rest }: TabPanelsProps) {
  return (
    <Base.Root defaultValue={rest.value === undefined ? defaultValue ?? panels[0]?.id : undefined} className={className} {...rest}>
      <Base.List className={cx('gl-tabs', fill && 'gl-tabs--fill')}>
        {panels.map((panel) => (
          <Base.Trigger key={panel.id} value={panel.id} className="gl-tabs__tab"><Label tone="inherit">{panel.label}</Label></Base.Trigger>
        ))}
      </Base.List>
      {panels.map((panel) => (
        <Base.Content key={panel.id} value={panel.id} className="gl-tabs__panel">{panel.content}</Base.Content>
      ))}
    </Base.Root>
  );
}
