import { mainConfigBase } from '@es-proj/storybook';
import type { StorybookConfig } from 'storybook-react-rsbuild';

export const mainConfig: StorybookConfig = {
  ...mainConfigBase,

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
};
