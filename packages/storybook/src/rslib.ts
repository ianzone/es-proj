import { defineConfig } from '@rslib/core';

export const rslibConfigBase = defineConfig({
  source: {
    entry: {
      index: ['src/**', '!src/**/*.{test,spec,stories}.*', '!src/**/*.mdx'],
    },
  },
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
