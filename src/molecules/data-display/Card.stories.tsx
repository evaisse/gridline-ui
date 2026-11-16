import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Text } from '../../atoms';
import { Card, CardContent, CardFooter, CardHeader } from './Card';

const meta = { title: 'Molecules/Data display/Card', tags: ['container'], component: Card, decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>] } satisfies Meta<typeof Card>;
export default meta;

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <Card>
      <CardHeader eyebrow="Parsing" title="tessera" description="Updated 12 Nov 2026" action={<Button size="sm" variant="ghost">Open</Button>} />
      <CardContent><Text>An incremental parser toolkit with error recovery and a compact syntax tree.</Text></CardContent>
      <CardFooter><Button variant="solid">Install</Button><Button>Docs</Button></CardFooter>
    </Card>
  ),
};
