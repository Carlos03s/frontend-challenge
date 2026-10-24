import type { ReactNode } from 'react'

export type HomeNftCardProps = {
  name: string
  to: string
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  imageBorderRadius: number
  priceGap: number
  priceLabel?: string
  previousPriceLabel?: string
}

export type HomeCatalogTab = {
  id: string
  label: string
  to: string
  search?: Record<string, unknown>
  isActive: boolean
}

export type HomeCatalogToolbarProps = {
  tabs: HomeCatalogTab[]
  sortPrefixLabel: string
  sortLabel: string
  sortAriaLabel: string
  sortIconSrc: string
  onSortClick?: () => void
}

export type HomeCatalogPage = {
  id: string
  label: string
  isActive: boolean
  pageNumber: number
}

export type HomeCatalogPaginationProps = {
  pages: HomeCatalogPage[]
  nextAriaLabel: string
  nextIconSrc: string
  onPageClick?: (pageId: string) => void
  onNextClick?: () => void
  isNextDisabled?: boolean
}

export type HomeCatalogGridProps = {
  nftCards: HomeNftCardProps[]
}

export type HomeCatalogSectionProps = {
  sidebarElement: ReactNode
  toolbarProps: HomeCatalogToolbarProps
  gridProps: HomeCatalogGridProps
  paginationProps: HomeCatalogPaginationProps
}
