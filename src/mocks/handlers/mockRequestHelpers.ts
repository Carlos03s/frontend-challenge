import type { MockDbUser } from '@/mocks/db/mockDbTypes'
import { resolveMockRequestAuth } from '@/mocks/services/mockSessionContext'

export function readAuthorizationHeader(request: Request): string | null {
  return request.headers.get('Authorization')
}

export function readGuestCartIdHeader(request: Request): string | null {
  return request.headers.get('X-Guest-Cart-Id')
}

export function readIdempotencyKeyHeader(request: Request): string | null {
  return request.headers.get('Idempotency-Key')
}

export function resolveMockUserFromRequest(request: Request): MockDbUser | null {
  const authorizationHeader = readAuthorizationHeader(request)
  const authContext = resolveMockRequestAuth(authorizationHeader)

  return authContext.user
}

export function createGuestCartIdIfMissing(guestCartId: string | null): string {
  const hasGuestCartId = guestCartId !== null && guestCartId.length > 0

  if (hasGuestCartId) {
    return guestCartId
  }

  return crypto.randomUUID()
}

export function appendGuestCartIdHeader(headers: Headers, guestCartId: string): void {
  headers.set('X-Guest-Cart-Id', guestCartId)
}
