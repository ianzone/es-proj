import { defineConfig } from 'vitest/config';

// https://cn.vitest.dev/guide/
export const vitestConfigBase = defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'istanbul', // https://github.com/jestjs/jest/issues/11188
      include: ['src/**/*.ts'],
    },
  },
});
