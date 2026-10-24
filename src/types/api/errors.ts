export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'PROMO_INVALID'
  | 'PROMO_EXPIRED'
  | 'AVAILABILITY_CONFLICT'
  | 'QUOTE_STALE'
  | 'IDEMPOTENCY_CONFLICT'
  | 'TRANSIENT_ERROR'
  | 'SESSION_EXPIRED'

export type ApiErrorBody = {
  error: {
    code: ApiErrorCode
    message: string
    details?: Record<string, string[]>
  }
}
