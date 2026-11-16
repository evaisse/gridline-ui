import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Cell, Grid, Heading, Label, Numeric, Prose, Tag, Text } from '../atoms';
import { Breadcrumb, ChoiceCard, ImageGallery, KeyValue, NumberInput, Rating } from '../molecules';
import { ProductCard } from '../organisms';
import { ProductTemplate } from '../templates';
import { PlusIcon } from '../tokens/icons';
import { plate, products } from './appFixtures';

const pictures = [
  { src: plate('Meridian 75 · front', 214), alt: 'Meridian 75 seen from the front', caption: 'Front' },
  { src: plate('Meridian 75 · side', 196), alt: 'Meridian 75 seen from the side', caption: 'Side profile' },
  { src: plate('Meridian 75 · plate', 178), alt: 'The aluminium plate', caption: 'Aluminium plate' },
  { src: plate('Meridian 75 · case', 160), alt: 'The carry case', caption: 'Carry case' },
];
const switches = [
  { value: 'linear', title: 'Linear 45 g', description: 'Smooth, light' },
  { value: 'tactile', title: 'Tactile 55 g', description: 'A rounded bump' },
  { value: 'silent', title: 'Silent 40 g', description: 'Dampened', disabled: true, meta: 'Sold out' },
];
const related = products.filter((product) => ['k60', 'tkl', 'kc-m', 'rest'].includes(product.id));

function ProductPage() {
  const [choice, setChoice] = useState('linear');
  const [quantity, setQuantity] = useState(1);
  return (
    <ProductTemplate
      header={<Breadcrumb items={[{ label: 'Shop', href: '#' }, { label: 'Keyboards', href: '#' }, { label: 'Meridian 75' }]} />}
      gallery={<ImageGallery images={pictures} columns={2} label="Meridian 75 pictures" />}
      description={
        <Prose>
          <h2>Description</h2>
          <p>An aluminium 75% board with hot-swap sockets and a gasket mount. The plate is cut from a single sheet; the case is anodised, not painted.</p>
          <p>Ships assembled with the switches you choose and a braided cable. Keycaps are sold separately.</p>
        </Prose>
      }
      related={
        <div style={{ display: 'grid', gap: 12 }}>
          <Label tone="ink">Goes with it</Label>
          <Grid columns="repeat(auto-fill, minmax(220px, 1fr))">
            {related.map((product) => <Cell key={product.id} pad="none"><ProductCard name={product.name} kind={product.kind} price={product.price} rating={product.rating} reviews={product.reviews} tag={product.tag} action={<Button size="sm" icon={<PlusIcon />}>Add</Button>} /></Cell>)}
          </Grid>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Label>Keyboard</Label><Tag tone="info">New</Tag></div>
        <Heading level={1}>Meridian 75</Heading>
        <Rating readOnly value={4.5} showValue label="Meridian 75 rating" />
        <Numeric variant="display" prefix="$">189</Numeric>
        <Text tone="muted">Aluminium 75% board, hot-swap sockets, gasket mount.</Text>
        <div style={{ display: 'grid', gap: 8 }}><Label tone="ink">Switches</Label><ChoiceCard aria-label="Switches" options={switches} value={choice} onChange={setChoice} columns={1} /></div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <NumberInput value={quantity} onChange={setQuantity} min={1} max={9} aria-label="Quantity" />
          <Button variant="solid" icon={<PlusIcon />}>Add to cart · ${189 * quantity}</Button>
        </div>
        <div>
          <KeyValue label="Delivery">Two working days</KeyValue>
          <KeyValue label="Returns">Within thirty days</KeyValue>
          <KeyValue label="Stock">48 in stock</KeyValue>
        </div>
      </div>
    </ProductTemplate>
  );
}

const meta = { title: 'Pages/Product', component: ProductPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof ProductPage>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
