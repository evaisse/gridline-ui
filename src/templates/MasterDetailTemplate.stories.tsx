import type { Meta, StoryObj } from '@storybook/react-vite';
import { MasterDetailTemplate } from './MasterDetailTemplate';

const slot = (name: string, height: number) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>
    {name}
  </div>
);

const meta = {
  title: 'Templates/MasterDetail',
  component: MasterDetailTemplate,
  parameters: { layout: 'fullscreen' },
  args: { master: slot('master', 480), toolbar: slot('toolbar', 40), children: slot('children', 320) },
} satisfies Meta<typeof MasterDetailTemplate>;
export default meta;

/** The skeleton with its three slots. See Pages/Package detail for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
