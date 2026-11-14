import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, NativeSelect } from '../atoms';
import { Toolbar, ToolbarCell } from './Toolbar';

const meta = {
  title: 'Organisms/Toolbar',
  component: Toolbar,
  decorators: [(Story) => <div style={{ border: '1px solid var(--gl-rule-strong)', borderBottom: 0 }}><Story /></div>],
} satisfies Meta<typeof Toolbar>;
export default meta;

export const FiltersAndActions: StoryObj<typeof meta> = {
  render: () => (
    <Toolbar>
      <ToolbarCell flush style={{ width: 200 }}>
        <NativeSelect variant="cell" aria-label="Category"><option>All packages</option><option>Parsing</option></NativeSelect>
      </ToolbarCell>
      <ToolbarCell flush style={{ width: 200 }}>
        <NativeSelect variant="cell" aria-label="Status"><option>Any status</option><option>Stable</option></NativeSelect>
      </ToolbarCell>
      <ToolbarCell grow />
      <ToolbarCell>
        <Button variant="ghost" size="sm" icon="↓">Download</Button>
        <Button variant="ghost" size="sm" icon="⇄">Compare</Button>
      </ToolbarCell>
    </Toolbar>
  ),
};
