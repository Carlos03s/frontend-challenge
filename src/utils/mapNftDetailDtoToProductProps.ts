import type { NftDetailDto } from '@/types/api/nfts'
import type { NftDetailProductProps } from '@/types/nftDetail'
import { formatEthLabel } from '@/utils/formatEthLabel'

export function mapNftDetailDtoToProductProps(
  nft: NftDetailDto,
  options: {
    selectedEditionKey: string
    quantity: number
    availabilityMessage?: string
    isBuyDisabled?: boolean
    onBuyClick?: () => void
    onFavoriteClick?: () => void
    onDecreaseQuantityClick?: () => void
    onIncreaseQuantityClick?: () => void
    onEditionOptionClick?: (editionId: string) => void
  },
): NftDetailProductProps {
  const editionOptions = nft.editions.map((edition) => ({
    id: edition.key,
    label: edition.label,
    isActive: edition.key === options.selectedEditionKey,
  }))

  return {
    galleryProps: {
      thumbnails: [
        {
          id: 'thumb-main',
          imageSrc: nft.imageSrc,
          imageAlt: nft.imageAlt,
          isActive: true,
        },
      ],
      mainImageSrc: nft.imageSrc,
      mainImageAlt: nft.imageAlt,
    },
    purchasePanelProps: {
      title: nft.name,
      priceLabel: formatEthLabel(nft.priceEth),
      starIconSrc: '/assets/nft-detail/figma/star-filled.svg',
      starIconMutedSrc: '/assets/nft-detail/figma/star-muted.svg',
      filledStarCount: 4,
      reviewsLabel: `${nft.favoriteCount} avaliações de colecionadores`,
      aboutTitle: 'Sobre este NFT:',
      aboutDescription: nft.description,
      editionTitle: 'Edição:',
      editionOptions,
      quantityLabel: String(options.quantity),
      decreaseQuantityAriaLabel: 'Diminuir quantidade',
      increaseQuantityAriaLabel: 'Aumentar quantidade',
      quantityDecreaseIconSrc: '/assets/nft-detail/figma/quantity-minus.svg',
      quantityIncreaseIconSrc: '/assets/nft-detail/figma/quantity-plus.svg',
      buyLabel: 'COMPRAR',
      availabilityMessage: options.availabilityMessage,
      isBuyDisabled: options.isBuyDisabled,
      favoriteLabel: nft.isFavorited ? 'Favoritado' : 'Favoritar',
      favoriteIconSrc: '/assets/nft-detail/figma/heart.svg',
      tokenIdLabel: `ID do token: #${nft.tokenId}`,
      collectionLabel: `Coleção: ${nft.collectionLabel}`,
      attributesLabel: `Atributos: ${nft.attributesLabel}`,
      shareTitle: 'Compartilhar este NFT:',
      socialLinks: [
        {
          id: 'linkedin',
          href: '#',
          ariaLabel: 'Compartilhar no LinkedIn',
          iconSrc: '/assets/home/figma/linkedin.svg',
          iconClassName: 'h-[14.375px] w-[15px]',
        },
        {
          id: 'twitter',
          href: '#',
          ariaLabel: 'Compartilhar no Twitter',
          iconSrc: '/assets/home/figma/twitter.svg',
          iconClassName: 'h-[12.191px] w-[15.966px]',
        },
      ],
      onBuyClick: options.onBuyClick,
      onFavoriteClick: options.onFavoriteClick,
      onDecreaseQuantityClick: options.onDecreaseQuantityClick,
      onIncreaseQuantityClick: options.onIncreaseQuantityClick,
      onEditionOptionClick: options.onEditionOptionClick,
    },
  }
}
