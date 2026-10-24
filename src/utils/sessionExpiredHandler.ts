type SessionExpiredHandler = (redirectPath: string | null) => void

const expiryGuardMs = 1000

let sessionExpiredHandler: SessionExpiredHandler | null = null
let isExpiryInProgress = false

export function registerSessionExpiredHandler(handler: SessionExpiredHandler): void {
  sessionExpiredHandler = handler
}

export function notifySessionExpired(redirectPath: string | null): void {
  if (isExpiryInProgress) {
    return
  }

  isExpiryInProgress = true
  sessionExpiredHandler?.(redirectPath)

  window.setTimeout(() => {
    isExpiryInProgress = false
  }, expiryGuardMs)
}
