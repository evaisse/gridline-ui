import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResizableGroup, ResizableHandle, ResizablePanel } from './Resizable';

const pane = (name: string) => <div style={{ display: 'grid', placeItems: 'center', height: '100%', fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>;

const meta = { title: 'Molecules/Resizable', component: ResizableGroup } satisfies Meta<typeof ResizableGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ResizableGroup orientation="horizontal" style={{ height: 200, maxWidth: 640 }}>
      <ResizablePanel defaultSize="35%" minSize="20%">{pane('List')}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>{pane('Detail')}</ResizablePanel>
    </ResizableGroup>
  ),
};
export const Vertical: Story = {
  render: () => (
    <ResizableGroup orientation="vertical" style={{ height: 280, maxWidth: 400 }}>
      <ResizablePanel>{pane('Editor')}</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="30%">{pane('Terminal')}</ResizablePanel>
    </ResizableGroup>
  ),
};
