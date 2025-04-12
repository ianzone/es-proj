import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export const rslibConfig = defineConfig({
  source: {
    entry: {
      index: ['src/**', '!src/**/*.{test,spec,stories}.*', '!src/**/*.mdx'],
    },
  },
  plugins: [pluginReact()],
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
    sourceMap: true,
  },
});
