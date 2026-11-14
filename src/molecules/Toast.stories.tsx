import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms';
import { Toaster, useToast } from './Toast';

function Demo() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button onClick={() => toast({ title: 'Report exported', description: 'tessera-4.2.0.csv was saved.', tone: 'pos' })}>Success</Button>
      <Button onClick={() => toast({ title: 'Build failed', description: 'cli did not compile.', tone: 'neg' })}>Error</Button>
      <Button onClick={() => toast({ title: 'Copied' })}>Plain</Button>
    </div>
  );
}

const meta = { title: 'Molecules/Toast', component: Toaster, args: { children: null }, render: () => <Toaster><Demo /></Toaster> } satisfies Meta<typeof Toaster>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
