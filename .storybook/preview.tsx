import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/tokens/fonts.css';
import '../src/tokens/tokens.css';
import '../src/tokens/base.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as string;
      useEffect(() => {
        document.documentElement.dataset.theme = theme;
      }, [theme]);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    controls: { expanded: false },
    options: {
      storySort: {
        order: ['Introduction', 'Pages', 'Templates', 'Organisms', 'Molecules', 'Atoms', 'Tokens'],
      },
    },
  },
};

export default preview;
