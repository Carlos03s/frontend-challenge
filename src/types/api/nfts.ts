export type NftEditionDto = {
  key: string
  label: string
  maxSupply: number | null
  available: number
}

export type NftSummaryDto = {
  id: string
  name: string
  slug: string
  tokenId: string
  collectionId: string
  collectionLabel: string
  networkId: string
  priceEth: string
  imageSrc: string
  imageAlt: string
  version: number
  isRare: boolean
}

export type NftDetailDto = NftSummaryDto & {
  description: string
  attributesLabel: string
  editions: NftEditionDto[]
  favoriteCount: number
  isFavorited: boolean
}

export type NftListQuery = {
  q?: string
  collectionIds?: string[]
  networkIds?: string[]
  minPriceEth?: string
  maxPriceEth?: string
  sort?: 'recent' | 'price-asc' | 'price-desc'
  listing?: 'all' | 'new' | 'trending'
  page?: number
  pageSize?: number
}

export type NftListResponse = {
  items: NftSummaryDto[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export type NftUpdatedEventPayload = {
  eventId: string
  resourceId: string
  version: number
  occurredAt: string
  nft: Pick<NftSummaryDto, 'id' | 'priceEth' | 'version'> & {
    editions: NftEditionDto[]
  }
}
