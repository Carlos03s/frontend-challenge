import { expect, type Page } from '@playwright/test'

export async function waitForCatalog(page: Page): Promise<void> {
  await expect(page.locator('h1:visible', { hasText: 'SEJA DONO' })).toBeVisible()
}

export async function resetScenarioInPage(page: Page, scenario: string): Promise<void> {
  await page.goto('/')
  await waitForCatalog(page)

  const resetStatus = await page.evaluate(async (scenarioName) => {
    const response = await fetch('/api/mock/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario: scenarioName }),
    })

    return response.status
  }, scenario)

  if (resetStatus !== 200) {
    throw new Error(`Reset do cenário ${scenario} respondeu ${resetStatus}`)
  }
}

export async function loginAs(page: Page, email = 'collector@kurio.test'): Promise<void> {
  await page.goto('/login')
  await page.locator('input[placeholder="contato@email.com"]:visible').fill(email)
  await page.locator('input[placeholder="***********"]:visible').fill('Password123!')
  await page.locator('button:visible', { hasText: 'Entrar' }).click()
  await page.waitForURL((url) => !url.pathname.startsWith('/login'))
}

export async function postMock(page: Page, path: string, body: Record<string, string> = {}): Promise<number> {
  return page.evaluate(
    async ({ requestPath, requestBody }) => {
      const response = await fetch(requestPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      return response.status
    },
    { requestPath: path, requestBody: body },
  )
}
