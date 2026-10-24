import { delay } from 'msw'

import { mockFailNextStorageKey } from '@/consts/storageKeys'
import { getActiveMockScenarioBehavior } from '@/mocks/db/mockDatabase'
import { mockErrorResponse } from '@/mocks/utils/mockHttpResponses'

const transientErrorCode = 'TRANSIENT_ERROR'
const transientErrorMessage = 'Serviço temporariamente indisponível. Tente novamente.'

export function armNextMockFailure(): void {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.setItem(mockFailNextStorageKey, '1')
}

export function consumeForcedFailure(): boolean {
  if (typeof localStorage === 'undefined') {
    return false
  }

  const hasForcedFailure = localStorage.getItem(mockFailNextStorageKey) === '1'

  if (!hasForcedFailure) {
    return false
  }

  localStorage.removeItem(mockFailNextStorageKey)

  return true
}

export async function applyMockNetworkBehavior(): Promise<Response | null> {
  const scenarioBehavior = getActiveMockScenarioBehavior()
  const jitter = Math.floor(Math.random() * scenarioBehavior.latencyJitterMs)
  const totalDelay = scenarioBehavior.latencyMs + jitter

  await delay(totalDelay)

  const shouldFail = Math.random() < scenarioBehavior.failRate

  if (shouldFail) {
    return mockErrorResponse(503, transientErrorCode, transientErrorMessage)
  }

  return null
}
