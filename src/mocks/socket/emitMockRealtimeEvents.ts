import { getMockDatabaseState, nextMockEventSequence } from '@/mocks/db/mockDatabase'
import { mapMockNftToSummary } from '@/mocks/services/mapNftToDto'
import { broadcastMockSocketEvent, emitMockSocketEventToUser } from '@/mocks/socket/mockSocketRegistry'
import type { NftUpdatedEventPayload } from '@/types/api/nfts'
import type { OrderUpdatedEventPayload } from '@/types/api/orders'

let lastNftUpdatedPayload: NftUpdatedEventPayload | null = null

export function emitMockNftUpdatedEvent(nftId: string): void {
  const dbState = getMockDatabaseState()
  const nft = dbState.nfts.find((nftItem) => nftItem.id === nftId)

  if (nft === undefined) {
    return
  }

  const summary = mapMockNftToSummary(nft)
  const payload: NftUpdatedEventPayload = {
    eventId: `evt-${nextMockEventSequence()}`,
    resourceId: nft.id,
    version: nft.version,
    occurredAt: new Date().toISOString(),
    nft: {
      id: summary.id,
      priceEth: summary.priceEth,
      version: summary.version,
      editions: nft.editions.map((edition) => ({ ...edition })),
    },
  }

  lastNftUpdatedPayload = payload
  broadcastMockSocketEvent('nft.updated', payload)
}

export function replayLastNftUpdatedEvent(): boolean {
  if (lastNftUpdatedPayload === null) {
    return false
  }

  broadcastMockSocketEvent('nft.updated', lastNftUpdatedPayload)

  return true
}

export function emitStaleNftUpdatedEvent(nftId: string): void {
  const dbState = getMockDatabaseState()
  const nft = dbState.nfts.find((nftItem) => nftItem.id === nftId)

  if (nft === undefined) {
    return
  }

  const summary = mapMockNftToSummary(nft)
  const payload: NftUpdatedEventPayload = {
    eventId: `evt-stale-${nextMockEventSequence()}`,
    resourceId: nft.id,
    version: 1,
    occurredAt: new Date().toISOString(),
    nft: {
      id: summary.id,
      priceEth: summary.priceEth,
      version: 1,
      editions: nft.editions.map((edition) => ({ ...edition })),
    },
  }

  broadcastMockSocketEvent('nft.updated', payload)
}

export function emitMockOrderUpdatedEvent(orderId: string): void {
  const dbState = getMockDatabaseState()
  const order = dbState.orders.find((orderItem) => orderItem.id === orderId)

  if (order === undefined) {
    return
  }

  const payload: OrderUpdatedEventPayload = {
    eventId: `evt-${nextMockEventSequence()}`,
    resourceId: order.id,
    version: order.version,
    occurredAt: new Date().toISOString(),
    order: {
      id: order.id,
      status: order.status,
      version: order.version,
      transactionHash: order.transactionHash,
      totalEth: order.totalEth,
    },
  }

  emitMockSocketEventToUser(order.userId, 'order.updated', payload)
}
