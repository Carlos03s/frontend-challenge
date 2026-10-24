export type NftDetailThumbnail = {
  id: string
  imageSrc: string
  imageAlt: string
  isActive: boolean
}

export type NftDetailEditionOption = {
  id: string
  label: string
  isActive: boolean
}

export type NftDetailSocialLink = {
  id: string
  href: string
  ariaLabel: string
  iconSrc: string
  iconClassName: string
}

export type NftDetailGalleryProps = {
  thumbnails: NftDetailThumbnail[]
  mainImageSrc: string
  mainImageAlt: string
}

export type NftDetailPurchasePanelProps = {
  title: string
  priceLabel: string
  starIconSrc: string
  starIconMutedSrc: string
  filledStarCount: number
  reviewsLabel: string
  aboutTitle: string
  aboutDescription: string
  editionTitle: string
  editionOptions: NftDetailEditionOption[]
  quantityLabel: string
  decreaseQuantityAriaLabel: string
  increaseQuantityAriaLabel: string
  quantityDecreaseIconSrc: string
  quantityIncreaseIconSrc: string
  buyLabel: string
  availabilityMessage?: string
  isBuyDisabled?: boolean
  favoriteLabel: string
  favoriteIconSrc: string
  tokenIdLabel: string
  collectionLabel: string
  attributesLabel: string
  shareTitle: string
  socialLinks: NftDetailSocialLink[]
  onBuyClick?: () => void
  onFavoriteClick?: () => void
  onDecreaseQuantityClick?: () => void
  onIncreaseQuantityClick?: () => void
  onEditionOptionClick?: (editionId: string) => void
}

export type NftDetailProductProps = {
  galleryProps: NftDetailGalleryProps
  purchasePanelProps: NftDetailPurchasePanelProps
}
