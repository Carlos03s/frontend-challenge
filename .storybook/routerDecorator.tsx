import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import type { ReactNode } from 'react'

const storybookRootRoute = createRootRoute()

const storybookRouter = createRouter({
  routeTree: storybookRootRoute,
  history: createMemoryHistory({ initialEntries: ['/'] }),
})

export function StorybookRouterDecorator(Story: () => ReactNode) {
  return (
    <RouterProvider router={storybookRouter}>
      <Story />
    </RouterProvider>
  )
}
