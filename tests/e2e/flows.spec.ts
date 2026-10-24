import { expect, test, type Page } from '@playwright/test'

import { loginAs, postMock, resetScenarioInPage, waitForCatalog } from './helpers/browserMock'

async function buyVisibleNft(page: Page): Promise<void> {
  await page.locator('button:visible', { hasText: /COMPRAR|Comprar NFT/ }).first().click()
  await page.waitForURL('**/carrinho')
}

test('catalog combines filters', async ({ page }) => {
  await page.goto('/?q=Golden&collectionIds=music&sort=price-asc')

  await expect(page.locator('a:visible', { hasText: 'Golden Beat #207' })).toBeVisible()
  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toHaveCount(0)
})

test('catalog pagination and history restore the list', async ({ page }, testInfo) => {
  testInfo.skip(testInfo.project.name === 'chromium-mobile', 'Paginação e histórico usam a coluna desktop')

  await page.goto('/')
  await page.locator('nav[aria-label="Paginação do catálogo"]:visible').getByRole('button', { name: '2', exact: true }).click()
  await expect(page).toHaveURL(/page=2/)
  await expect(page.locator('a:visible', { hasText: 'Midnight Ape #812' })).toBeVisible()
  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toHaveCount(0)

  await page.goto('/')
  await page.getByRole('link', { name: 'Música (65)' }).click()
  await expect(page).toHaveURL(/collectionIds=music/)
  await page.goBack()
  await expect(page).not.toHaveURL(/collectionIds=music/)
  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toBeVisible()
})

test('direct nft detail loads the resource', async ({ page }) => {
  await page.goto('/nfts/nft-emerald-ape-042')

  await expect(page.locator(':is(p, h1):visible', { hasText: /^Emerald Ape #042$/ })).toBeVisible()
  await expect(page.locator('button:visible', { hasText: /COMPRAR|Comprar NFT/ }).first()).toBeVisible()
})

test('signup validates, creates an account and rejects a duplicate', async ({ page }) => {
  await page.goto('/cadastro')
  await page.locator('button:visible', { hasText: /^Criar (conta|perfil)$/ }).click()
  await expect(page.locator('[role="alert"]:visible')).toHaveText('Informe um nome de usuário.')

  const suffix = Date.now().toString()
  await page.locator('input:visible[placeholder="Nome de usuário"]').fill(`colecionador${suffix}`)
  await page.locator('input:visible[placeholder="Digite seu e-mail"]').fill(`colecionador${suffix}@kurio.test`)
  await page.locator('input:visible[placeholder="Senha"]').fill('Password123!')
  await page.locator('input:visible[placeholder="Confirmar senha"]').fill('Password123!')
  await page.locator('button:visible', { hasText: /^Criar (conta|perfil)$/ }).click()

  await page.waitForURL('**/perfil')
  await expect(page.locator('input[aria-label="Nome de exibição"]:visible')).toHaveValue(`colecionador${suffix}`)

  await page.goto('/cadastro')
  await page.locator('input:visible[placeholder="Nome de usuário"]').fill('collector')
  await page.locator('input:visible[placeholder="Digite seu e-mail"]').fill('collector@kurio.test')
  await page.locator('input:visible[placeholder="Senha"]').fill('Password123!')
  await page.locator('input:visible[placeholder="Confirmar senha"]').fill('Password123!')
  await page.locator('button:visible', { hasText: /^Criar (conta|perfil)$/ }).click()
  await expect(page.locator('[role="alert"]:visible')).toHaveText('E-mail ou nome de usuário já cadastrado.')
})

test('expired session returns to login and logout switches users', async ({ page }) => {
  await loginAs(page)
  await page.evaluate(() => {
    const storageKey = 'kurio-mock-db-v2'
    const serializedDatabase = localStorage.getItem(storageKey)

    if (serializedDatabase === null) {
      throw new Error('Banco simulado ausente')
    }

    const database = JSON.parse(serializedDatabase) as { sessions: Array<{ expiresAt: string }> }
    database.sessions.forEach((session) => {
      session.expiresAt = new Date(Date.now() - 60_000).toISOString()
    })
    localStorage.setItem(storageKey, JSON.stringify(database))
  })
  await page.goto('/perfil')
  await expect(page).toHaveURL(/\/login\?redirect=/)

  await loginAs(page)
  await page.goto('/perfil')
  await page.getByRole('button', { name: 'Sair' }).click()
  await expect.poll(() => page.evaluate(() => localStorage.getItem('kurio-session-token'))).toBeNull()

  await loginAs(page, 'artist@kurio.test')
  await page.goto('/perfil')
  await expect(page.locator('input[aria-label="Nome de exibição"]:visible')).toHaveValue('Artist Two')
})

test('favorite mutation rolls back when the request fails', async ({ page }) => {
  await page.route('**/api/favorites/**', async (route) => {
    const isFavoriteWrite = route.request().method() === 'DELETE' || route.request().method() === 'POST'

    if (!isFavoriteWrite) {
      await route.fallback()
      return
    }

    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: { code: 'TRANSIENT_ERROR', message: 'Falha ao atualizar favorito.' },
      }),
    })
  })

  await loginAs(page)
  await page.goto('/nfts/nft-emerald-ape-042')
  const favoriteButton = page.getByRole('button', { name: 'Favoritado' })
  await expect(favoriteButton).toBeVisible()
  await favoriteButton.click()
  await expect(favoriteButton).toBeVisible()
})

