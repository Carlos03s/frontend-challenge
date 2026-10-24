import { mapMockNftToDetail, mapMockNftToSummary } from '@/mocks/services/mapNftToDto'
import { getMockDatabaseState, updateMockDatabaseState } from '@/mocks/db/mockDatabase'
import { emitMockNftUpdatedEvent } from '@/mocks/socket/emitMockRealtimeEvents'
import type { NftDetailDto, NftListQuery, NftListResponse } from '@/types/api/nfts'
import { compareEth } from '@/utils/ethDecimal'

function matchesSearchQuery(nftName: string, query: string | undefined): boolean {
  const hasQuery = query !== undefined && query.trim().length > 0

  if (!hasQuery) {
    return true
  }

  const normalizedQuery = query.trim().toLowerCase()

  return nftName.toLowerCase().includes(normalizedQuery)
}

function matchesCollection(nftCollectionId: string, collectionIds: string[] | undefined): boolean {
  const hasCollectionFilter = collectionIds !== undefined && collectionIds.length > 0

  if (!hasCollectionFilter) {
    return true
  }

  return collectionIds.includes(nftCollectionId)
}

function matchesNetwork(nftNetworkId: string, networkIds: string[] | undefined): boolean {
  const hasNetworkFilter = networkIds !== undefined && networkIds.length > 0

  if (!hasNetworkFilter) {
    return true
  }

  return networkIds.includes(nftNetworkId)
}

function matchesPriceRange(
  nftPriceEth: string,
  minPriceEth: string | undefined,
  maxPriceEth: string | undefined,
): boolean {
  const hasMinPrice = minPriceEth !== undefined
  const hasMaxPrice = maxPriceEth !== undefined

  if (hasMinPrice && compareEth(nftPriceEth, minPriceEth) < 0) {
    return false
  }

  if (hasMaxPrice && compareEth(nftPriceEth, maxPriceEth) > 0) {
    return false
  }

  return true
}

function sortNfts(
  nfts: ReturnType<typeof mapMockNftToSummary>[],
  sort: NftListQuery['sort'],
): ReturnType<typeof mapMockNftToSummary>[] {
  const sortMode = sort ?? 'recent'
  const sortedNfts = [...nfts]

  if (sortMode === 'price-asc') {
    sortedNfts.sort((firstNft, secondNft) => compareEth(firstNft.priceEth, secondNft.priceEth))
    return sortedNfts
  }

  if (sortMode === 'price-desc') {
    sortedNfts.sort((firstNft, secondNft) => compareEth(secondNft.priceEth, firstNft.priceEth))
    return sortedNfts
  }

  return sortedNfts
}

export function listMockNfts(query: NftListQuery): NftListResponse {
  const dbState = getMockDatabaseState()
  const pageSize = query.pageSize ?? 9
  const page = query.page ?? 1

  const newestNftIds = new Set(dbState.nfts.slice(-6).map((nft) => nft.id))
  const filteredNfts = dbState.nfts.filter((nft) => {
    const matchesQuery = matchesSearchQuery(nft.name, query.q)
    const matchesCollectionFilter = matchesCollection(nft.collectionId, query.collectionIds)
    const matchesNetworkFilter = matchesNetwork(nft.networkId, query.networkIds)
    const matchesPrice = matchesPriceRange(nft.priceEth, query.minPriceEth, query.maxPriceEth)
    const isTrendingListing = query.listing === 'trending'
    const isNewListing = query.listing === 'new'
    let matchesListing = true

    if (isTrendingListing) {
      matchesListing = nft.isRare
    }

    if (isNewListing) {
      matchesListing = newestNftIds.has(nft.id)
    }

    return (
      matchesQuery &&
      matchesCollectionFilter &&
      matchesNetworkFilter &&
      matchesPrice &&
      matchesListing
    )
  })

  const mappedNfts = filteredNfts.map((nft) => mapMockNftToSummary(nft))
  const sortedNfts = sortNfts(mappedNfts, query.sort)
  const totalItems = sortedNfts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pageItems = sortedNfts.slice(startIndex, endIndex)

  return {
    items: pageItems,
    page,
    pageSize,
    totalItems,
    totalPages,
  }
}

export function getMockNftDetail(nftId: string, favoriteNftIds: string[]): NftDetailDto | null {
  const dbState = getMockDatabaseState()
  const nft = dbState.nfts.find((nftItem) => nftItem.id === nftId) ?? null
  const hasNft = nft !== null

  if (!hasNft) {
    return null
  }

  return mapMockNftToDetail(nft, favoriteNftIds)
}

export function updateMockNftPrice(nftId: string, priceEth: string): void {
  updateMockDatabaseState((state) => {
    const nft = state.nfts.find((nftItem) => nftItem.id === nftId)

    if (nft === undefined) {
      return
    }

    nft.priceEth = priceEth
    nft.version += 1
  })

  emitMockNftUpdatedEvent(nftId)
}
