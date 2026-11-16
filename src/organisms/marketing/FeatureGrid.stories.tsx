import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatIcon, ClockIcon, GlobeIcon, LayersIcon } from '../../tokens/icons';
import { FeatureGrid } from './FeatureGrid';

const features = [
  { eyebrow: '01 · Measure', title: 'Every package, the same tests', text: 'Build time, bundle size and install weight, measured on identical machines.' },
  { eyebrow: '02 · Compare', title: 'Ranked against its peers', text: 'See where a package stands among the ones that solve the same problem.' },
  { eyebrow: '03 · Watch', title: 'Alerts on regressions', text: 'Hear about it when a release gets slower or heavier than the last.' },
  { eyebrow: '04 · Decide', title: 'Numbers the team can share', text: 'A comparison is a link. Nothing to install on the reading side.' },
  { eyebrow: '05 · Audit', title: 'A log of every change', text: 'Who added which dependency, and what the measurements said at the time.' },
  { eyebrow: '06 · Export', title: 'Reports that travel', text: 'Send a table or a file to people who never open the registry.' },
];

const meta = { title: 'Organisms/Marketing/FeatureGrid', tags: ['list', 'text'], component: FeatureGrid, parameters: { layout: 'fullscreen' }, args: { features } } satisfies Meta<typeof FeatureGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Three: Story = {};
export const TwoColumns: Story = { args: { columns: 2, features: features.slice(0, 4) } };
export const WithIcons: Story = {
  args: { columns: 4, features: [
    { icon: <ClockIcon />, title: 'Fast builds', text: 'Median build under ten seconds.' },
    { icon: <LayersIcon />, title: 'Layered', text: 'Atoms to pages, one rule each.' },
    { icon: <GlobeIcon />, title: 'Everywhere', text: 'Light, dark and right to left.' },
    { icon: <ChatIcon />, title: 'Assistant ready', text: 'Chat parts that match the grid.' },
  ] },
};
