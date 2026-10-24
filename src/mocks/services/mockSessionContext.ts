import type { MockDbSession, MockDbUser } from '@/mocks/db/mockDbTypes'
import { getMockDatabaseState } from '@/mocks/db/mockDatabase'

export type MockRequestAuthContext = {
  session: MockDbSession | null
  user: MockDbUser | null
}

function parseBearerToken(authorizationHeader: string | null): string | null {
  if (authorizationHeader === null) {
    return null
  }

  const bearerPrefix = 'Bearer '
  const hasBearerPrefix = authorizationHeader.startsWith(bearerPrefix)

  if (!hasBearerPrefix) {
    return null
  }

  return authorizationHeader.slice(bearerPrefix.length)
}

export function resolveMockRequestAuth(authorizationHeader: string | null): MockRequestAuthContext {
  const token = parseBearerToken(authorizationHeader)
  const hasToken = token !== null

  if (!hasToken) {
    return { session: null, user: null }
  }

  const dbState = getMockDatabaseState()
  const session = dbState.sessions.find((sessionItem) => sessionItem.token === token) ?? null
  const hasSession = session !== null

  if (!hasSession) {
    return { session: null, user: null }
  }

  const isExpired = new Date(session.expiresAt).getTime() <= Date.now()

  if (isExpired) {
    return { session: null, user: null }
  }

  const user = dbState.users.find((userItem) => userItem.id === session.userId) ?? null

  return { session, user }
}

export function requireMockRequestUser(authorizationHeader: string | null): MockRequestAuthContext {
  const authContext = resolveMockRequestAuth(authorizationHeader)
  const hasUser = authContext.user !== null

  if (!hasUser) {
    return authContext
  }

  return authContext
}
