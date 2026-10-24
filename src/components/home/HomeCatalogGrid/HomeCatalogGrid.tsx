import { HomeNftCard } from '@/components/home/HomeNftCard/HomeNftCard'
import type { HomeCatalogGridProps } from '@/types/homeCatalog'

export function HomeCatalogGrid({ nftCards }: HomeCatalogGridProps) {
  const nftCardElements = nftCards.map((nftCard) => (
    <HomeNftCard key={`${nftCard.name}-${nftCard.imageAlt}`} {...nftCard} />
  ))

  return (
    <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-[34px] lg:gap-y-[72px]">
      {nftCardElements}
    </div>
  )
}
