import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms';
import { ThumbUpIcon } from '../../tokens/icons';
import { Bubble, BubbleGroup } from './Bubble';

const meta = { title: 'Molecules/Assistant/Bubble', tags: ['chat'], component: Bubble, args: { children: 'How did the 4.2.0 release do?' } } satisfies Meta<typeof Bubble>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Tinted: Story = {};
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <Bubble align="end">Tinted, aligned to the end</Bubble>
      <Bubble variant="ruled">Ruled, for quoted or system content</Bubble>
      <Bubble variant="solid">Solid, for emphasis</Bubble>
      <Bubble variant="plain">Plain: no box at all, for long assistant answers.</Bubble>
      <Bubble variant="ruled" reactions={<Button size="sm" icon={<ThumbUpIcon />}>2</Button>}>With a reaction</Bubble>
    </div>
  ),
};
export const Grouped: Story = { render: () => <BubbleGroup><Bubble variant="ruled">First thought</Bubble><Bubble variant="ruled">and a second, sharing a rule</Bubble></BubbleGroup> };
