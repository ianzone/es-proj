import { mainConfigBase } from '@es-proj/storybook';
import type { StorybookConfig } from 'storybook-react-rsbuild';

// https://storybook.rsbuild.dev/guide/integrations/rslib.html
mainConfigBase.addons?.push('storybook-addon-rslib');

export const mainConfig: StorybookConfig = {
  ...mainConfigBase,

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
    // https://storybook-rsbuild.netlify.app/guide/framework/react.html
    name: 'storybook-react-rsbuild',
    options: {
      strictMode: true,
    },
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  core: undefined,
};
