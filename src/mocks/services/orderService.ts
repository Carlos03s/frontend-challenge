import type { MockDbCartItem, MockDbOrder } from '@/mocks/db/mockDbTypes'
import { getActiveMockScenarioBehavior, getMockDatabaseState, updateMockDatabaseState } from '@/mocks/db/mockDatabase'
import {
  buildMockCartQuote,
  getMockCartDto,
  removePurchasedItemsFromCart,
  resolveCartForContext,
} from '@/mocks/services/cartService'
import { emitMockOrderUpdatedEvent } from '@/mocks/socket/emitMockRealtimeEvents'
import type { CreateOrderRequest, OrderDto, OrderReceiptItemDto } from '@/types/api/orders'
import { multiplyEth } from '@/utils/ethDecimal'

function createOrderId(): string {
  return `order-${crypto.randomUUID()}`
}

function mapOrderItemsToReceipt(items: MockDbCartItem[]): OrderReceiptItemDto[] {
  const dbState = getMockDatabaseState()

  return items.flatMap((item) => {
    const nft = dbState.nfts.find((nftItem) => nftItem.id === item.nftId)

    if (nft === undefined) {
      return []
    }

    return [
      {
        nftId: nft.id,
        nftName: nft.name,
        tokenIdLabel: `ID do token: #${nft.tokenId}`,
        imageSrc: nft.imageSrc,
        imageAlt: nft.imageAlt,
        quantity: item.quantity,
        lineTotalEth: multiplyEth(item.unitPriceEth, item.quantity),
      },
    ]
  })
}

function mapOrderToDto(order: MockDbOrder): OrderDto {
  const dbState = getMockDatabaseState()
  const wallet = dbState.wallets.find((walletItem) => walletItem.id === order.walletId)
  const walletLabel = wallet?.walletType ?? order.walletId
  const confirmationNote =
    order.status === 'confirmed'
      ? 'Transação confirmada na Ethereum. A propriedade foi transferida para sua carteira conectada e registrada na rede.'
      : null

  return {
    id: order.id,
    status: order.status,
    version: order.version,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    transactionHash: order.transactionHash,
    walletLabel,
    networkId: order.networkId,
    subtotalEth: order.subtotalEth,
    discountEth: order.discountEth,
    networkFeeEth: order.networkFeeEth,
    totalEth: order.totalEth,
    items: mapOrderItemsToReceipt(order.items),
    confirmationNote,
  }
}

function buildRequestFingerprint(payload: CreateOrderRequest): string {
  return JSON.stringify(payload)
}

const scheduledOrderIds = new Set<string>()

function scheduleOrderResolution(orderId: string): void {
  const isAlreadyScheduled = scheduledOrderIds.has(orderId)

  if (isAlreadyScheduled) {
    return
  }

  scheduledOrderIds.add(orderId)

  const scenarioBehavior = getActiveMockScenarioBehavior()
  const currentOrder = getMockDatabaseState().orders.find((orderItem) => orderItem.id === orderId)

  if (currentOrder === undefined) {
    scheduledOrderIds.delete(orderId)
    return
  }

  const elapsedMs = Date.now() - Date.parse(currentOrder.createdAt)
  const remainingMs = Math.max(0, scenarioBehavior.paymentDelayMs - elapsedMs)

  globalThis.setTimeout(() => {
    scheduledOrderIds.delete(orderId)
    const dbState = getMockDatabaseState()
    const order = dbState.orders.find((orderItem) => orderItem.id === orderId)

    if (order === undefined) {
      return
    }

    const isStillPending = order.status === 'pending'

    if (!isStillPending) {
      return
    }

    const shouldReject = scenarioBehavior.orderOutcome === 'rejected'
    const nextStatus = shouldReject ? 'rejected' : 'confirmed'
    const transactionHash = shouldReject ? null : '0xA91F7C4E82C'

    updateMockDatabaseState((state) => {
      const targetOrder = state.orders.find((orderItem) => orderItem.id === orderId)

      if (targetOrder === undefined) {
        return
      }

      targetOrder.status = nextStatus
      targetOrder.version += 1
      targetOrder.updatedAt = new Date().toISOString()
      targetOrder.transactionHash = transactionHash
    })

    if (nextStatus === 'confirmed') {
      removePurchasedItemsFromCart(order.userId, order.items)
    }

    emitMockOrderUpdatedEvent(orderId)
  }, remainingMs)
}

