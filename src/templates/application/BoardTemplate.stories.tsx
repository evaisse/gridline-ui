import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoardTemplate } from './BoardTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Application/Board', tags: ['page', 'board'],
  component: BoardTemplate,
  parameters: { layout: 'fullscreen' },
  args: { header: slot('header', 96), filters: slot('filters', 32), children: slot('board', 360), footer: slot('footer', 32) },
} satisfies Meta<typeof BoardTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Board for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
