import type { APIRequestContext } from '@playwright/test'

export async function resetMockScenario(request: APIRequestContext, scenario = 'default'): Promise<void> {
  await request.post('/api/mock/reset', {
    data: { scenario },
  })
}
