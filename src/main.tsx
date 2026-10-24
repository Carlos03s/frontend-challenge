import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { queryClient } from '@/app/queryClient'
import { router } from '@/app/router'
import { markBrowserMocksReady } from '@/mocks/browserMocksReady'
import { shouldEnableMocks } from '@/mocks/enableMocks'
import { RealtimeProvider } from '@/providers/RealtimeProvider'
import '@/styles/globals.css'

const rootElement = document.getElementById('root')
const hasRootElement = rootElement !== null

if (!hasRootElement) {
  throw new Error('Root element was not found')
}

function startMocksWithoutBlockingPaint(): void {
  const mocksAreEnabled = shouldEnableMocks()

  if (!mocksAreEnabled) {
    markBrowserMocksReady()
    return
  }

  void import('@/mocks/startBrowserMocks')
    .then((mocksModule) => mocksModule.startBrowserMocks())
    .finally(markBrowserMocksReady)
}

function renderApplication(): void {
  startMocksWithoutBlockingPaint()

  createRoot(rootElement as HTMLElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RealtimeProvider>
          <RouterProvider router={router} />
        </RealtimeProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

renderApplication()
