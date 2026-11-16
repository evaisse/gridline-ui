import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spreadsheet } from './Spreadsheet';

const meta = { title: 'Organisms/Data display/Spreadsheet', tags: ['table', 'input', 'number'], component: Spreadsheet } satisfies Meta<typeof Spreadsheet>;
export default meta;
type Story = StoryObj<typeof meta>;

const budget: Record<string, string> = {
  A1: 'Package', B1: 'Q1', C1: 'Q2', D1: 'Q3', E1: 'Total',
  A2: 'tessera', B2: '120', C2: '135', D2: '150', E2: '=SUM(B2:D2)',
  A3: 'quillmark', B3: '80', C3: '95.5', D3: '70', E3: '=SUM(B3:D3)',
  A4: 'castor', B4: '210', C4: '190', D4: '230', E4: '=SUM(B4:D4)',
  A5: 'Sum', B5: '=SUM(B2:B4)', C5: '=SUM(C2:C4)', D5: '=SUM(D2:D4)', E5: '=SUM(E2:E4)',
  A6: 'Average', B6: '=AVERAGE(B2:B4)', C6: '=AVERAGE(C2:C4)', D6: '=AVERAGE(D2:D4)', E6: '=E5/COUNT(E2:E4)',
  A7: 'Peak', B7: '=MAX(B2:D4)', C7: 'Floor', D7: '=MIN(B2:D4)',
};

function Controlled() {
  const [cells, setCells] = useState(budget);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Spreadsheet cells={cells} onCellsChange={setCells} aria-label="Quarterly measurements" />
      <code style={{ fontSize: 11 }}>{Object.keys(cells).length} cells filled</code>
    </div>
  );
}

export const Formulas: Story = { render: () => <Controlled /> };
export const Empty: Story = { args: { columns: 6, rows: 8 } };
export const CircularReference: Story = {
  args: { defaultCells: { A1: '=B1+1', B1: '=A1+1', A2: '=C2', C2: '=A2', A3: '=1/0', A4: '=SUM(A3:A3)', B4: '=(2+3)*4' }, columns: 5, rows: 6 },
};
