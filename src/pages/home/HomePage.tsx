import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import {
  catalogPriceRangeBoundMaxEth,
  catalogPriceRangeBoundMinEth,
  catalogPriceRangeStepEth,
} from '@/consts/catalogPriceRange'
import { useCatalogPriceRangeDraft } from '@/hooks/useCatalogPriceRangeDraft'

import { PageContent } from '@/components/layout/PageContent/PageContent'
import { HomeBlog } from '@/components/home/HomeBlog/HomeBlog'
import { HomeCatalogGrid } from '@/components/home/HomeCatalogGrid/HomeCatalogGrid'
import { HomeCatalogPagination } from '@/components/home/HomeCatalogPagination/HomeCatalogPagination'
import { HomeCatalogSidebar } from '@/components/home/HomeCatalogSidebar/HomeCatalogSidebar'
import { HomeCatalogToolbar } from '@/components/home/HomeCatalogToolbar/HomeCatalogToolbar'
import { HomeHeroDesktop } from '@/components/home/HomeHeroDesktop/HomeHeroDesktop'
import { HomePromos } from '@/components/home/HomePromos/HomePromos'
import { MobileCatalogTabs } from '@/components/mobile/MobileCatalogTabs/MobileCatalogTabs'
import { MobileHeroBanner } from '@/components/mobile/MobileHeroBanner/MobileHeroBanner'
import { MobileNftCard } from '@/components/mobile/MobileNftCard/MobileNftCard'
import { MobileSearchBar } from '@/components/mobile/MobileSearchBar/MobileSearchBar'
import { CatalogGridSkeleton } from '@/components/skeleton/CatalogGridSkeleton/CatalogGridSkeleton'
import { fetchNftList } from '@/api/nftsApi'
import { homeBlogStoryCards } from '@/consts/homeBlogStoryContent'
import {
  homeCatalogNextIconSrc,
  homeCatalogSortIconSrc,
  homeCatalogStoryTabs,
} from '@/consts/homeCatalogStoryContent'
import {
  homeCatalogSidebarFeaturedImageSrc,
  homeCatalogSidebarStoryCollectionRows,
  homeCatalogSidebarStoryNetworkRows,
} from '@/consts/homeCatalogSidebarStoryContent'
import {
  homeHeroDesktopFeaturedImageSrc,
  homeHeroDesktopStorySlideIndicators,
} from '@/consts/homeHeroDesktopStoryContent'
import {
  mobileStoryHeroBannerProps,
  mobileStorySearchBarProps,
} from '@/consts/mobileStoryContent'
import { homePromosStoryCards } from '@/consts/homePromosStoryContent'
import { queryKeys } from '@/consts/queryKeys'
import {
  mapCatalogUrlSearchToNftListQuery,
  type CatalogUrlSearch,
} from '@/utils/buildCatalogSearchParams'
import { catalogSectionHash } from '@/utils/buildAppNavItems'
import { catalogSortLabels, nextCatalogSort } from '@/consts/catalogSortLabels'
import { mapNftSummaryToHomeCardProps } from '@/utils/mapNftSummaryToHomeCardProps'

function parsePageNumberFromPageId(pageId: string): number {
  const pageNumberSegment = pageId.replace('page-', '')
  const parsedPage = Number(pageNumberSegment)

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1
  }

  return parsedPage
}

