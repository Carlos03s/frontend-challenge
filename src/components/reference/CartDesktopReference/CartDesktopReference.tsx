import { CartItemsPanel } from '@/components/cart/CartItemsPanel/CartItemsPanel'
import { CartWalletSummary } from '@/components/cart/CartWalletSummary/CartWalletSummary'
import { NftDetailRelatedSection } from '@/components/nft-detail/NftDetailRelatedSection/NftDetailRelatedSection'
import { PageBreadcrumb } from '@/components/layout/PageBreadcrumb/PageBreadcrumb'
import {
  cartStoryItemsPanelProps,
  cartStoryWalletSummaryProps,
} from '@/consts/cartStoryContent'
import {
  nftDetailRelatedStoryCards,
  nftDetailRelatedStoryTitle,
} from '@/consts/nftDetailRelatedStoryContent'

export function CartDesktopReference() {
  const breadcrumbElement = <PageBreadcrumb label="Início / Mercado / Carrinho" />

  const cartRowElement = (
    <div className="flex gap-8">
      <CartItemsPanel {...cartStoryItemsPanelProps} />
      <CartWalletSummary {...cartStoryWalletSummaryProps} />
    </div>
  )

  const relatedSectionElement = (
    <NftDetailRelatedSection nftCards={nftDetailRelatedStoryCards} title={nftDetailRelatedStoryTitle} />
  )

  return (
    <div className="flex w-[1200px] flex-col gap-12">
      {breadcrumbElement}
      {cartRowElement}
      {relatedSectionElement}
    </div>
  )
}
