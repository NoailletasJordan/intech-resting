import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(500)
})

test('Post pages navigation', async ({ page }) => {
  const postLinks = page.getByLabel('post-link')
  const postCount = await postLinks.count()

  for (let i = 0; i < postCount; i++) {
    await test.step(`navigate to post ${i}`, async () => {
      await page.goto('/') // reset homepage each time
      await page.waitForLoadState()
      await postLinks.nth(i).click()
      await page.waitForTimeout(500)
      await page.waitForLoadState()
      await expect(page.getByTestId('post-title')).toBeVisible()
    })
  }
})

test('Should change language', async ({ page }) => {
  await page.goto('/fr')
  await page.waitForLoadState()

  await test.step('Should switch to english', async () => {
    await page.waitForTimeout(1500)
    await page.getByRole('button', { name: 'Français' }).click()
    await page.getByRole('link', { name: 'English' }).click()
    await expect(page.getByText('RESTING', { exact: true })).toBeVisible()
  })

  await test.step('Should switch to french', async () => {
    await page.waitForTimeout(1500)
    await page.getByRole('button', { name: 'English' }).click()
    await page.getByRole('link', { name: 'Français' }).click()
    await expect(page.getByText('RESTING', { exact: true })).toBeVisible()
  })
})

test('Should navigate to portfolio page', async ({ page }) => {
  await page.getByRole('link', { name: 'Portfolio' }).click()
  await page.waitForLoadState()
  await expect(page.locator('.grid > div > div').first()).toBeVisible()
})
