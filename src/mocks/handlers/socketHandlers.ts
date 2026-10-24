import { ws } from 'msw'
import { toSocketIo } from '@mswjs/socket.io-binding'

import { getSocketIoWebSocketLinkPattern } from '@/api/apiConfig'
import { getMockSession } from '@/mocks/services/authService'
import {
  registerMockSocketSubscription,
  registerPublicSocketClient,
  unregisterMockSocketClient,
} from '@/mocks/socket/mockSocketRegistry'

type SessionSubscribePayload = {
  token: string
}

function resolveUserIdFromToken(token: string): string | null {
  const session = getMockSession(token)

  if (session === null) {
    return null
  }

  return session.user.id
}

const socketLink = ws.link(getSocketIoWebSocketLinkPattern())

export const socketHandlers = [
  socketLink.addEventListener('connection', (connection) => {
    const { client: socketClient } = toSocketIo(connection)

    registerPublicSocketClient(socketClient)

    socketClient.on('session.subscribe', (_event, payload: SessionSubscribePayload) => {
      const userId = resolveUserIdFromToken(payload.token)
      const hasUserId = userId !== null

      if (!hasUserId) {
        return
      }

      registerMockSocketSubscription(userId, socketClient)
    })

    connection.client.addEventListener('close', () => {
      unregisterMockSocketClient(socketClient)
    })
  }),
]
