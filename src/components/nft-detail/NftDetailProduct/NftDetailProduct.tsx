import { NftDetailGallery } from '@/components/nft-detail/NftDetailGallery/NftDetailGallery'
import { NftDetailPurchasePanel } from '@/components/nft-detail/NftDetailPurchasePanel/NftDetailPurchasePanel'
import type { NftDetailProductProps } from '@/types/nftDetail'

export function NftDetailProduct({ galleryProps, purchasePanelProps }: NftDetailProductProps) {
  return (
    <div className="flex w-full flex-col items-start gap-8 lg:flex-row">
      <NftDetailGallery {...galleryProps} />
      <NftDetailPurchasePanel {...purchasePanelProps} />
    </div>
  )
}
