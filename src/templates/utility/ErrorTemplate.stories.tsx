import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorTemplate } from './ErrorTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Utility/Error', tags: ['page', 'status'],
  component: ErrorTemplate,
  parameters: { layout: 'fullscreen' },
  args: { code: '404', title: 'Title', description: 'Description', actions: slot('actions', 32), detail: 'detail' },
} satisfies Meta<typeof ErrorTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Not found for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
