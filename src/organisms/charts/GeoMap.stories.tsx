import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChartFrame } from './Chart';
import { GeoMap, type MapMarker, type MapRegion } from './GeoMap';

/** Coarse invented continental boxes, as [lon, lat] corners. They are not real borders. */
const box = (id: string, label: string, value: number, w: number, s: number, e: number, n: number): MapRegion => ({ id, label, value, path: [[w, n], [e, n], [e, s], [w, s]] });
const regions: MapRegion[] = [
  box('na', 'North America', 4200, -165, 15, -55, 70),
  box('sa', 'South America', 1300, -80, -55, -35, 10),
  box('eu', 'Europe', 5600, -10, 36, 40, 70),
  box('af', 'Africa', 600, -17, -34, 50, 34),
  box('as', 'Asia', 3900, 45, 5, 145, 70),
  box('oc', 'Oceania', 800, 113, -44, 154, -10),
];

const markers: MapMarker[] = [
  { lat: 51.5, lon: -0.1, label: 'Mirror LHR', value: 920 },
  { lat: 40.7, lon: -74, label: 'Mirror NYC', value: 1380 },
  { lat: 37.8, lon: -122.4, label: 'Mirror SFO', value: 1110 },
  { lat: 35.7, lon: 139.7, label: 'Mirror NRT', value: 740 },
  { lat: 1.3, lon: 103.8, label: 'Mirror SIN', value: 410 },
  { lat: -23.5, lon: -46.6, label: 'Mirror GRU', value: 260 },
  { lat: -33.9, lon: 151.2, label: 'Mirror SYD', value: 190 },
  { lat: -26.2, lon: 28, label: 'Mirror JNB', value: 90 },
];

const meta = { title: 'Organisms/Charts/GeoMap', tags: ['data', 'media'], component: GeoMap, decorators: [(Story) => <div style={{ maxWidth: 820 }}><Story /></div>] } satisfies Meta<typeof GeoMap>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Markers: Story = { render: () => <ChartFrame title="Registry mirrors" description="Downloads per hour, by location" meta="Nov 2026" height={360}><GeoMap markers={markers} aria-label="Registry mirrors" /></ChartFrame> };

export const Regions: Story = { render: () => <ChartFrame title="Installs by region" description="Regions are coarse boxes" height={360}><GeoMap regions={regions} markers={markers} labels={false} aria-label="Installs by region" /></ChartFrame> };

function Selectable() {
  const [picked, setPicked] = useState<string>('None');
  return (
    <ChartFrame title="Zoomed to Europe and Asia" footer={`Selected: ${picked}`} height={320}>
      <GeoMap bounds={[-20, 0, 150, 72]} graticule={10} regions={regions} markers={markers.filter((m) => m.lon > -20)} onMarkerClick={(m) => setPicked(m.label)} />
    </ChartFrame>
  );
}
export const Zoomed: Story = { render: () => <Selectable /> };
