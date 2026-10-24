import type {
  NftDetailEditionOption,
  NftDetailGalleryProps,
  NftDetailPurchasePanelProps,
  NftDetailSocialLink,
  NftDetailThumbnail,
} from '@/types/nftDetail'

const nftDetailArtworkSrc = '/assets/home/figma/ape-green.webp'

export const nftDetailStoryThumbnails: NftDetailThumbnail[] = [
  {
    id: 'thumb-1',
    imageSrc: nftDetailArtworkSrc,
    imageAlt: 'Miniatura 1 do Emerald Ape #042',
    isActive: false,
  },
  {
    id: 'thumb-2',
    imageSrc: nftDetailArtworkSrc,
    imageAlt: 'Miniatura 2 do Emerald Ape #042',
    isActive: true,
  },
  {
    id: 'thumb-3',
    imageSrc: nftDetailArtworkSrc,
    imageAlt: 'Miniatura 3 do Emerald Ape #042',
    isActive: false,
  },
  {
    id: 'thumb-4',
    imageSrc: nftDetailArtworkSrc,
    imageAlt: 'Miniatura 4 do Emerald Ape #042',
    isActive: false,
  },
]

export const nftDetailStoryEditionOptions: NftDetailEditionOption[] = [
  { id: 'edition-1-1', label: '1/1', isActive: false },
  { id: 'edition-1-10', label: '1/10', isActive: false },
  { id: 'edition-1-50', label: '1/50', isActive: true },
  { id: 'edition-open', label: 'ABERTA', isActive: false },
]

export const nftDetailStorySocialLinks: NftDetailSocialLink[] = [
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
]

export const nftDetailStoryGalleryProps: NftDetailGalleryProps = {
  thumbnails: nftDetailStoryThumbnails,
  mainImageSrc: nftDetailArtworkSrc,
  mainImageAlt: 'Emerald Ape #042 em destaque',
}

export const nftDetailStoryPurchasePanelProps: NftDetailPurchasePanelProps = {
  title: 'Emerald Ape #042',
  priceLabel: '1.19 ETH',
  starIconSrc: '/assets/nft-detail/figma/star-filled.svg',
  starIconMutedSrc: '/assets/nft-detail/figma/star-muted.svg',
  filledStarCount: 4,
  reviewsLabel: '19 avaliações de colecionadores',
  aboutTitle: 'Sobre este NFT:',
  aboutDescription:
    'Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores.',
  editionTitle: 'Edição:',
  editionOptions: nftDetailStoryEditionOptions,
  quantityLabel: '1',
  decreaseQuantityAriaLabel: 'Diminuir quantidade',
  increaseQuantityAriaLabel: 'Aumentar quantidade',
  quantityDecreaseIconSrc: '/assets/nft-detail/figma/quantity-minus.svg',
  quantityIncreaseIconSrc: '/assets/nft-detail/figma/quantity-plus.svg',
  buyLabel: 'COMPRAR',
  favoriteLabel: 'Favoritar',
  favoriteIconSrc: '/assets/nft-detail/figma/heart.svg',
  tokenIdLabel: 'ID do token: #0042',
  collectionLabel: 'Coleção: Kurio Apes',
  attributesLabel: 'Atributos: Óculos, Esmeralda, Raro',
  shareTitle: 'Compartilhar este NFT:',
  socialLinks: nftDetailStorySocialLinks,
}
