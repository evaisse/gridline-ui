import type { Meta, StoryObj } from '@storybook/react-vite';
import './docs.css';

const spaces = ['--gl-space-1', '--gl-space-2', '--gl-space-3', '--gl-space-4', '--gl-space-5', '--gl-space-6', '--gl-space-7'];

function Rules() {
  return (
    <div className="gl-doc">
      <h1>Rules, rhythm and texture</h1>
      <p>The hairline is the system. It comes in two strengths and one width.</p>
      <div className="gl-doc-box">
        <div className="gl-doc-row">
          <span className="mono">--gl-rule</span>
          <span style={{ borderTop: '1px solid var(--gl-rule)' }} />
        </div>
        <div className="gl-doc-row">
          <span className="mono">--gl-rule-strong</span>
          <span style={{ borderTop: '1px solid var(--gl-rule-strong)' }} />
        </div>
      </div>

      <span className="cap">Rhythm · rows are 40px, controls 32px</span>
      <div className="gl-doc-box">
        {spaces.map((token) => (
          <div key={token} className="gl-doc-row">
            <span className="mono">{token}</span>
            <span style={{ display: 'block', width: `var(${token})`, height: 12, background: 'var(--gl-invert-bg)' }} />
          </div>
        ))}
      </div>

      <span className="cap">Texture · for empty or decorative cells only</span>
      <div className="gl-doc-grid gl-doc-grid--2">
        <div className="gl-dots" style={{ height: 120 }}><span className="mono">.gl-dots</span></div>
        <div className="gl-hatch" style={{ height: 120 }}><span className="mono">.gl-hatch</span></div>
      </div>
    </div>
  );
}

const meta = { title: 'Tokens/Rules and rhythm', component: Rules } satisfies Meta<typeof Rules>;
export default meta;

export const Overview: StoryObj<typeof meta> = {};
