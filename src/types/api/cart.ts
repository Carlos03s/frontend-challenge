export type CartItemDto = {
  id: string
  nftId: string
  nftName: string
  tokenIdLabel: string
  editionKey: string
  editionLabel: string
  imageSrc: string
  imageAlt: string
  unitPriceEth: string
  quantity: number
  lineTotalEth: string
  nftVersion: number
  maxQuantity: number
}

export type CartPromoDto = {
  code: string
  discountEth: string
  label: string
}

export type CartDto = {
  id: string
  items: CartItemDto[]
  promo: CartPromoDto | null
  subtotalEth: string
  discountEth: string
  networkFeeEth: string
  totalEth: string
  quoteVersion: number
}

export type CartAddItemRequest = {
  nftId: string
  editionKey: string
  quantity: number
}

export type CartUpdateItemRequest = {
  quantity: number
}

export type CartApplyPromoRequest = {
  code: string
}

export type CartQuoteLineIssue = {
  cartItemId: string
  code: 'PRICE_CHANGED' | 'EDITION_UNAVAILABLE' | 'QUANTITY_EXCEEDED'
  message: string
  currentUnitPriceEth?: string
  maxQuantity?: number
}

export type CartQuoteResponse = {
  cart: CartDto
  isStale: boolean
  issues: CartQuoteLineIssue[]
}
