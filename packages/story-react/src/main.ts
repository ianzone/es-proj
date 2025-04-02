import type { StorybookConfig } from 'storybook-react-rsbuild';

export const mainConfig: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    // https://storybook.js.org/addons
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    // https://storybook.js.org/docs/essentials
    '@storybook/addon-essentials',
    // https://storybook.js.org/docs/essentials/interactions
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    'storybook-addon-rslib',
  ],

  webpackAddons: [
    {
      // https://storybook.rsbuild.dev/guide/options/builder-options.html#using-customized-addon
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          include: ['src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
          exclude: [],
        },
      },
    },
  ],

  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
