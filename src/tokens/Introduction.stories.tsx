import type { Meta, StoryObj } from '@storybook/react-vite';
import './docs.css';

const rules = [
  ['One hairline', '1px, one colour at two opacities. Faint inside, stronger for frames. Never 2px.'],
  ['Shared borders', 'Cells touch. One rule separates two cells; there is no gap and no double line.'],
  ['Flat', 'No shadows, no gradients. Corners are 2px at most.'],
  ['Three voices', 'Serif for titles, sans for reading, uppercase mono for metadata and figures.'],
  ['Fixed rhythm', 'Rows are 40px. Controls are 32px. Everything else is a multiple of 4.'],
  ['One tint', 'Surfaces are the tint at 4–14% opacity, not a separate grey scale.'],
  ['Inversion selects', 'The selected row or tab flips to solid tint. No glow, no outline.'],
  ['Colour is data', 'Saturated colour appears only where it encodes a value.'],
];

const layers = [
  ['tokens', 'CSS variables, tones, base styles'],
  ['atoms', 'Label, Button, Checkbox, Tooltip…'],
  ['molecules', 'Stat, Dialog, Field, Calendar…'],
  ['organisms', 'DataTable, charts, assistant thread…'],
  ['templates', 'Page skeletons with slots'],
  ['pages', 'Templates filled with fixtures'],
];

function Introduction() {
  return (
    <div className="gl-doc">
      <span className="cap">Gridline UI · v0.2</span>
      <h1>A compact, hairline-ruled design system</h1>
      <p className="lead">
        Gridline treats the interface as a technical table. Structure comes from thin rules and a visible grid, not from
        floating cards. It is built for screens people scan and compare.
      </p>

      <h2>The eight rules</h2>
      <div className="gl-doc-grid gl-doc-grid--2">
        {rules.map(([title, body], i) => (
          <div key={title}>
            <span className="cap">{String(i + 1).padStart(2, '0')} · {title}</span>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <h2>Atomic layers</h2>
      <p>
        Components are organised by atomic design. A layer may import from the layers to its left and never from those
        to its right. ESLint enforces the chain: run <code>npm run lint</code>.
      </p>
      <div className="gl-doc-chain">
        {layers.map(([name, body], i) => (
          <div key={name}>
            <span className="cap">{i} · {name}</span>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = { title: 'Introduction', component: Introduction } satisfies Meta<typeof Introduction>;
export default meta;

export const Overview: StoryObj<typeof meta> = {};
