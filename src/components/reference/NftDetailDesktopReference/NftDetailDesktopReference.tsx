import { NftDetailProduct } from '@/components/nft-detail/NftDetailProduct/NftDetailProduct'
import { NftDetailRelatedSection } from '@/components/nft-detail/NftDetailRelatedSection/NftDetailRelatedSection'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import {
  nftDetailRelatedStoryCards,
  nftDetailRelatedStoryTitle,
} from '@/consts/nftDetailRelatedStoryContent'
import {
  nftDetailStoryGalleryProps,
  nftDetailStoryPurchasePanelProps,
} from '@/consts/nftDetailStoryContent'

export function NftDetailDesktopReference() {
  const breadcrumbElement = <PageBreadcrumb label="Início / Mercado / Detalhes do NFT" />

  const productElement = (
    <NftDetailProduct
      galleryProps={nftDetailStoryGalleryProps}
      purchasePanelProps={nftDetailStoryPurchasePanelProps}
    />
  )

  const relatedSectionElement = (
    <NftDetailRelatedSection nftCards={nftDetailRelatedStoryCards} title={nftDetailRelatedStoryTitle} />
  )

  return (
    <div className="flex w-[1200px] flex-col gap-12">
      {breadcrumbElement}
      {productElement}
      {relatedSectionElement}
    </div>
  )
}
