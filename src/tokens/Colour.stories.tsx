import type { Meta, StoryObj } from '@storybook/react-vite';
import './docs.css';

const groups: Array<[string, Array<[string, string]>]> = [
  ['Ink and paper', [['--gl-paper', 'Page'], ['--gl-ink', 'Text'], ['--gl-ink-2', 'Muted text'], ['--gl-ink-3', 'Units, placeholders']]],
  ['Rules', [['--gl-rule', 'Inner hairlines'], ['--gl-rule-strong', 'Frames, header rules']]],
  ['Surfaces', [['--gl-surface-1', 'Resting cells'], ['--gl-surface-2', 'Hover'], ['--gl-surface-3', 'Pressed'], ['--gl-invert-bg', 'Selection']]],
];
const tones = ['--gl-tint', '--gl-pos', '--gl-neg', '--gl-warn', '--gl-info'];

function Colour() {
  return (
    <div className="gl-doc">
      <header className="gl-doc-head">
        <h1>Colour</h1>
        <p>
          One ink and one tint. Rules and surfaces are the tint at an opacity, so overriding <code>--gl-tint</code> with an
          RGB triplet re-themes the system. Switch theme in the toolbar to see the dark values.
        </p>
      </header>
      {groups.map(([title, swatches]) => (
        <section key={title} className="gl-doc-group">
          <span className="gl-doc-band gl-doc-band--label cap">{title}</span>
          <div className="gl-doc-grid gl-doc-grid--4">
            {swatches.map(([token, use]) => (
              <div key={token} className="gl-doc-swatch">
                <i style={{ background: `var(${token})` }} />
                <span className="mono">{token}</span>
                <span className="cap">{use}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
      <section className="gl-doc-group">
        <span className="gl-doc-band gl-doc-band--label cap">Data tones · solid for marks, 8% for the cell behind them</span>
        <div className="gl-doc-grid gl-doc-grid--5">
          {tones.map((token) => (
            <div key={token} className="gl-doc-swatch">
              <i style={{ background: `rgb(var(${token}))` }} />
              <i style={{ background: `rgb(var(${token}) / 0.08)` }} />
              <span className="mono">{token}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = { title: 'Tokens/Colour', component: Colour, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Colour>;
export default meta;

export const Palette: StoryObj<typeof meta> = {};
