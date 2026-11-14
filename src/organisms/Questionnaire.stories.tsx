import type { Meta, StoryObj } from '@storybook/react-vite';
import { Questionnaire } from './Questionnaire';

const meta = {
  title: 'Organisms/Questionnaire',
  component: Questionnaire,
  args: {
    questions: [
      { id: 'goal', type: 'single', title: 'What matters most for this package?', options: [{ value: 'size', label: 'Small bundle', description: 'Ship as little as possible.' }, { value: 'speed', label: 'Fast builds' }, { value: 'coverage', label: 'High coverage' }] },
      { id: 'targets', type: 'multiple', title: 'Which runtimes do you target?', description: 'Pick all that apply.', skippable: true, options: [{ value: 'node', label: 'Node' }, { value: 'browser', label: 'Browser' }, { value: 'edge', label: 'Edge workers' }] },
      { id: 'notes', type: 'text', title: 'Anything else we should know?', skippable: true },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Questionnaire>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
