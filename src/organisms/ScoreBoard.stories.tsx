import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScoreBoard } from './ScoreBoard';

const meta = {
  title: 'Organisms/ScoreBoard',
  component: ScoreBoard,
  args: {
    subject: 'Module',
    views: [
      {
        id: 'coverage', label: 'Coverage', tone: 'pos', unit: '%', max: 100,
        rows: [
          { name: 'core', value: 91.4, rank: 3, of: 37 },
          { name: 'parser', value: 73.6, rank: 9, of: 38 },
          { name: 'cli', value: 48.9, rank: 21, of: 42 },
        ],
      },
      {
        id: 'size', label: 'Size', tone: 'neg', unit: 'kB', max: 60,
        rows: [
          { name: 'core', value: 12.4, rank: 6, of: 37 },
          { name: 'parser', value: 41.2, rank: 27, of: 38 },
          { name: 'cli', value: 7.9, rank: 2, of: 42 },
        ],
      },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}><Story /></div>],
} satisfies Meta<typeof ScoreBoard>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
