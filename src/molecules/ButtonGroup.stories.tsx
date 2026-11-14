import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms';
import { ChevronDownIcon } from '../tokens/icons';
import { ButtonGroup } from './ButtonGroup';

const meta = { title: 'Molecules/ButtonGroup', component: ButtonGroup } satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = { render: (args) => <ButtonGroup {...args}><Button>Day</Button><Button>Week</Button><Button>Month</Button></ButtonGroup> };
export const Split: Story = { render: () => <ButtonGroup><Button variant="solid">Publish</Button><Button variant="solid" icon={<ChevronDownIcon />} aria-label="More publish options" /></ButtonGroup> };
export const Vertical: Story = { ...Horizontal, args: { orientation: 'vertical' } };
