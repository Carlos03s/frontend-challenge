import type { NftSummaryDto } from '@/types/api/nfts'
import type { HomeNftCardProps } from '@/types/homeCatalog'
import { formatEthLabel } from '@/utils/formatEthLabel'

export function mapNftSummaryToHomeCardProps(nft: NftSummaryDto): HomeNftCardProps {
  return {
    name: nft.name,
    to: `/nfts/${nft.id}`,
    imageSrc: nft.imageSrc,
    imageAlt: nft.imageAlt,
    imageWidth: 250,
    imageHeight: 250,
    imageBorderRadius: 15,
    priceGap: 12,
    priceLabel: formatEthLabel(nft.priceEth),
  }
}