test('cart quantity, coupon and refresh survive a new session', async ({ page }) => {
  await page.goto('/nfts/nft-sage-nomad-009')
  await buyVisibleNft(page)
  await expect(page.locator('p:visible', { hasText: 'Sage Nomad #009' })).toBeVisible()

  await page.getByRole('button', { name: 'Aumentar quantidade' }).first().click()
  await expect(page.locator(':is(p, span):visible', { hasText: /^2$/ }).first()).toBeVisible()
  await page.reload()
  await expect(page.locator('p:visible', { hasText: 'Sage Nomad #009' })).toBeVisible()

  await page.locator('input:visible[placeholder="Digite o código promocional..."]').fill('LAUNCH2026')
  await page.locator('button:visible', { hasText: 'Aplicar' }).click()
  await expect(page.locator('p:visible', { hasText: '(-) 0.50' })).toBeVisible()

  await page.getByRole('button', { name: 'Remover item' }).first().click()
  await expect(page.getByText('Sage Nomad #009')).toHaveCount(0)

  await page.goto('/nfts/nft-sage-nomad-009')
  await buyVisibleNft(page)
  await loginAs(page)
  await page.goto('/carrinho')
  await expect(page.locator('p:visible', { hasText: 'Sage Nomad #009' })).toBeVisible()
})

test('purchase goes from the catalog to the confirmed receipt', async ({ page }) => {
  await page.goto('/nfts/nft-sage-nomad-009')
  await buyVisibleNft(page)
  await page.locator('button:visible', { hasText: 'Conectar e finalizar' }).click()
  await page.waitForURL('**/login**')
  await page.locator('button:visible', { hasText: 'Entrar' }).click()
  await page.waitForURL('**/pagamento')
  await page.getByRole('button', { name: 'Confirmar compra' }).click()

  await expect(page.getByText('Seus NFTs agora estão na sua carteira')).toBeVisible({ timeout: 15_000 })
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Fechar modal' })).toBeFocused()
})

test('payment rejection keeps the cart and a repeated confirm stays on one order', async ({ page }) => {
  await resetScenarioInPage(page, 'payment-rejected')
  await loginAs(page)
  await page.goto('/pagamento')

  const orderIds: string[] = []
  page.on('response', async (response) => {
    const isOrderCreate = response.request().method() === 'POST' && response.url().includes('/api/orders')

    if (!isOrderCreate || !response.ok()) {
      return
    }

    const order = (await response.json()) as { id: string }
    orderIds.push(order.id)
  })

  await page.getByRole('button', { name: 'Confirmar compra' }).click({ clickCount: 2 })
  await expect(page.getByText('Pagamento recusado. Os itens continuam no carrinho.')).toBeVisible({
    timeout: 15_000,
  })
  await expect(page.getByText('Seus NFTs agora estão na sua carteira')).toHaveCount(0)
  await expect.poll(() => orderIds.length).toBeGreaterThan(0)
  await expect.poll(() => new Set(orderIds).size).toBe(1)

  await page.goto('/carrinho')
  await expect(page.locator('p:visible', { hasText: 'Emerald Ape #042' })).toBeVisible()
})

test('pending order reloads into the same confirmation', async ({ page }) => {
  test.setTimeout(30_000)
  await resetScenarioInPage(page, 'payment-timeout')
  await loginAs(page)
  await page.goto('/pagamento')

  let orderCreateCount = 0
  page.on('request', (request) => {
    const isOrderCreate = request.method() === 'POST' && request.url().includes('/api/orders')

    if (isOrderCreate) {
      orderCreateCount += 1
    }
  })

  await page.getByRole('button', { name: 'Confirmar compra' }).click()
  await expect(page.getByText('Pagamento pendente. A confirmação chega sem criar outro pedido.')).toBeVisible()
  await page.reload()
  await expect(page.getByText(/Pagamento pendente|Seus NFTs agora estão na sua carteira/).first()).toBeVisible()
  await expect(page.getByText('Seus NFTs agora estão na sua carteira')).toBeVisible({ timeout: 20_000 })
  expect(orderCreateCount).toBe(1)
})

