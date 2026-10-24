export const catalogSortModes = ['recent', 'price-asc', 'price-desc'] as const

export type CatalogSortMode = (typeof catalogSortModes)[number]

export const catalogSortLabels: Record<CatalogSortMode, string> = {
  recent: 'Listados recentemente',
  'price-asc': 'Menor preço',
  'price-desc': 'Maior preço',
}

export function nextCatalogSort(sort: CatalogSortMode): CatalogSortMode {
  const currentIndex = catalogSortModes.indexOf(sort)
  const nextIndex = (currentIndex + 1) % catalogSortModes.length

  return catalogSortModes[nextIndex]
}
