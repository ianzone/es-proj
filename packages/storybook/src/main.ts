import type { StorybookConfig } from '@storybook/core/types';

export const mainConfigBase: StorybookConfig = {
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
  ],
};