export function createMockOrder(
  userId: string,
  guestCartId: string | null,
  payload: CreateOrderRequest,
  idempotencyKey: string,
): OrderDto | 'QUOTE_STALE' | 'IDEMPOTENCY_CONFLICT' | 'UNAUTHORIZED' {
  const dbState = getMockDatabaseState()
  const existingOrderId = dbState.idempotencyIndex[idempotencyKey]
  const hasExistingOrder = existingOrderId !== undefined

  if (hasExistingOrder) {
    const existingOrder = dbState.orders.find((orderItem) => orderItem.id === existingOrderId)

    if (existingOrder === undefined) {
      return 'UNAUTHORIZED'
    }

    const fingerprint = buildRequestFingerprint(payload)
    const isSameRequest = existingOrder.requestFingerprint === fingerprint

    if (!isSameRequest) {
      return 'IDEMPOTENCY_CONFLICT'
    }

    return mapOrderToDto(existingOrder)
  }

  const quote = buildMockCartQuote(
    dbState.users.find((user) => user.id === userId) ?? null,
    guestCartId,
  )

  if (quote.isStale) {
    return 'QUOTE_STALE'
  }

  const cart = resolveCartForContext(
    dbState.users.find((user) => user.id === userId) ?? null,
    guestCartId,
  )
  const wallet = dbState.wallets.find((walletItem) => walletItem.id === payload.walletId)

  if (wallet === undefined || wallet.userId !== userId) {
    return 'UNAUTHORIZED'
  }

  const hasQuoteVersionMismatch = cart.quoteVersion !== payload.quoteVersion

  if (hasQuoteVersionMismatch) {
    return 'QUOTE_STALE'
  }

  const cartDto = getMockCartDto(
    dbState.users.find((user) => user.id === userId) ?? null,
    guestCartId,
  )

  const orderId = createOrderId()
  const timestamp = new Date().toISOString()
  const orderItems = cart.items.map((item) => ({ ...item }))

  const newOrder: MockDbOrder = {
    id: orderId,
    userId,
    status: 'pending',
    version: 1,
    createdAt: timestamp,
    updatedAt: timestamp,
    transactionHash: null,
    walletId: wallet.id,
    networkId: payload.networkId,
    subtotalEth: cartDto.subtotalEth,
    discountEth: cartDto.discountEth,
    networkFeeEth: cartDto.networkFeeEth,
    totalEth: cartDto.totalEth,
    items: orderItems,
    quoteVersion: payload.quoteVersion,
    idempotencyKey,
    requestFingerprint: buildRequestFingerprint(payload),
  }

  updateMockDatabaseState((state) => {
    state.orders.push(newOrder)
    state.idempotencyIndex[idempotencyKey] = orderId
  })

  scheduleOrderResolution(orderId)
  emitMockOrderUpdatedEvent(orderId)

  return mapOrderToDto(newOrder)
}

export function getMockOrder(orderId: string, userId: string): OrderDto | null {
  const dbState = getMockDatabaseState()
  const order = dbState.orders.find((orderItem) => orderItem.id === orderId) ?? null

  if (order === null) {
    return null
  }

  const isOwner = order.userId === userId

  if (!isOwner) {
    return null
  }

  const isPending = order.status === 'pending'

  if (isPending) {
    scheduleOrderResolution(order.id)
  }

  return mapOrderToDto(order)
}
