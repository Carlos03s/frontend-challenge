import type { NftListQuery } from '@/types/api/nfts'

export type CatalogListing = 'all' | 'new' | 'trending'

export type CatalogUrlSearch = {
  q?: string
  collectionIds?: string
  networkIds?: string
  minPriceEth?: string
  maxPriceEth?: string
  sort?: 'recent' | 'price-asc' | 'price-desc'
  listing?: CatalogListing
  page?: number
}

export function mapCatalogUrlSearchToNftListQuery(search: CatalogUrlSearch): NftListQuery {
  const collectionIds =
    search.collectionIds !== undefined && search.collectionIds.length > 0
      ? search.collectionIds.split(',')
      : undefined
  const networkIds =
    search.networkIds !== undefined && search.networkIds.length > 0
      ? search.networkIds.split(',')
      : undefined

  return {
    q: search.q,
    collectionIds,
    networkIds,
    minPriceEth: search.minPriceEth,
    maxPriceEth: search.maxPriceEth,
    sort: search.sort ?? 'recent',
    listing: search.listing,
    page: search.page ?? 1,
    pageSize: 9,
  }
}
