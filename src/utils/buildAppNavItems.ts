import type { HomeHeaderNavItem } from '@/types/homeHeader'

export const catalogSectionHash = 'catalogo'

function normalizeHash(rawHash: string): string {
  const hasHashPrefix = rawHash.startsWith('#')

  if (hasHashPrefix) {
    return rawHash.slice(1)
  }

  return rawHash
}

function hasCatalogUrlSearch(search: Record<string, unknown>): boolean {
  const pageValue = search.page
  const parsedPage = typeof pageValue === 'number' ? pageValue : Number(pageValue)
  const hasPageBeyondFirst = Number.isFinite(parsedPage) && parsedPage > 1

  const hasCollectionFilter =
    typeof search.collectionIds === 'string' && search.collectionIds.length > 0
  const hasNetworkFilter = typeof search.networkIds === 'string' && search.networkIds.length > 0
  const hasSearchQuery = typeof search.q === 'string' && search.q.length > 0
  const hasPriceFilter =
    (typeof search.minPriceEth === 'string' && search.minPriceEth.length > 0) ||
    (typeof search.maxPriceEth === 'string' && search.maxPriceEth.length > 0)
  const hasCustomSort = search.sort === 'price-asc' || search.sort === 'price-desc'

  return (
    hasPageBeyondFirst ||
    hasCollectionFilter ||
    hasNetworkFilter ||
    hasSearchQuery ||
    hasPriceFilter ||
    hasCustomSort
  )
}

export function buildAppNavItems(
  pathname: string,
  rawHash = '',
  search: Record<string, unknown> = {},
): HomeHeaderNavItem[] {
  const hash = normalizeHash(rawHash)
  const isCatalogHash = hash === catalogSectionHash
  const isHomePath = pathname === '/'
  const isMarketPath =
    pathname === '/carrinho' || pathname.startsWith('/nfts') || pathname === '/pagamento'
  const isMercadoView =
    isMarketPath || (isHomePath && (isCatalogHash || hasCatalogUrlSearch(search)))

  return [
    { id: 'inicio', label: 'Início', to: '/', isActive: isHomePath && !isMercadoView },
    {
      id: 'mercado',
      label: 'Mercado',
      to: '/',
      hash: catalogSectionHash,
      isActive: isMercadoView,
    },
    { id: 'criadores', label: 'Criadores', to: '/', isActive: false, isDisabled: true },
    { id: 'aprenda', label: 'Aprenda', to: '/', isActive: false, isDisabled: true },
  ]
}
