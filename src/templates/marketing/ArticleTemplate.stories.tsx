import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleTemplate } from './ArticleTemplate';

const slot = (name: string, height: number | string) => (
  <div className="gl-hatch" style={{ display: 'grid', placeItems: 'center', height, fontFamily: 'var(--gl-font-mono)', fontSize: 11, textTransform: 'uppercase' }}>{name}</div>
);

const meta = {
  title: 'Templates/Marketing/Article', tags: ['page', 'text'],
  component: ArticleTemplate,
  parameters: { layout: 'fullscreen' },
  args: { nav: slot('nav', 48), header: slot('title block', 120), children: <>{slot('body', 200)}{slot('body', 200)}</>, aside: slot('related', 200), footer: slot('footer', 48) },
} satisfies Meta<typeof ArticleTemplate>;
export default meta;

/** The skeleton with its slots. See Pages/Article for it filled in. */
export const Slots: StoryObj<typeof meta> = {};
