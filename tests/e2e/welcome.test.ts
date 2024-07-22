import { expect, test } from '@nuxt/test-utils/playwright';

test('Welcome title', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' });
  const welcomeTitleSelection = await page.$(
    '#__nuxt > div > div > div > div.flex.flex-col.gap-y-4.items-center.justify-center > h1'
  );

  expect(await welcomeTitleSelection?.textContent()).toContain(
    'Welcome to Nuxt!'
  );
});
