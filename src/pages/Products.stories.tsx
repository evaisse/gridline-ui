import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AspectRatio, Button, Cell, Grid, Heading, Label, NativeSelect, Numeric, Tag, Text } from '../atoms';
import { Breadcrumb, Empty, Item, ItemGroup, Pagination, SearchField, Tabs, ToggleGroup, ToggleGroupItem } from '../molecules';
import { Toolbar, ToolbarCell } from '../organisms';
import { ListingTemplate } from '../templates';
import { PlusIcon, SearchIcon } from '../tokens/icons';
import { productKinds, products, type Product } from './appFixtures';

const sorters: Record<string, (a: Product, b: Product) => number> = {
  popular: (a, b) => b.reviews - a.reviews,
  rating: (a, b) => b.rating - a.rating,
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
};

/** The picture slot. Products have no photographs here, so it shows a hatched plate with a glyph. */
function Plate({ product, ratio }: { product: Product; ratio: number }) {
  return (
    <AspectRatio ratio={ratio}>
      <div className="gl-hatch" role="img" aria-label={product.name} style={{ display: 'grid', placeItems: 'center', height: '100%', fontSize: 32, color: 'var(--gl-ink-2)' }}>
        <span aria-hidden>{product.glyph}</span>
      </div>
    </AspectRatio>
  );
}

function Rating({ product }: { product: Product }) {
  return <Label size="xs">★ {product.rating.toFixed(1)} · {product.reviews} reviews</Label>;
}

function AddButton({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return <Button size="sm" icon={<PlusIcon />} disabled={product.stock === 0} onClick={onAdd}>{product.stock === 0 ? 'Sold out' : 'Add'}</Button>;
}

function Products() {
  const [kind, setKind] = useState('All');
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState('grid');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState(0);
  const add = () => setCart((count) => count + 1);

  const visible = products
    .filter((product) => (kind === 'All' || product.kind === kind) && product.name.toLowerCase().includes(query.toLowerCase()))
    .sort(sorters[sort]);

  return (
    <ListingTemplate
      nav={
        <>
          <Label tone="ink">▦ Meridian Supply</Label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Button variant="ghost" size="sm">Orders</Button>
            <Button size="sm">Cart · {cart}</Button>
          </div>
        </>
      }
      header={
        <>
          <Breadcrumb items={[{ label: 'Shop', href: '#' }, { label: 'Keyboards and parts' }]} />
          <Heading level={1}>Keyboards and parts</Heading>
          <Text tone="muted">Boards, switches, keycaps and accessories. Ships in two working days, returns within thirty.</Text>
        </>
      }
      toolbar={
        <>
          <div style={{ overflowX: 'auto', borderBottom: '1px solid var(--gl-rule-strong)', background: 'var(--gl-surface-1)' }}>
            <Tabs items={productKinds.map((item) => ({ id: item, label: item }))} value={kind} onChange={setKind} fill={false} style={{ border: 0, width: 'max-content' }} />
          </div>
          <Toolbar style={{ flexWrap: 'wrap' }}>
            <ToolbarCell flush grow style={{ minWidth: 200 }}><SearchField placeholder="Search this category" value={query} onChange={(event) => setQuery(event.target.value)} /></ToolbarCell>
            <ToolbarCell flush style={{ width: 200 }}>
              <NativeSelect variant="cell" aria-label="Sort by" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="popular">Most reviewed</option><option value="rating">Best rated</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option>
              </NativeSelect>
            </ToolbarCell>
            <ToolbarCell>
              <ToggleGroup type="single" value={view} onValueChange={(value: string) => value && setView(value)} aria-label="View">
                <ToggleGroupItem value="grid">Grid</ToggleGroupItem><ToggleGroupItem value="list">List</ToggleGroupItem>
              </ToggleGroup>
            </ToolbarCell>
          </Toolbar>
        </>
      }
      footer={
        <>
          <Label>{visible.length} of {products.length} products</Label>
          <Pagination page={1} pageCount={4} />
        </>
      }
    >
      {visible.length === 0 && <Empty style={{ border: 0 }} icon={<SearchIcon />} title="No product matches" description="Try another category or a shorter search." />}
      {visible.length > 0 && view === 'grid' && (
        <Grid columns="repeat(auto-fill, minmax(240px, 1fr))" framed={false}>
          {visible.map((product) => (
            <Cell key={product.id} pad="none" style={{ display: 'flex', flexDirection: 'column' }}>
              <Plate product={product} ratio={4 / 3} />
              <div style={{ display: 'grid', gap: 8, padding: 16, flex: 1, alignContent: 'start', borderTop: '1px solid var(--gl-rule)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, minHeight: 20 }}>
                  <Label>{product.kind}</Label>
                  {product.tag && <Tag tone={product.tag.tone}>{product.tag.label}</Tag>}
                </div>
                <Heading level={3} size="lg">{product.name}</Heading>
                <Text variant="small" tone="muted">{product.description}</Text>
                <Rating product={product} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderTop: '1px solid var(--gl-rule)' }}>
                <Numeric prefix="$">{product.price}</Numeric>
                <AddButton product={product} onAdd={add} />
              </div>
            </Cell>
          ))}
        </Grid>
      )}
      {visible.length > 0 && view === 'list' && (
        <ItemGroup style={{ border: 0 }}>
          {visible.map((product) => (
            <Item
              key={product.id}
              media={<div style={{ width: 72 }}><Plate product={product} ratio={4 / 3} /></div>}
              title={<span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>{product.name}{product.tag && <Tag tone={product.tag.tone}>{product.tag.label}</Tag>}</span>}
              description={<>{product.description}<br /><Rating product={product} /></>}
              actions={<><Numeric prefix="$">{product.price}</Numeric><AddButton product={product} onAdd={add} /></>}
            />
          ))}
        </ItemGroup>
      )}
    </ListingTemplate>
  );
}

const meta = { title: 'Pages/Products', component: Products, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Products>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
