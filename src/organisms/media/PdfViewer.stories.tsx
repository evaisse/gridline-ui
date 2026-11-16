import type { Meta, StoryObj } from '@storybook/react-vite';
import { PdfViewer } from './PdfViewer';

/** A one-page PDF built in code, so the stories load nothing from the network. */
function tinyPdf(text: string): string {
  const stream = `BT /F1 24 Tf 72 700 Td (${text}) Tj ET`;
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let body = '%PDF-1.4\n';
  const offsets: number[] = [];
  objects.forEach((object, i) => { offsets.push(body.length); body += `${i + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = body.length;
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`;
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return `data:application/pdf;base64,${btoa(body)}`;
}

const meta = { title: 'Organisms/Media/PdfViewer', tags: ['file', 'media'], component: PdfViewer, decorators: [(Story) => <div style={{ maxWidth: 820 }}><Story /></div>] } satisfies Meta<typeof PdfViewer>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Without a source the viewer shows its empty state. */
export const Empty: Story = {};
/** The document is drawn by the browser, so its own controls may appear inside the frame. */
export const WithDocument: Story = { args: { src: tinyPdf('Release notes, castor 2.4.0'), title: 'release-notes', pageCount: 1, height: 420 } };
export const Zoomed: Story = { args: { src: tinyPdf('Zoomed to 150 percent'), title: 'zoomed', defaultZoom: 150, pageCount: 1, height: 420 } };
