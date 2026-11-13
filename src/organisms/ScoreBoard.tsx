import { useState, type ReactNode } from 'react';
import { Label } from '../atoms';
import { MeterRow, Tabs } from '../molecules';
import type { Tone } from '../tokens/tone';
import { cx } from '../utils/cx';
import './ScoreBoard.css';

export interface ScoreRow {
  name: string;
  value: number;
  display?: ReactNode;
  rank?: number;
  of?: number;
}

export interface ScoreView {
  id: string;
  label: string;
  tone?: Tone;
  unit?: ReactNode;
  max?: number;
  rows: ScoreRow[];
}

export interface ScoreBoardProps {
  views: ScoreView[];
  /** Head of the first column. */
  subject?: string;
  defaultView?: string;
  className?: string;
}

/** Tabbed measurements: one view per metric, one metered row per subject. */
export function ScoreBoard({ views, subject = 'Subject', defaultView, className }: ScoreBoardProps) {
  const [active, setActive] = useState(defaultView ?? views[0]?.id);
  const view = views.find((v) => v.id === active) ?? views[0];
  if (!view) return null;

  return (
    <div className={cx('gl-score-board', className)}>
      <Tabs items={views.map(({ id, label }) => ({ id, label }))} value={view.id} onChange={setActive} />
      <div className="gl-score-board__head">
        <Label>{subject}</Label>
        <span />
        <Label className="gl-score-board__num">{view.label}</Label>
        <Label className="gl-score-board__num">Rank</Label>
      </div>
      {view.rows.map((row) => (
        <MeterRow key={row.name} {...row} tone={view.tone} unit={view.unit} max={view.max} />
      ))}
    </div>
  );
}
