import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  core: { disableTelemetry: true },
  // Placeholders for planned components are hidden from the sidebar until the `planned` tag is switched on.
  tags: { planned: { defaultFilterSelection: 'exclude' } },
  framework: { name: '@storybook/react-vite', options: {} },
};

export default config;
