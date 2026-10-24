import { expect, test } from '@playwright/test'

import { resetMockScenario } from './helpers/mockReset'

test.beforeEach(async ({ request }) => {
  await resetMockScenario(request, 'default')
})

test('collector login and checkout confirmation', async ({ page }) => {
  await page.goto('/login?redirect=/pagamento')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await page.waitForURL('**/pagamento')

  await page.getByRole('button', { name: 'Confirmar compra' }).click()

  await expect(page.getByText('Seus NFTs agora estão na sua carteira')).toBeVisible({
    timeout: 15_000,
  })
})
