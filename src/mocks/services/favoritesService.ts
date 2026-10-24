import { getMockDatabaseState, updateMockDatabaseState } from '@/mocks/db/mockDatabase'
import { baseNftFavoriteCount } from '@/mocks/services/mapNftToDto'
import type { FavoriteListResponse } from '@/types/api/favorites'

function readFavoriteCount(favoriteCount: number | undefined): number {
  return favoriteCount ?? baseNftFavoriteCount
}

export function listMockFavorites(userId: string): FavoriteListResponse {
  const dbState = getMockDatabaseState()
  const user = dbState.users.find((userItem) => userItem.id === userId)

  if (user === undefined) {
    return { nftIds: [] }
  }

  return { nftIds: [...user.favoriteNftIds] }
}

export function addMockFavorite(userId: string, nftId: string): FavoriteListResponse | 'NOT_FOUND' {
  const dbState = getMockDatabaseState()
  const nftExists = dbState.nfts.some((nft) => nft.id === nftId)

  if (!nftExists) {
    return 'NOT_FOUND'
  }

  updateMockDatabaseState((state) => {
    const user = state.users.find((userItem) => userItem.id === userId)

    if (user === undefined) {
      return
    }

    const isAlreadyFavorite = user.favoriteNftIds.includes(nftId)

    if (isAlreadyFavorite) {
      return
    }

    user.favoriteNftIds.push(nftId)

    const nft = state.nfts.find((nftItem) => nftItem.id === nftId)

    if (nft === undefined) {
      return
    }

    nft.favoriteCount = readFavoriteCount(nft.favoriteCount) + 1
  })

  return listMockFavorites(userId)
}

export function removeMockFavorite(userId: string, nftId: string): FavoriteListResponse {
  updateMockDatabaseState((state) => {
    const user = state.users.find((userItem) => userItem.id === userId)

    if (user === undefined) {
      return
    }

    const isFavorite = user.favoriteNftIds.includes(nftId)

    if (!isFavorite) {
      return
    }

    user.favoriteNftIds = user.favoriteNftIds.filter((favoriteId) => favoriteId !== nftId)

    const nft = state.nfts.find((nftItem) => nftItem.id === nftId)

    if (nft === undefined) {
      return
    }

    nft.favoriteCount = Math.max(0, readFavoriteCount(nft.favoriteCount) - 1)
  })

  return listMockFavorites(userId)
}
