import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gantt, type GanttTask } from './Gantt';

const d = (day: number, month = 10) => new Date(2026, month, day);

const tasks: GanttTask[] = [
  { id: 'design', name: 'tessera 3.0 design', start: d(9), end: d(18), progress: 100 },
  { id: 'api', name: 'API surface', start: d(9), end: d(13), progress: 100, parentId: 'design' },
  { id: 'rfc', name: 'RFC review', start: d(13), end: d(18), progress: 100, parentId: 'design', dependsOn: ['api'] },
  { id: 'build', name: 'Implementation', start: d(16), end: d(30), progress: 45, dependsOn: ['rfc'] },
  { id: 'core', name: 'Core rewrite', start: d(16), end: d(24), progress: 70, parentId: 'build' },
  { id: 'cli', name: 'CLI migration', start: d(23), end: d(30), progress: 20, parentId: 'build', dependsOn: ['core'] },
  { id: 'docs', name: 'Docs and changelog', start: d(25), end: d(30, 10), progress: 0, dependsOn: ['cli'] },
  { id: 'ship', name: 'Release', start: d(2, 11), end: d(4, 11), dependsOn: ['docs', 'cli'] },
];

const meta = {
  title: 'Organisms/Data display/Gantt', tags: ['date', 'steps', 'table'],
  component: Gantt,
  args: { tasks, today: d(16), 'aria-label': 'tessera 3.0 plan' },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Gantt>;
export default meta;

type Story = StoryObj<typeof meta>;

export const DayScale: Story = {};
export const WeekScale: Story = { args: { defaultScale: 'week' } };
export const WithoutDependencies: Story = { args: { tasks: tasks.map((t) => ({ ...t, dependsOn: undefined })), today: undefined } };
