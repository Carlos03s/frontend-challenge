import type { CartItemDto } from '@/types/api/cart'

export type OrderStatus = 'pending' | 'confirmed' | 'rejected'

export type OrderReceiptItemDto = Pick<
  CartItemDto,
  'nftId' | 'nftName' | 'tokenIdLabel' | 'imageSrc' | 'imageAlt' | 'quantity' | 'lineTotalEth'
>

export type OrderDto = {
  id: string
  status: OrderStatus
  version: number
  createdAt: string
  updatedAt: string
  transactionHash: string | null
  walletLabel: string
  networkId: string
  subtotalEth: string
  discountEth: string
  networkFeeEth: string
  totalEth: string
  items: OrderReceiptItemDto[]
  confirmationNote: string | null
}

export type CreateOrderRequest = {
  quoteVersion: number
  walletId: string
  networkId: string
  collectorNote?: string
}

export type OrderUpdatedEventPayload = {
  eventId: string
  resourceId: string
  version: number
  occurredAt: string
  order: Pick<OrderDto, 'id' | 'status' | 'version' | 'transactionHash' | 'totalEth'>
}
