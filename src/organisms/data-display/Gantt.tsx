import { useMemo, type CSSProperties } from 'react';
import { Label } from '../../atoms';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, ToggleGroup, ToggleGroupItem } from '../../molecules';
import { cx } from '../../utils/cx';
import { useControlled } from '../../utils/useControlled';
import './Gantt.css';

export interface GanttTask {
  id: string;
  name: string;
  /** First day of the task. */
  start: Date;
  /** Last day of the task, inclusive. */
  end: Date;
  /** 0 to 100. */
  progress?: number;
  /** Ids of tasks that must finish before this one starts. */
  dependsOn?: string[];
  /** Id of the summary task this one is nested under. */
  parentId?: string;
}

export type GanttScale = 'day' | 'week';

export interface GanttProps {
  tasks: GanttTask[];
  scale?: GanttScale;
  defaultScale?: GanttScale;
  onScaleChange?: (scale: GanttScale) => void;
  /** Draws the today marker. Omit to hide it. */
  today?: Date;
  onTaskClick?: (task: GanttTask) => void;
  'aria-label'?: string;
  className?: string;
}

const ROW = 40;
const HEAD = 32;
const MS_DAY = 86_400_000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const diffDays = (a: Date, b: Date) => Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / MS_DAY);
const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/** Tasks as bars on a day or week timeline, with a task table on the left and orthogonal dependency connectors. */
export function Gantt({ tasks, scale, defaultScale = 'day', onScaleChange, today, onTaskClick, className, ...rest }: GanttProps) {
  const [mode, setMode] = useControlled(scale, defaultScale, onScaleChange);
  const dayW = mode === 'day' ? 32 : 12;

  const layout = useMemo(() => {
    const ids = new Set(tasks.map((t) => t.id));
    const rows: { task: GanttTask; depth: number; summary: boolean }[] = [];
    const walk = (parent: string | undefined, depth: number) => tasks
      .filter((t) => (parent === undefined ? !t.parentId || !ids.has(t.parentId) : t.parentId === parent))
      .forEach((task) => {
        rows.push({ task, depth, summary: tasks.some((t) => t.parentId === task.id) });
        walk(task.id, depth + 1);
      });
    walk(undefined, 0);
    const min = new Date(Math.min(...tasks.map((t) => t.start.getTime()), today?.getTime() ?? Infinity));
    const max = new Date(Math.max(...tasks.map((t) => t.end.getTime())));
    const origin = addDays(startOfDay(min), -((min.getDay() + 6) % 7));
    const days = Math.max(7, diffDays(origin, max) + 2);
    return { rows, origin, days: Math.ceil(days / 7) * 7 };
  }, [tasks, today]);

  const { rows, origin, days } = layout;
  const width = days * dayW;
  const x = (d: Date) => diffDays(origin, d) * dayW;
  const index = new Map(rows.map((r, i) => [r.task.id, i]));
  const cells = Array.from({ length: mode === 'day' ? days : days / 7 }, (_, i) => addDays(origin, mode === 'day' ? i : i * 7));

  const links = rows.flatMap(({ task }, i) => (task.dependsOn ?? []).flatMap((dep) => {
    const j = index.get(dep);
    if (j === undefined) return [];
    const x1 = x(rows[j].task.end) + dayW;
    const x2 = x(task.start);
    const y1 = j * ROW + ROW / 2;
    const y2 = i * ROW + ROW / 2;
    const xm = (x1 + x2) / 2;
    const d = x2 >= x1 + 16
      ? `M${x1} ${y1}H${xm}V${y2}H${x2}`
      : `M${x1} ${y1}H${x1 + 8}V${y2 > y1 ? y2 - ROW / 2 : y2 + ROW / 2}H${x2 - 8}V${y2}H${x2}`;
    return [{ key: `${dep}-${task.id}`, d, x2, y2 }];
  }));

  return (
    <div className={cx('gl-gantt', className)} style={{ '--gl-gantt-row': `${ROW}px`, '--gl-gantt-head': `${HEAD}px` } as CSSProperties}>
      <div className="gl-gantt__bar">
        <Label>Scale</Label>
        <ToggleGroup type="single" value={mode} onValueChange={(v: string) => v && setMode(v as GanttScale)} aria-label="Timeline scale">
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="gl-gantt__body" {...rest}>
        <div className="gl-gantt__tasks">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Task</TableHead>
                <TableHead scope="col" className="gl-gantt__date">Start</TableHead>
                <TableHead scope="col" className="gl-gantt__date">End</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(({ task, depth, summary }) => (
                <TableRow key={task.id}>
                  <TableCell><span className={cx('gl-gantt__name', summary && 'gl-gantt__name--summary')} style={{ paddingLeft: depth * 16 }}>{task.name}</span></TableCell>
                  <TableCell className="gl-table__num gl-gantt__date">{fmt(task.start)}</TableCell>
                  <TableCell className="gl-table__num gl-gantt__date">{fmt(task.end)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="gl-gantt__scroll">
          <div className="gl-gantt__timeline" style={{ width }}>
            <div className="gl-gantt__head">
              {cells.map((d) => (
                <span key={d.getTime()} className="gl-gantt__tick" style={{ width: mode === 'day' ? dayW : dayW * 7 }}>
                  {mode === 'day' ? (d.getDate() === 1 || d.getTime() === origin.getTime() ? fmt(d) : d.getDate()) : fmt(d)}
                </span>
              ))}
            </div>
            <div className="gl-gantt__canvas" style={{ height: rows.length * ROW }}>
              {rows.map((r, i) => <span key={r.task.id} className="gl-gantt__line" style={{ top: (i + 1) * ROW - 1 }} />)}
              {today && diffDays(origin, today) >= 0 && diffDays(origin, today) < days && (
                <span className="gl-gantt__today" style={{ left: x(today) + dayW / 2 }} role="img" aria-label={`Today, ${fmt(today)}`} />
              )}
              <svg className="gl-gantt__links" width={width} height={rows.length * ROW} aria-hidden="true">
                {links.map((l) => (
                  <g key={l.key}>
                    <path className="gl-gantt__link" d={l.d} />
                    <path className="gl-gantt__arrow" d={`M${l.x2} ${l.y2}l-5 -3.5v7z`} />
                  </g>
                ))}
              </svg>
              {rows.map(({ task, summary }, i) => (
                <button
                  key={task.id} type="button" className={cx('gl-gantt__bar-item', summary && 'gl-gantt__bar-item--summary')}
                  style={{ left: x(task.start), top: i * ROW + 10, width: (diffDays(task.start, task.end) + 1) * dayW }}
                  aria-label={`${task.name}, ${fmt(task.start)} to ${fmt(task.end)}${task.progress != null ? `, ${task.progress}% done` : ''}`}
                  onClick={() => onTaskClick?.(task)}
                >
                  {task.progress != null && <span className="gl-gantt__fill" style={{ width: `${Math.min(100, Math.max(0, task.progress))}%` }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
