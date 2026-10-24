import type { toSocketIo } from '@mswjs/socket.io-binding'

type MockSocketClient = ReturnType<typeof toSocketIo>['client']

type MockSocketSubscription = {
  userId: string
  client: MockSocketClient
}

const socketSubscriptions: MockSocketSubscription[] = []
const publicSocketClients: MockSocketClient[] = []

export function registerPublicSocketClient(client: MockSocketClient): void {
  const isAlreadyPublic = publicSocketClients.includes(client)

  if (isAlreadyPublic) {
    return
  }

  publicSocketClients.push(client)
}

export function registerMockSocketSubscription(userId: string, client: MockSocketClient): void {
  socketSubscriptions.push({ userId, client })
}

export function unregisterMockSocketClient(client: MockSocketClient): void {
  const nextSubscriptions = socketSubscriptions.filter((subscription) => subscription.client !== client)
  const nextPublicClients = publicSocketClients.filter((publicClient) => publicClient !== client)

  socketSubscriptions.length = 0
  socketSubscriptions.push(...nextSubscriptions)
  publicSocketClients.length = 0
  publicSocketClients.push(...nextPublicClients)
}

export function broadcastMockSocketEvent(eventName: string, payload: unknown): void {
  const deliveredClients = new Set<MockSocketClient>()

  const emitOnce = (client: MockSocketClient) => {
    const wasDelivered = deliveredClients.has(client)

    if (wasDelivered) {
      return
    }

    deliveredClients.add(client)
    client.emit(eventName, payload)
  }

  publicSocketClients.forEach(emitOnce)
  socketSubscriptions.forEach((subscription) => {
    emitOnce(subscription.client)
  })
}

export function emitMockSocketEventToUser(userId: string, eventName: string, payload: unknown): void {
  socketSubscriptions.forEach((subscription) => {
    const isTargetUser = subscription.userId === userId

    if (!isTargetUser) {
      return
    }

    subscription.client.emit(eventName, payload)
  })
}
