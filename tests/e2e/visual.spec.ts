import { expect, test } from '@playwright/test'

import { loginAs } from './helpers/browserMock'

test('home matches the visual baseline', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, 0))

  await expect(page).toHaveScreenshot('home.png')
})

test('nft detail matches the visual baseline', async ({ page }) => {
  await page.goto('/nfts/nft-emerald-ape-042')
  await expect(page.locator(':is(p, h1):visible', { hasText: /^Emerald Ape #042$/ })).toBeVisible()

  await expect(page).toHaveScreenshot('nft-detail.png')
})

test('cart matches the visual baseline', async ({ page }) => {
  await loginAs(page)
  await page.goto('/carrinho')
  await expect(page.locator('p:visible', { hasText: /^Emerald Ape #042$/ })).toBeVisible()

  await expect(page).toHaveScreenshot('cart.png')
})

test('checkout matches the visual baseline', async ({ page }) => {
  await loginAs(page)
  await page.goto('/pagamento')
  await expect(page.getByRole('button', { name: 'Confirmar compra' })).toBeVisible()

  await expect(page).toHaveScreenshot('checkout.png')
})
