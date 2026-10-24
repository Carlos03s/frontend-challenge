import { setupServer } from 'msw/node'

import { mockHandlers } from '@/mocks/handlers'

export const mockNodeServer = setupServer(...mockHandlers)

export function startNodeMocks(): void {
  mockNodeServer.listen({
    onUnhandledRequest: 'bypass',
  })
}

export function stopNodeMocks(): void {
  mockNodeServer.close()
}
