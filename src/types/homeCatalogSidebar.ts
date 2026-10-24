export type HomeCatalogSidebarFilterRow = {
  id: string
  label: string
  countLabel: string
  isActive: boolean
  to: string
  search?: Record<string, unknown>
}

export type HomeCatalogSidebarProps = {
  collectionsSectionTitle: string
  collectionRows: HomeCatalogSidebarFilterRow[]
  priceRangeSectionTitle: string
  priceRangeSummaryLabel: string
  priceRangeMinValue: number
  priceRangeMaxValue: number
  priceRangeBoundMin: number
  priceRangeBoundMax: number
  priceRangeStep: number
  applyPriceRangeLabel: string
  applyPriceRangeAriaLabel: string
  onPriceRangeMinChange: (priceEth: number) => void
  onPriceRangeMaxChange: (priceEth: number) => void
  networkSectionTitle: string
  networkRows: HomeCatalogSidebarFilterRow[]
  featuredEyebrowLabel: string
  featuredTitleLabel: string
  featuredImageSrc: string
  featuredImageAlt: string
  onApplyPriceRangeClick?: () => void
}