export function HomePage() {
  const navigate = useNavigate()
  const locationHash = useRouterState({ select: (state) => state.location.hash })
  const search = useSearch({ strict: false }) as CatalogUrlSearch
  const priceRangeDraft = useCatalogPriceRangeDraft(search)
  const searchQuery = search.q ?? ''
  const [searchDraft, setSearchDraft] = useState(searchQuery)
  const [appliedSearchQuery, setAppliedSearchQuery] = useState(search.q)
  const hasSearchQueryChanged = search.q !== appliedSearchQuery

  if (hasSearchQueryChanged) {
    setAppliedSearchQuery(search.q)
    setSearchDraft(searchQuery)
  }

  useEffect(() => {
    const normalizedHash = locationHash.startsWith('#') ? locationHash.slice(1) : locationHash
    const shouldScrollToCatalog = normalizedHash === catalogSectionHash

    if (shouldScrollToCatalog) {
      const catalogAnchors = document.querySelectorAll('[data-catalog-anchor]')
      const visibleCatalogAnchor = Array.from(catalogAnchors).find(
        (catalogAnchor) => catalogAnchor.getClientRects().length > 0,
      )

      visibleCatalogAnchor?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [locationHash])

  const listQuery = mapCatalogUrlSearchToNftListQuery(search)
  const nftListQuery = useQuery({
    queryKey: queryKeys.nftList(listQuery),
    queryFn: () => fetchNftList(listQuery),
  })

  const navigateWithSearch = (nextSearch: CatalogUrlSearch) => {
    void navigate({
      to: '/',
      search: nextSearch,
      hash: catalogSectionHash,
    })
  }

  const handleSearchSubmit = () => {
    const trimmedQuery = searchDraft.trim()
    const nextQuery = trimmedQuery.length > 0 ? trimmedQuery : undefined

    navigateWithSearch({
      ...search,
      q: nextQuery,
      page: 1,
    })
  }

  const handleSortClick = () => {
    const currentSort = search.sort ?? 'recent'
    const nextSort = nextCatalogSort(currentSort)

    navigateWithSearch({
      ...search,
      sort: nextSort,
      page: 1,
    })
  }

  const handleApplyPriceRangeClick = () => {
    navigateWithSearch({
      ...search,
      minPriceEth: priceRangeDraft.minPriceEth.toFixed(2),
      maxPriceEth: priceRangeDraft.maxPriceEth.toFixed(2),
      page: 1,
    })
  }

  const sidebarElement = (
    <HomeCatalogSidebar
      applyPriceRangeAriaLabel="Aplicar faixa de preço"
      applyPriceRangeLabel="Aplicar"
      collectionRows={homeCatalogSidebarStoryCollectionRows.map((row) => ({
        ...row,
        isActive: search.collectionIds === row.id,
        to: '/',
        search: { ...search, collectionIds: row.id, page: 1 },
      }))}
      collectionsSectionTitle="Coleções"
      featuredEyebrowLabel="NFT EM DESTAQUE"
      featuredImageAlt="NFT em destaque com oferta limitada"
      featuredImageSrc={homeCatalogSidebarFeaturedImageSrc}
      featuredTitleLabel="OFERTA LIMITADA"
      networkRows={homeCatalogSidebarStoryNetworkRows.map((row) => ({
        ...row,
        isActive: search.networkIds === row.id,
        to: '/',
        search: { ...search, networkIds: row.id, page: 1 },
      }))}
      networkSectionTitle="Rede"
      priceRangeBoundMax={catalogPriceRangeBoundMaxEth}
      priceRangeBoundMin={catalogPriceRangeBoundMinEth}
      priceRangeMaxValue={priceRangeDraft.maxPriceEth}
      priceRangeMinValue={priceRangeDraft.minPriceEth}
      priceRangeSectionTitle="Faixa de preço"
      priceRangeStep={catalogPriceRangeStepEth}
      priceRangeSummaryLabel={priceRangeDraft.priceRangeSummaryLabel}
      onApplyPriceRangeClick={handleApplyPriceRangeClick}
      onPriceRangeMaxChange={priceRangeDraft.setMaxPriceEth}
      onPriceRangeMinChange={priceRangeDraft.setMinPriceEth}
    />
  )

  const isCatalogPending = nftListQuery.isPending
  const isCatalogError = nftListQuery.isError
  const nftCards =
    nftListQuery.data?.items.map((nft) => mapNftSummaryToHomeCardProps(nft)) ?? []

  const totalPages = nftListQuery.data?.totalPages ?? 1
  const currentPage = nftListQuery.data?.page ?? 1
  const pageItems = Array.from({ length: totalPages }, (_, pageIndex) => {
    const pageNumber = pageIndex + 1

    return {
      id: `page-${pageNumber}`,
      label: String(pageNumber),
      pageNumber,
      isActive: pageNumber === currentPage,
    }
  })

  const activeListing = search.listing ?? 'all'
  const catalogTabs = homeCatalogStoryTabs.map((tab) => {
    const listingSearch = tab.id === 'new' || tab.id === 'trending' ? tab.id : undefined

    return {
      ...tab,
      to: '/',
      search: { ...search, listing: listingSearch, page: 1 },
      isActive: tab.id === activeListing,
    }
  })
  const sortMode = search.sort ?? 'recent'
  const sortLabel = catalogSortLabels[sortMode]

  const toolbarProps = {
    tabs: catalogTabs,
    sortPrefixLabel: 'Ordenar por:',
    sortLabel,
    sortAriaLabel: `Ordenar por: ${sortLabel}`,
    sortIconSrc: homeCatalogSortIconSrc,
    onSortClick: handleSortClick,
  }

  const isNextPageDisabled = currentPage >= totalPages

  const handlePageClick = (pageId: string) => {
    const pageNumber = parsePageNumberFromPageId(pageId)
    navigateWithSearch({ ...search, page: pageNumber })
  }

  const handleNextPageClick = () => {
    if (isNextPageDisabled) {
      return
    }

    navigateWithSearch({ ...search, page: currentPage + 1 })
  }

  const paginationProps = {
    pages: pageItems,
    nextAriaLabel: 'Próxima página',
    nextIconSrc: homeCatalogNextIconSrc,
    isNextDisabled: isNextPageDisabled,
    onPageClick: handlePageClick,
    onNextClick: handleNextPageClick,
  }

  const hasCatalogItems = nftCards.length > 0
  const emptyCatalogElement = (
    <p className="font-mono text-base text-secondary">Nenhum NFT encontrado.</p>
  )

  let catalogMainElement = <HomeCatalogGrid nftCards={nftCards} />

  if (isCatalogPending) {
    catalogMainElement = <CatalogGridSkeleton />
  }

  if (!isCatalogPending && !isCatalogError && !hasCatalogItems) {
    catalogMainElement = emptyCatalogElement
  }

  if (isCatalogError) {
    catalogMainElement = (
      <p className="font-mono text-base text-text-accent">Não foi possível carregar o catálogo.</p>
    )
  }

  const handleHeroCtaClick = () => {
    void navigate({ to: '/', hash: catalogSectionHash })
  }

  const handleMobileFilterClick = () => {
    void navigate({ to: '/', hash: catalogSectionHash })
  }

  const desktopCatalogElement = (
    <section
      aria-label="Catálogo de NFTs"
      className="mx-auto hidden w-full max-w-[1200px] items-start gap-12 lg:flex"
    >
      {sidebarElement}
      <div className="flex min-w-0 flex-1 flex-col items-end gap-[88px]">
        <div className="flex w-full flex-col items-start gap-8">
          <MobileSearchBar
            {...mobileStorySearchBarProps}
            inputId="catalog-search-desktop"
            showsFilterButton={false}
            value={searchDraft}
            onSearchSubmit={handleSearchSubmit}
            onValueChange={setSearchDraft}
          />
          <HomeCatalogToolbar {...toolbarProps} />
          {catalogMainElement}
        </div>
        <HomeCatalogPagination {...paginationProps} />
      </div>
    </section>
  )

  const mobileNftCards = nftCards.map((nftCard) => (
    <MobileNftCard
      key={`${nftCard.name}-${nftCard.imageAlt}`}
      imageAlt={nftCard.imageAlt}
      imageSrc={nftCard.imageSrc}
      name={nftCard.name}
      priceLabel={nftCard.priceLabel}
      to={nftCard.to}
    />
  ))

  let mobileGridContent = emptyCatalogElement

  if (isCatalogPending) {
    mobileGridContent = <CatalogGridSkeleton />
  }

  if (isCatalogError) {
    mobileGridContent = catalogMainElement
  }

  if (hasCatalogItems && !isCatalogPending && !isCatalogError) {
    mobileGridContent = <div className="grid grid-cols-2 gap-x-3 gap-y-5">{mobileNftCards}</div>
  }

  const mobileCatalogElement = (
    <section aria-label="Catálogo de NFTs" className="flex w-full flex-col gap-5 lg:hidden" data-catalog-anchor>
      <MobileSearchBar
        {...mobileStorySearchBarProps}
        inputId="catalog-search-mobile"
        value={searchDraft}
        onFilterClick={handleMobileFilterClick}
        onSearchSubmit={handleSearchSubmit}
        onValueChange={setSearchDraft}
      />
      <MobileHeroBanner {...mobileStoryHeroBannerProps} onCtaClick={handleHeroCtaClick} />
      <div className="flex justify-center gap-1.5" aria-hidden>
        <span className="size-1.5 rounded-full bg-primary" />
        <span className="size-1.5 rounded-full bg-primary/35" />
        <span className="size-1.5 rounded-full bg-primary/35" />
      </div>
      <MobileCatalogTabs tabs={catalogTabs} />
      {mobileGridContent}
      <HomeCatalogPagination {...paginationProps} />
    </section>
  )

  const heroElement = (
    <div className="hidden lg:block">
      <HomeHeroDesktop
        ctaLabel="EXPLORAR"
        description="Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet."
        eyebrowLabel="Bem-vindo à Kurio"
        featuredImageAlt="Ilustração de NFT em destaque"
        featuredImageSrc={homeHeroDesktopFeaturedImageSrc}
        slideIndicators={homeHeroDesktopStorySlideIndicators}
        slideIndicatorsAriaLabel="Slides do destaque"
        titleLineOne="SEJA DONO DO FUTURO"
        titleLineTwo="DA ARTE DIGITAL"
        onCtaClick={handleHeroCtaClick}
      />
    </div>
  )

  const promosElement = <HomePromos promoCards={homePromosStoryCards} />

  const blogElement = (
    <div className="hidden lg:block">
      <HomeBlog
        blogCards={homeBlogStoryCards}
        description="Histórias, guias e insights para colecionadores sobre o universo da propriedade digital."
        title="Diário da Cunhagem"
      />
    </div>
  )

  return (
    <PageContent className="gap-12 lg:gap-24">
      {heroElement}
      {mobileCatalogElement}
      <div className="hidden lg:block" data-catalog-anchor>
        {desktopCatalogElement}
      </div>
      {promosElement}
      {blogElement}
    </PageContent>
  )
}
