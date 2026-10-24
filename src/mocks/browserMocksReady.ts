import { shouldEnableMocks } from '@/mocks/enableMocks'

let markReady = () => {}

const mocksReady = new Promise<void>((resolve) => {
  markReady = resolve
})

export const browserMocksReady = shouldEnableMocks() ? mocksReady : Promise.resolve()

export function markBrowserMocksReady(): void {
  markReady()
}
