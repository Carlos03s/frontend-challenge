import { io, type Socket } from 'socket.io-client'

import { socketPath } from '@/api/apiConfig'
import { sessionTokenStorageKey } from '@/consts/storageKeys'

let activeSocket: Socket | null = null

export function createSocketClient(): Socket {
  const hasActiveSocket = activeSocket !== null

  if (hasActiveSocket && activeSocket !== null) {
    return activeSocket
  }

  const socket = io({
    path: socketPath,
    transports: ['websocket'],
    autoConnect: false,
  })

  activeSocket = socket

  return socket
}

export function connectSocketWithSession(): Socket {
  const socket = createSocketClient()
  const sessionToken = localStorage.getItem(sessionTokenStorageKey)

  socket.connect()

  if (sessionToken !== null) {
    socket.emit('session.subscribe', { token: sessionToken })
  }

  return socket
}

export function disconnectSocketClient(): void {
  const hasActiveSocket = activeSocket !== null

  if (!hasActiveSocket || activeSocket === null) {
    return
  }

  const socket = activeSocket
  activeSocket = null
  socket.disconnect()
}
