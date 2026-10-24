import { setupWorker } from 'msw/browser'

import { mockHandlers } from '@/mocks/handlers'

export async function startBrowserMocks(): Promise<void> {
  const worker = setupWorker(...mockHandlers)

  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}
