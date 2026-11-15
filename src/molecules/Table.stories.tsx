import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './Table';

const meta = { title: 'Molecules/Data display/Table', tags: ['table'], component: Table, decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>] } satisfies Meta<typeof Table>;
export default meta;

const rows = [['core', '12.4'], ['parser', '41.2'], ['cli', '7.9']];

export const Default: StoryObj<typeof meta> = {
  render: () => (
    <Table>
      <TableCaption>Bundle size by module</TableCaption>
      <TableHeader><TableRow><TableHead>Module</TableHead><TableHead className="gl-table__num">Size, kB</TableHead></TableRow></TableHeader>
      <TableBody>{rows.map(([name, size]) => <TableRow key={name}><TableCell>{name}</TableCell><TableCell className="gl-table__num">{size}</TableCell></TableRow>)}</TableBody>
      <TableFooter><TableRow><TableCell>Total</TableCell><TableCell className="gl-table__num">61.5</TableCell></TableRow></TableFooter>
    </Table>
  ),
};
