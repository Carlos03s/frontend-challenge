import { sessionTokenStorageKey } from '@/consts/storageKeys'

export const sessionChangedEventName = 'kurio-session-changed'

function notifySessionChanged(): void {
  window.dispatchEvent(new Event(sessionChangedEventName))
}

export function readSessionToken(): string | null {
  return localStorage.getItem(sessionTokenStorageKey)
}

export function writeSessionToken(token: string): void {
  localStorage.setItem(sessionTokenStorageKey, token)
  notifySessionChanged()
}

export function clearSessionToken(): void {
  localStorage.removeItem(sessionTokenStorageKey)
  notifySessionChanged()
}

export function hasSessionToken(): boolean {
  const token = readSessionToken()
  return token !== null && token.length > 0
}
