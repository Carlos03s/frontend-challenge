import { mockScenarioStorageKey } from '@/consts/storageKeys'
import { createInitialMockDbState } from '@/mocks/db/createInitialMockDbState'
import type { MockDbState } from '@/mocks/db/mockDbTypes'
import { getMockScenarioBehavior, isMockScenarioName } from '@/mocks/scenarios/mockScenarioRegistry'
import type { MockScenarioName } from '@/types/api/mockControl'

const mockDbStorageKey = 'kurio-mock-db-v2'

let inMemoryState: MockDbState | null = null

function readScenarioFromEnvironment(): MockScenarioName {
  const envScenario = import.meta.env.VITE_MOCK_SCENARIO

  if (isMockScenarioName(envScenario)) {
    return envScenario
  }

  return 'default'
}

function readScenarioFromStorage(): MockScenarioName | null {
  if (typeof localStorage === 'undefined') {
    return null
  }

  const storedScenario = localStorage.getItem(mockScenarioStorageKey)

  if (storedScenario === null) {
    return null
  }

  if (isMockScenarioName(storedScenario)) {
    return storedScenario
  }

  return null
}

export function getActiveMockScenario(): MockScenarioName {
  const storageScenario = readScenarioFromStorage()

  if (storageScenario !== null) {
    return storageScenario
  }

  return readScenarioFromEnvironment()
}

function persistMockDbState(state: MockDbState): void {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.setItem(mockDbStorageKey, JSON.stringify(state))
}

function loadMockDbStateFromStorage(): MockDbState | null {
  if (typeof localStorage === 'undefined') {
    return null
  }

  const serializedState = localStorage.getItem(mockDbStorageKey)

  if (serializedState === null) {
    return null
  }

  const parsedState = JSON.parse(serializedState) as MockDbState
  const hasValidSchema = parsedState.schemaVersion === 1

  if (!hasValidSchema) {
    return null
  }

  return parsedState
}

export function getMockDatabaseState(): MockDbState {
  const hasInMemoryState = inMemoryState !== null

  if (hasInMemoryState && inMemoryState !== null) {
    return inMemoryState
  }

  const storedState = loadMockDbStateFromStorage()
  const hasStoredState = storedState !== null

  if (hasStoredState) {
    inMemoryState = storedState
    return storedState
  }

  const initialScenario = getActiveMockScenario()
  const initialState = createInitialMockDbState(initialScenario)
  inMemoryState = initialState
  persistMockDbState(initialState)

  return initialState
}

export function updateMockDatabaseState(updater: (state: MockDbState) => void): MockDbState {
  const currentState = getMockDatabaseState()
  const nextState = structuredClone(currentState)

  updater(nextState)
  inMemoryState = nextState
  persistMockDbState(nextState)

  return nextState
}

export function resetMockDatabase(scenario: MockScenarioName): MockDbState {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(mockScenarioStorageKey, scenario)
  }

  const nextState = createInitialMockDbState(scenario)
  inMemoryState = nextState
  persistMockDbState(nextState)

  return nextState
}

export function getActiveMockScenarioBehavior() {
  const scenario = getMockDatabaseState().scenario

  return getMockScenarioBehavior(scenario)
}

export function nextMockEventSequence(): number {
  let nextSequence = 0

  updateMockDatabaseState((state) => {
    state.eventSequence += 1
    nextSequence = state.eventSequence
  })

  return nextSequence
}
