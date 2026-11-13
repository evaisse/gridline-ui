import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Cell, Grid, Heading, Text } from '../atoms';
import { CategoryNav, IndexCard } from '../organisms';
import { IndexTemplate } from '../templates';
import { cards, categories } from './fixtures';

function Catalogue() {
  const [category, setCategory] = useState('all');
  const label = categories.find((item) => item.id === category)?.label ?? '';
  const visible = category === 'all' ? cards : cards.filter((card) => card.eyebrow === label);

  return (
    <IndexTemplate
      bandTitle={label}
      nav={<CategoryNav categories={categories} value={category} onChange={setCategory} />}
      hero={
        <>
          <Heading level={1}>A measured catalogue of packages</Heading>
          <Text variant="lead">Every entry is tested the same way, on the same machine, and ranked against its peers.</Text>
          <Text tone="muted">42 packages across five categories. Coverage, size and build time are measured on each release.</Text>
        </>
      }
    >
      <Grid columns="repeat(auto-fill, minmax(260px, 1fr))" framed={false}>
        {visible.map((card) => (
          <Cell key={card.title} pad="none"><IndexCard {...card} /></Cell>
        ))}
        {visible.length === 0 && <Cell pad="none" className="gl-hatch" style={{ minHeight: 240 }} />}
      </Grid>
    </IndexTemplate>
  );
}

const meta = {
  title: 'Pages/Catalogue',
  component: Catalogue,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Catalogue>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
