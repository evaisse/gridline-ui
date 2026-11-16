import type { Meta, StoryObj } from '@storybook/react-vite';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsible';

const meta = { title: 'Atoms/Layout/Collapsible', tags: ['disclosure'], component: Collapsible } satisfies Meta<typeof Collapsible>;
export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <Collapsible style={{ maxWidth: 320 }}>
      <CollapsibleTrigger style={{ font: 'inherit', cursor: 'pointer' }}>Show 3 more modules</CollapsibleTrigger>
      <CollapsibleContent><p>printer, cli, watch</p></CollapsibleContent>
    </Collapsible>
  ),
};
