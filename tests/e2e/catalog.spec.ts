import { expect, test } from '@playwright/test'

import { resetMockScenario } from './helpers/mockReset'

test.beforeEach(async ({ request }) => {
  await resetMockScenario(request, 'default')
})

test('home catalog loads NFT cards from MSW', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toBeVisible()
  await expect(page.locator('h1:visible', { hasText: 'SEJA DONO' })).toBeVisible()
})

test('nft detail handles missing resource', async ({ page }) => {
  await page.goto('/nfts/nft-inexistente')

  await expect(page.getByText('NFT não encontrado.')).toBeVisible()
})

test('catalog search query filters cards', async ({ page }) => {
  await page.goto('/?q=Emerald')

  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toBeVisible()
  await expect(page.getByText('Sage Nomad #009')).toHaveCount(0)
})

test('catalog sort writes the next mode to the url', async ({ page }, testInfo) => {
  testInfo.skip(testInfo.project.name === 'chromium-mobile', 'O controle de ordenação é só do desktop')

  await page.goto('/')
  await page.getByRole('button', { name: /Ordenar por/ }).click()

  await expect(page).toHaveURL(/sort=price-asc/)
  await expect(page.getByRole('button', { name: /Menor preço/ })).toBeVisible()
})

test('catalog collection filter limits the grid', async ({ page }, testInfo) => {
  testInfo.skip(testInfo.project.name === 'chromium-mobile', 'O filtro de coleção fica na coluna desktop')

  await page.goto('/')
  await page.getByRole('link', { name: 'Música (65)' }).click()

  await expect(page).toHaveURL(/collectionIds=music/)
  await expect(page.locator('a:visible', { hasText: 'Golden Beat #207' })).toBeVisible()
  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toHaveCount(0)
})

test('trending tab shows only rare nfts', async ({ page }) => {
  await page.goto('/')
  await page.locator('a:visible', { hasText: 'Em alta' }).first().click()

  await expect(page.locator('a:visible', { hasText: 'Ivory Baron #088' })).toBeVisible()
  await expect(page.getByText('Emerald Ape #042')).toHaveCount(0)
})

test('empty catalog scenario shows the empty state', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toBeVisible()

  const resetResponse = await page.evaluate(async () => {
    const response = await fetch('/api/mock/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario: 'empty-catalog' }),
    })

    return response.status
  })

  if (resetResponse !== 200) {
    throw new Error(`Reset do catálogo vazio respondeu ${resetResponse}`)
  }

  await page.reload()

  await expect(page.locator('p:visible', { hasText: 'Nenhum NFT encontrado.' })).toBeVisible()
})

test('unknown route renders not found', async ({ page }) => {
  await page.goto('/rota-que-nao-existe')

  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible()
})

test('login shows an error for the wrong password', async ({ page }) => {
  await page.goto('/login')
  await page.locator('input[type="password"]:visible').fill('senha-errada')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page.locator('[role="alert"]:visible')).toHaveText('Credenciais inválidas.')
})
