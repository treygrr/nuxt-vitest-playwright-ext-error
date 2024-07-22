// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config';
import { configDefaults } from 'vitest/config';

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    exclude: [...configDefaults.exclude, './src/tests/e2e/*'],
  },
});