test('profile, avatar, password and wallet surface validation errors', async ({ page }) => {
  await loginAs(page)
  await page.goto('/perfil')

  const displayName = page.locator('input[aria-label="Nome de exibição"]:visible')
  await displayName.fill(' ')
  await page.getByRole('button', { name: 'Salvar', exact: true }).click()
  await expect(page.getByText('Informe o nome de exibição.')).toBeVisible()

  await displayName.fill('Collector One')
  await page.getByRole('button', { name: 'Alterar' }).click()
  await expect(page.locator('img[src="/assets/home/figma/ape-golden.webp"]')).toBeVisible()

  await page.locator('input:visible[placeholder="Senha atual"]').fill('errada')
  await page.locator('input:visible[placeholder="Nova senha"]').fill('Password123!')
  await page.locator('input:visible[placeholder="Confirmar nova senha"]').fill('Password123!')
  await page.getByRole('button', { name: 'Salvar', exact: true }).click()
  await expect(page.getByText('Senha atual inválida.')).toBeVisible()

  await page.goto('/carteiras')
  await page.locator('input[aria-label="Endereço da carteira"]:visible').fill('abc')
  await page.getByRole('button', { name: 'Salvar carteira' }).click()
  await expect(page.getByText('Informe um endereço 0x válido.')).toBeVisible()
})

test('socket price change makes the checkout quote stale', async ({ page }) => {
  await loginAs(page)
  await page.goto('/pagamento')
  await expect(page.getByRole('button', { name: 'Confirmar compra' })).toBeVisible()

  const triggerStatus = await postMock(page, '/api/mock/trigger/nft-price-change', {
    nftId: 'nft-emerald-ape-042',
    priceEth: '9.99',
  })
  expect(triggerStatus).toBe(200)

  await expect(page.getByText('A cotação mudou. Revise o carrinho antes de continuar.')).toBeVisible()
})

test('duplicate and stale nft events do not refetch the catalog', async ({ page }) => {
  await page.goto('/')
  await waitForCatalog(page)
  await page.waitForTimeout(600)

  let nftListRequests = 0
  page.on('request', (request) => {
    const isNftList = request.method() === 'GET' && /\/api\/nfts(\?|$)/.test(request.url())

    if (isNftList) {
      nftListRequests += 1
    }
  })

  const priceStatus = await postMock(page, '/api/mock/trigger/nft-price-change', {
    nftId: 'nft-emerald-ape-042',
    priceEth: '9.99',
  })
  expect(priceStatus).toBe(200)
  await expect(page.locator('p:visible', { hasText: '9.99 ETH' }).first()).toBeVisible()
  await page.waitForTimeout(600)
  const requestsAfterPriceChange = nftListRequests

  const replayStatus = await postMock(page, '/api/mock/trigger/nft-event-replay')
  expect(replayStatus).toBe(200)
  await page.waitForTimeout(800)
  expect(nftListRequests).toBe(requestsAfterPriceChange)

  const staleStatus = await postMock(page, '/api/mock/trigger/nft-stale-event', {
    nftId: 'nft-emerald-ape-042',
  })
  expect(staleStatus).toBe(200)
  await page.waitForTimeout(800)
  expect(nftListRequests).toBe(requestsAfterPriceChange)
})

test('keyboard moves through the login form and signup reports the first error', async ({ page }, testInfo) => {
  await page.goto('/login')

  if (testInfo.project.name !== 'chromium-mobile') {
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.locator('input[placeholder="contato@email.com"]:visible')).toBeFocused()
  }

  await page.locator('input[placeholder="contato@email.com"]:visible').focus()
  await page.keyboard.press('Tab')
  await expect(page.locator('input[placeholder="***********"]:visible')).toBeFocused()

  await page.goto('/cadastro')
  await page.locator('button:visible', { hasText: /^Criar (conta|perfil)$/ }).click()
  await expect(page.locator('[role="alert"]:visible')).toHaveText('Informe um nome de usuário.')
})

test('slow catalog shows a skeleton and a failed list recovers', async ({ page }) => {
  await resetScenarioInPage(page, 'slow')
  await page.reload()
  await expect(page.locator('.animate-pulse:visible').first()).toBeVisible()
  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toBeVisible({ timeout: 15_000 })

  const listStatuses: number[] = []
  page.on('response', (response) => {
    const isNftList = response.request().method() === 'GET' && /\/api\/nfts(\?|$)/.test(response.url())

    if (isNftList) {
      listStatuses.push(response.status())
    }
  })

  const failStatus = await postMock(page, '/api/mock/fail-next')
  expect(failStatus).toBe(200)
  await page.goto('/?q=Emerald')
  await expect(page.locator('a:visible', { hasText: 'Emerald Ape #042' })).toBeVisible({ timeout: 15_000 })
  expect(listStatuses).toContain(503)
})
