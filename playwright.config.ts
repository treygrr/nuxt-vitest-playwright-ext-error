import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from '@nuxt/test-utils/playwright';

const devicesToTest = [
  'Desktop Chrome',
  'Desktop Firefox',
  // Test against other common browser engines.
  // 'Desktop Firefox',
] satisfies Array<string | (typeof devices)[string]>;

/* See https://playwright.dev/docs/test-configuration. */
export default defineConfig<ConfigOptions>({
  timeout: 100000,
  testDir: './tests/e2e',
  outputDir: './testing-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    /* Nuxt configuration options */
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  projects: devicesToTest.map((p) =>
    typeof p === 'string' ? { name: p, use: devices[p] } : p
  ),
});
