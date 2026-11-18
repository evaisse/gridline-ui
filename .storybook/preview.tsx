import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/tokens/fonts.css';
import '../src/tokens/tokens.css';
import '../src/tokens/base.css';

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Theme (fonts and tint)',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'soda', title: 'Soda' },
          { value: 'gridline', title: 'Gridline' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Colour mode',
      toolbar: {
        title: 'Mode',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: 'soda', theme: 'light' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as string;
      const brand = context.globals.brand as string;
      useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.dataset.brand = brand;
      }, [theme, brand]);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    controls: { expanded: false },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Introduction', 'Catalogue', 'Pages', 'Templates', 'Organisms', 'Molecules', 'Atoms', 'Tokens'],
      },
    },
  },
};

export default preview;
