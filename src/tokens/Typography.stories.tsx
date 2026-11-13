import type { Meta, StoryObj } from '@storybook/react-vite';
import './docs.css';

const scale: Array<[string, string, string, string]> = [
  ['--gl-text-2xl', '36px', 'var(--gl-font-display)', 'Page title'],
  ['--gl-text-xl', '24px', 'var(--gl-font-display)', 'Section title'],
  ['--gl-text-lg', '16px', 'var(--gl-font-display)', 'Card title, lead'],
  ['--gl-text-md', '13px', 'var(--gl-font-body)', 'Body and interface text'],
  ['--gl-text-sm', '11px', 'var(--gl-font-mono)', 'LABELS AND FIGURES'],
  ['--gl-text-xs', '10px', 'var(--gl-font-mono)', 'TAGS, RANKS, UNITS'],
];

function Typography() {
  return (
    <div className="gl-doc">
      <h1>Typography</h1>
      <p>Three faces, three jobs. They never swap roles.</p>
      <div className="gl-doc-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div>
          <span className="cap">Display · Source Serif 4</span>
          <p style={{ fontFamily: 'var(--gl-font-display)', fontSize: 28, lineHeight: 1.2 }}>Titles and headline figures</p>
        </div>
        <div>
          <span className="cap">Body · Inter</span>
          <p style={{ fontSize: 16 }}>Everything a person reads as a sentence.</p>
        </div>
        <div>
          <span className="cap">Mono · JetBrains Mono</span>
          <p className="mono" style={{ fontSize: 13, textTransform: 'uppercase' }}>Keys · 2026-11-13 · 68.49%</p>
        </div>
      </div>
      <span className="cap">Scale</span>
      <div className="gl-doc-box">
        {scale.map(([token, size, family, sample]) => (
          <div key={token} className="gl-doc-row">
            <span className="mono">{token} · {size}</span>
            <span style={{ fontFamily: family, fontSize: `var(${token})`, lineHeight: 1.2 }}>{sample}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = { title: 'Tokens/Typography', component: Typography } satisfies Meta<typeof Typography>;
export default meta;

export const Specimen: StoryObj<typeof meta> = {};
