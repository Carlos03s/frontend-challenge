import type { MockDbNft } from '@/mocks/db/mockDbTypes'
import type { NftDetailDto, NftSummaryDto } from '@/types/api/nfts'

export const baseNftFavoriteCount = 19

export function mapMockNftToSummary(nft: MockDbNft): NftSummaryDto {
  return {
    id: nft.id,
    name: nft.name,
    slug: nft.slug,
    tokenId: nft.tokenId,
    collectionId: nft.collectionId,
    collectionLabel: nft.collectionLabel,
    networkId: nft.networkId,
    priceEth: nft.priceEth,
    imageSrc: nft.imageSrc,
    imageAlt: nft.imageAlt,
    version: nft.version,
    isRare: nft.isRare,
  }
}

export function mapMockNftToDetail(nft: MockDbNft, favoriteNftIds: string[]): NftDetailDto {
  const summary = mapMockNftToSummary(nft)
  const isFavorited = favoriteNftIds.includes(nft.id)

  return {
    ...summary,
    description: nft.description,
    attributesLabel: nft.attributesLabel,
    editions: nft.editions.map((edition) => ({ ...edition })),
    favoriteCount: nft.favoriteCount ?? baseNftFavoriteCount,
    isFavorited,
  }
}
