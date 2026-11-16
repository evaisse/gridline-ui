import type { Meta, StoryObj } from '@storybook/react-vite';
import { Frame, Section } from './Frame';
import { Heading } from '../typography/Heading';
import { Label } from '../typography/Label';
import { Text } from '../typography/Text';

const meta = {
  title: 'Atoms/Layout/Frame', tags: ['container'],
  component: Frame,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Frame>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Sections: Story = {
  render: () => (
    <Frame>
      <Section pad="lg">
        <Heading level={1}>Sections hang between two rules</Heading>
        <Text variant="lead" style={{ marginTop: 12 }}>The frame draws the vertical rules once for the whole page.</Text>
      </Section>
      <Section pad="none" tone="invert" style={{ padding: '12px 16px' }}><Label tone="inherit">Inverted band</Label></Section>
      <Section tone="surface-1"><Text>A tinted section. Sections touch; a rule separates them.</Text></Section>
      <Section pad="none" className="gl-dots" style={{ height: 96 }} />
    </Frame>
  ),
};
