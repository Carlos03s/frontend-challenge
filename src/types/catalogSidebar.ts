export type CatalogSidebarFilterItem = {
  id: string
  label: string
  countLabel: string
  isSelected: boolean
  href: string
}

export type CatalogSidebarProps = {
  collectionsTitle: string
  collectionItems: CatalogSidebarFilterItem[]
  priceRangeTitle: string
  priceRangeLabel: string
  priceRangeStartPercent: number
  priceRangeEndPercent: number
  applyButtonLabel: string
  networkTitle: string
  networkItems: CatalogSidebarFilterItem[]
  featuredEyebrowLabel: string
  featuredTitleLabel: string
  featuredImageSrc: string
  featuredImageAlt: string
  featuredHref: string
  onApplyPriceRangeClick?: () => void
}
