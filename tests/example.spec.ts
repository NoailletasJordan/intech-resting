import { expect, test } from '@playwright/test'

test('should navigate from homepage to post pages', async ({ page }) => {
  await page.goto('/')

  const postATag = page.getByRole('link', { name: /post/ })

  const test = postATag.first()
  expect(test).toBeVisible()
})
