import type { MockDbSession, MockDbUser } from '@/mocks/db/mockDbTypes'
import { getMockDatabaseState, updateMockDatabaseState } from '@/mocks/db/mockDatabase'
import { mergeGuestCartIntoUserCart } from '@/mocks/services/cartService'
import type { AuthLoginRequest, AuthRegisterRequest, AuthSessionDto } from '@/types/api/auth'
import { hashPassword } from '@/utils/hashPassword'
import { validateSignUpForm } from '@/utils/validateAccountForms'

const sessionDurationMs = 1000 * 60 * 60 * 8

function createSessionToken(userId: string): string {
  return `mock-session-${userId}-${crypto.randomUUID()}`
}

function mapUserToSessionDto(session: MockDbSession, user: MockDbUser): AuthSessionDto {
  return {
    token: session.token,
    expiresAt: session.expiresAt,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
    },
  }
}

function createSessionForUser(userId: string): AuthSessionDto {
  const dbState = getMockDatabaseState()
  const user = dbState.users.find((userItem) => userItem.id === userId)

  if (user === undefined) {
    throw new Error('User not found for session creation')
  }

  const token = createSessionToken(userId)
  const expiresAt = new Date(Date.now() + sessionDurationMs).toISOString()
  const session: MockDbSession = {
    token,
    userId,
    expiresAt,
  }

  updateMockDatabaseState((state) => {
    state.sessions = state.sessions.filter((sessionItem) => sessionItem.userId !== userId)
    state.sessions.push(session)
  })

  return mapUserToSessionDto(session, user)
}

export async function registerMockUser(
  payload: AuthRegisterRequest,
): Promise<AuthSessionDto | 'CONFLICT' | 'VALIDATION_ERROR'> {
  const fieldErrors = validateSignUpForm({
    username: payload.username,
    email: payload.email,
    password: payload.password,
    confirmPassword: payload.password,
  })

  if (fieldErrors !== null) {
    return 'VALIDATION_ERROR'
  }

  const dbState = getMockDatabaseState()
  const emailExists = dbState.users.some((user) => user.email === payload.email)
  const usernameExists = dbState.users.some((user) => user.username === payload.username)

  if (emailExists || usernameExists) {
    return 'CONFLICT'
  }

  const newUserId = `user-${crypto.randomUUID()}`
  const passwordHash = await hashPassword(payload.password)

  updateMockDatabaseState((state) => {
    state.users.push({
      id: newUserId,
      username: payload.username,
      email: payload.email,
      displayName: payload.username,
      password: passwordHash,
      ensName: '',
      walletAlias: '',
      avatarUrl: null,
      favoriteNftIds: [],
    })
  })

  return createSessionForUser(newUserId)
}

export async function loginMockUser(
  payload: AuthLoginRequest,
  guestCartId: string | null,
): Promise<AuthSessionDto | 'UNAUTHORIZED'> {
  const dbState = getMockDatabaseState()
  const passwordHash = await hashPassword(payload.password)
  const user = dbState.users.find(
    (userItem) => userItem.email === payload.email && userItem.password === passwordHash,
  )

  if (user === undefined) {
    return 'UNAUTHORIZED'
  }

  mergeGuestCartIntoUserCart(guestCartId, user)

  return createSessionForUser(user.id)
}

export function getMockSession(token: string): AuthSessionDto | null {
  const dbState = getMockDatabaseState()
  const session = dbState.sessions.find((sessionItem) => sessionItem.token === token) ?? null

  if (session === null) {
    return null
  }

  const isExpired = new Date(session.expiresAt).getTime() <= Date.now()

  if (isExpired) {
    return null
  }

  const user = dbState.users.find((userItem) => userItem.id === session.userId)

  if (user === undefined) {
    return null
  }

  return mapUserToSessionDto(session, user)
}

export function logoutMockSession(token: string): void {
  updateMockDatabaseState((state) => {
    state.sessions = state.sessions.filter((sessionItem) => sessionItem.token !== token)
  })
}
