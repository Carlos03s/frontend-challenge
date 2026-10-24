import { HttpResponse } from 'msw'

import type { ApiErrorBody, ApiErrorCode } from '@/types/api/errors'

export function mockJsonResponse(body: Record<string, unknown> | unknown[], status = 200, headers?: HeadersInit): Response {
  return HttpResponse.json(body, { status, headers })
}

export function mockErrorResponse(
  status: number,
  code: ApiErrorCode,
  message: string,
  details?: Record<string, string[]>,
): Response {
  const body: ApiErrorBody = {
    error: {
      code,
      message,
      details,
    },
  }

  return HttpResponse.json(body, { status })
}

export function mockMissingSessionResponse(request: Request): Response {
  const authorizationHeader = request.headers.get('Authorization')
  const hasBearerToken =
    authorizationHeader !== null && authorizationHeader.startsWith('Bearer ')

  if (hasBearerToken) {
    return mockErrorResponse(401, 'SESSION_EXPIRED', 'Sessão expirada ou inválida.')
  }

  return mockErrorResponse(401, 'UNAUTHORIZED', 'Autenticação necessária.')
}
