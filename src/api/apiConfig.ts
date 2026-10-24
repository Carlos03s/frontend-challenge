const defaultApiBaseUrl = '/api'
const defaultSocketPath = '/socket.io'

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? defaultApiBaseUrl
export const socketPath = import.meta.env.VITE_SOCKET_PATH ?? defaultSocketPath

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${apiBaseUrl}${normalizedPath}`
}

export function getSocketIoWebSocketLinkPattern(): string {
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'

    return `${protocol}//${window.location.host}`
  }

  return 'ws://127.0.0.1:4173'
}
